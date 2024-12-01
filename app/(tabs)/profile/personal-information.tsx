/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, BackHandler } from "react-native";
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
  const [height, setHeight] = useState<number | string>(user?.height || "");
  const [weight, setWeight] = useState<number | string>(user?.weight || "");
  const [birthDate, setBirthDate] = useState<string>(
    user?.birth_date
      ? new Date(user.birth_date).toLocaleDateString("en-US")
      : ""
  );
  const [birthDateError, setBirthDateError] = useState<string | null>(null);
  const [selectedGender, setSelectedGender] = useState<
    "Female" | "Male" | "Non-Binary" | "Rather Not Say" | null
  >(user?.gender || null);
  const [loading, setLoading] = useState(false); // Add loading state
  const [isBirthDateEdited, setIsBirthDateEdited] = useState(false);

  const genderOptions = ["Female", "Male", "Non-Binary", "Rather Not Say"];

  const validateBirthDate = (dateString: string) => {
    const regex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])\/(19|20)\d{2}$/;
    if (!regex.test(dateString)) {
      setBirthDateError("Please enter a valid date in MM/DD/YYYY format.");
      return false;
    }

    const [month, day, year] = dateString.split("/").map(Number);
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
    return true;
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        return true;
      }
    );
    return () => {
      backHandler.remove();
    };
  }, []);

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

  const handleSave = async () => {
    if (!birthDateError && (!isBirthDateEdited || validateBirthDate(birthDate))) {
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
  

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="w-full flex-row items-center top-2 px-6 z-30">
        <TouchableOpacity
          onPress={() =>  router.push("/(tabs)/profile")}
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
          <Text>Birthday</Text>
          <TextInput
            className="h-[42px] border border-[#F3F3F3] bg-[#F3F3F3] rounded-lg p-3 mt-2"
            placeholder="MM/DD/YYYY"
            value={birthDate}
            onChangeText={handleBirthDateChange}
            keyboardType="numeric"
          />
          {birthDateError && (
            <Text style={{ color: "red", marginTop: 5 }}>{birthDateError}</Text>
          )}
        </View>

        {/* Gender Selection */}
        <View className="mb-5">
          <Text>Gender</Text>
          <View className="flex flex-row flex-wrap justify-between mt-3">
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
          <Text>Height (cm)</Text>
          <TextInput
            className="h-[42px] border-[#F3F3F3] bg-[#F3F3F3] rounded-lg p-3 mt-2"
            placeholder="Enter height"
            value={height.toString()}
            onChangeText={(value) => setHeight(Number(value))}
            keyboardType="numeric"
          />
        </View>

        {/* Weight Input */}
        <View className="mb-5">
          <Text>Weight (kg)</Text>
          <TextInput
            className="h-[42px] border-[#F3F3F3] bg-[#F3F3F3] rounded-lg p-3 mt-2"
            placeholder="Enter weight"
            value={weight.toString()}
            onChangeText={(value) => setWeight(Number(value))}
            keyboardType="numeric"
          />
        </View>

        <View className="mt-auto pb-2">
          <TouchableOpacity
            className="flex items-center justify-center h-[42px] bg-[#7AB2B2] rounded-lg"
            onPress={handleSave}
            disabled={loading}
          >
            {loading ? (
              <Spinner type="primary" />
            ) : (
              <Text className="text-white">Save</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default PersonalInformation;
