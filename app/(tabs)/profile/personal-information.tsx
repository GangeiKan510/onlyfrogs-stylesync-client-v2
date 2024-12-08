/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  BackHandler,
  Modal,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useUser } from "@/components/config/user-context";
import Back from "../../../assets/icons/back-icon.svg";
import { updatePersonalInformation } from "@/network/web/user";
import Toast from "react-native-toast-message";
import Spinner from "@/components/common/Spinner";

function PersonalInformation() {
  const router = useRouter();
  const { user, refetchMe } = useUser();
  const [showModal, setShowModal] = useState(false);
  const [height, setHeight] = useState<number | string>(user?.height || "");
  const [weight, setWeight] = useState<number | string>(user?.weight || "");
  // const [gender, setGender] = useState<string>(user?.gender || "");
  const [birthDate, setBirthDate] = useState<string>(
    user?.birth_date
      ? new Date(user.birth_date).toLocaleDateString("en-US")
      : ""
  );
  const [birthDateError, setBirthDateError] = useState<string | null>(null);
  const [heightError, setHeightError] = useState<string | null>(null);
  const [weightError, setWeightError] = useState<string | null>(null);
  const [parsedBirthDate, setParsedBirthDate] = useState<Date | null>(null);
  const [selectedGender, setSelectedGender] = useState<
    "Female" | "Male" | "Non-Binary" | "Rather Not Say" | null
  >(user?.gender || null);
  const [loading, setLoading] = useState(false);
  const [isBirthDateEdited, setIsBirthDateEdited] = useState(false);
  const initialHeightRef = useRef(user?.height || "");
  const initialWeightRef = useRef(user?.weight || "");
  const initialGenderRef = useRef(user?.gender || null);
  const initialBirthDateRef = useRef(
    user?.birth_date
      ? new Date(user.birth_date).toLocaleDateString("en-US")
      : ""
  );
  // const [initialWeight] = useState<number | string>(user?.weight || "");
  // const [initialHeight] = useState<number | string>(user?.weight || "");
  // const [initialBirthDate] = useState<string>(
  //   user?.birth_date
  //     ? new Date(user.birth_date).toLocaleDateString("en-US")
  //     : ""
  // );
  // const [initialGender] = useState<string | null>(user?.gender || null);
  const genderOptions = ["Female", "Male", "Non-Binary", "Rather Not Say"];

  const isFormChanged =
    height !== initialHeightRef.current ||
    weight !== initialWeightRef.current ||
    birthDate !== initialBirthDateRef.current ||
    selectedGender !== initialGenderRef.current;

  const validateBirthDate = (dateString: string) => {
    const regex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])\/(19|20)\d{2}$/;

    if (!dateString) {
      setBirthDateError(null);
      return true;
    }
    if (!regex.test(dateString)) {
      setBirthDateError("Please enter a valid date in MM/DD/YYYY format.");
      return false;
    }

    const [month, day, year] = dateString.split("/").map(Number);
    const daysInMonth = (month: number, year: number): number => {
      return new Date(year, month, 0).getDate();
    };

    if (day > daysInMonth(month, year)) {
      setBirthDateError("Invalid day for the given month.");
      return false;
    }

    const enteredDate = new Date(year, month - 1, day);
    const today = new Date();

    if (isNaN(enteredDate.getTime())) {
      setBirthDateError("Invalid date.");
      return false;
    }

    if (enteredDate >= today) {
      setBirthDateError("Birthdate must be in the past.");
      return false;
    }

    setBirthDateError(null);
    setParsedBirthDate(enteredDate);
    return true;
  };

  const handleBirthDateChange = (value: string) => {
    const formattedDate = formatDateInput(value);
    setBirthDate(formattedDate);
    setIsBirthDateEdited(true);
    validateBirthDate(formattedDate);
  };

  const formatDateInput = (value: string) => {
    let cleaned = value.replace(/\D/g, "");

    if (cleaned.length >= 3 && cleaned.length <= 4) {
      cleaned = cleaned.replace(/^(\d{2})(\d)/, "$1/$2");
    } else if (cleaned.length >= 5) {
      cleaned = cleaned.replace(/^(\d{2})(\d{2})(\d{0,4})/, "$1/$2/$3");
    }

    return cleaned.slice(0, 10);
  };

  const validateHeight = (value: number | null) => {
    if (value === null) {
      setHeightError("Height is required.");
      return false;
    }

    if (value == 0) {
      setHeightError(null);
      return true;
    }
    if (value < 70) {
      setHeightError("Height should be at least 70 cm.");
      return false;
    }
    if (value > 215) {
      setHeightError("Height should not exceed 215 cm.");
      return false;
    }
    setHeightError(null);
    return true;
  };

  const validateWeight = (value: number | null) => {
    if (value === null) {
      setWeightError("Weight is required.");
      return false;
    }
    if (value == 0) {
      setWeightError(null);
      return true;
    }
    if (value < 8) {
      setWeightError("Weight should be at least 8 kg.");
      return false;
    }
    if (value > 150) {
      setWeightError("Weight should not exceed 150 kg.");
      return false;
    }
    setWeightError(null);
    return true;
  };

  const handleSave = async () => {
    if (
      !birthDateError &&
      (!isBirthDateEdited || validateBirthDate(birthDate))
    ) {
      if (isNaN(Number(height)) || isNaN(Number(weight))) {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: "Please enter valid height and weight values.",
          position: "top",
        });
        return;
      }

      setLoading(true);
      try {
        const [month, day, year] = birthDate.split("/");
        const formattedBirthDate = `${year}-${month}-${day}`;

        const validDate = new Date(formattedBirthDate);
        if (isNaN(validDate.getTime())) {
          setBirthDateError("Invalid date format.");
          setLoading(false);
          return;
        }

        const userId = user?.id;

        if (userId) {
          const personalInformationData = {
            id: userId,
            birth_date: formattedBirthDate,
            gender: selectedGender ?? "",
            height: Number(height),
            weight: Number(weight),
          };

          await updatePersonalInformation(personalInformationData);

          refetchMe();

          Toast.show({
            type: "success",
            text1: "Success",
            text2: "Personal information updated successfully",
            position: "top",
          });
          router.push("/(tabs)/profile");
        } else {
          Toast.show({
            type: "error",
            text1: "Error",
            text2: "User ID not found",
            position: "top",
          });
        }
      } catch (error) {
        console.error("Failed to update personal information", error);
        Toast.show({
          type: "error",
          text1: "Error",
          text2: "Failed to update personal information",
          position: "top",
        });
      } finally {
        setLoading(false);
      }
    } else {
      console.log("Please correct the errors before saving.");
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  };

  useEffect(() => {
    resetToInitialState();
  }, [user]);

  const resetToInitialState = () => {
    setBirthDate(user?.birth_date ? formatDate(user.birth_date) : "");
    setHeight(user?.height || "");
    setWeight(user?.weight || "");
    setSelectedGender(user?.gender || null);
    initialBirthDateRef.current = user?.birth_date
      ? formatDate(user.birth_date)
      : "";
    initialHeightRef.current = user?.height || "";
    initialWeightRef.current = user?.weight || "";
    initialGenderRef.current = user?.gender || null;
  };

  const confirmDiscardChanges = () => {
    resetToInitialState();
    setShowModal(false);
    router.push("/(tabs)/profile");
  };

  const handleCancel = () => {
    if (
      birthDate !== initialBirthDateRef.current ||
      weight !== initialWeightRef.current ||
      height !== initialHeightRef.current ||
      selectedGender !== initialGenderRef.current
    ) {
      setShowModal(true);
    } else {
      router.push("/(tabs)/profile");
    }
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        if (
          birthDate !== initialBirthDateRef.current ||
          height !== initialHeightRef.current ||
          weight !== initialWeightRef.current ||
          selectedGender !== initialGenderRef.current
        ) {
          setShowModal(true);
          return true;
        }
        return false;
      }
    );

    return () => {
      backHandler.remove();
    };
  }, [birthDate, height, weight]);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="w-full flex-row items-center top-2 px-6 z-30">
        <TouchableOpacity
          onPress={handleCancel}
          className="absolute left-6 z-40"
        >
          <Back width={20} height={20} />
        </TouchableOpacity>
        <Text className="flex-1 text-center text-[20px] font-bold">
          Personal Information
        </Text>
      </View>

      <View className="flex-1 px-6 mt-10">
        {/* Birthday Input */}
        <View className="mb-5">
          <Text className="mb-1 font-bold">Birthday</Text>
          <TextInput
            className="h-[48px] border border-[#F3F3F3] bg-[#F3F3F3] rounded-lg p-3"
            placeholder="MM/DD/YYYY"
            value={birthDate}
            onChangeText={handleBirthDateChange}
            keyboardType="numeric"
          />
          {birthDateError && (
            <Text className="text-xs italic text-red">{birthDateError}</Text>
          )}
        </View>

        {/* Gender Selection */}
        <View className="mb-3">
          <Text className="mb-1 font-bold">Gender</Text>
          <View className="flex flex-row flex-wrap justify-between">
            {genderOptions.map((gender) => (
              <TouchableOpacity
                key={gender}
                className={`w-[48%] py-2 px-5 border rounded-[10px] mb-3 ${
                  selectedGender === gender
                    ? "border-tertiary bg-tertiary"
                    : "border-tertiary"
                }`}
                onPress={() => setSelectedGender(gender as any)}
              >
                <Text
                  className={`text-center ${selectedGender === gender ? "text-white" : "text-tertiary"}`}
                >
                  {gender}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Height Input */}
        <View className="mb-5">
          <View className="flex-row justify-between">
            <Text className="mb-1 font-bold">Height</Text>
            <Text className="ml-2 text-tertiary">cm</Text>
          </View>
          <View className="flex-row items-center">
            <TextInput
              className="flex-1 h-[48px] border-[#F3F3F3] bg-[#F3F3F3] rounded-lg p-3"
              keyboardType="numeric"
              placeholder="0"
              maxLength={3}
              value={height.toString()}
              onBlur={() => validateHeight(Number(height))}
              onChangeText={(value) => {
                const numericValue = Number(value);
                setHeight(numericValue);
                validateHeight(numericValue);
              }}
            />
          </View>
          {heightError && (
            <Text className="text-red text-xs italic">{heightError}</Text>
          )}
        </View>

        {/* Weight Input */}
        <View className="mb-5">
          <View className="flex-row justify-between">
            <Text className="mb-1 font-semibold">Weight</Text>
            <Text className="ml-2 text-tertiary">kg</Text>
          </View>
          <View className="flex-row items-center">
            <TextInput
              className="flex-1 h-[48px] border-[#F3F3F3] bg-[#F3F3F3] rounded-lg p-3"
              keyboardType="numeric"
              placeholder="0"
              maxLength={3}
              value={weight.toString()}
              onBlur={() => validateWeight(Number(weight))}
              onChangeText={(value) => {
                const numericValue = Number(value);
                setWeight(numericValue);
                validateWeight(numericValue);
              }}
            />
          </View>
          {weightError && (
            <Text className="text-red text-xs italic">{weightError}</Text>
          )}
        </View>

        <View className="mt-auto pb-2">
          <TouchableOpacity
            disabled={
              !isFormChanged ||
              !!heightError ||
              !!weightError ||
              !!birthDateError
            }
            onPress={handleSave}
            className={`flex items-center justify-center h-[42px] bg-[#7AB2B2] rounded-lg ${
              !isFormChanged ||
              heightError ||
              weightError ||
              birthDateError ||
              height === 0 ||
              weight === 0
                ? "bg-[#9fcccc]"
                : "bg-bg-tertiary"
            }`}
          >
            {loading ? (
              <Spinner type="primary" />
            ) : (
              <Text className="text-white">Save Changes</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>

      <Modal animationType="fade" transparent={true} visible={showModal}>
        <View
          className="flex-1 justify-center items-center"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          <View className="w-4/5 bg-white rounded-[10px] p-5 items-center">
            <Text className="text-[18px] mb-1 font-bold">
              Discard changes?
            </Text>
            <Text className="mt-2 text-center">
              If you discard now, you&apos;ll lose any changes you&apos;ve made to this page.
            </Text>
            <View className="flex-row justify-between w-full mt-5">
              <TouchableOpacity
                onPress={() => setShowModal(false)}
                className="h-[35px] flex-1 border border-[#7ab3b3] rounded-lg mx-2 justify-center items-center"
              >
                <Text className="text-[#7AB2B2] text-[16px]">Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={confirmDiscardChanges}
                className="h-[35px] flex-1 border border-[#7ab3b3] bg-[#7ab3b3] rounded-lg mx-2 justify-center items-center"
              >
                <Text className="text-white text-[16px]">Discard</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

export default PersonalInformation;
