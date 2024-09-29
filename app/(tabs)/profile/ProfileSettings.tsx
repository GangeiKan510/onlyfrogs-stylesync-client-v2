import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, CommonActions } from "@react-navigation/native";
import {
  View,
  Text,
  Pressable,
  TextInput,
  Image,
  Modal,
  ScrollView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import Toast from "react-native-toast-message";
import NoProfileImg from "../../../assets/icons/profile/no-profile-img.svg";
import Back from "../../../assets/icons/back-icon.svg";
import CameraIcon from "../../../assets/icons/profile/camera-icon.svg";
import Spinner from "@/components/common/Spinner";
import { useUser } from "@/components/config/user-context";

const ProfileSettings = () => {
  const { user } = useUser();
  const [initialFirstName, setInitialFirstName] = useState(
    user?.first_name || ""
  );
  const [initialLastName, setInitialLastName] = useState(user?.last_name || "");
  const [initialProfileImage, setInitialProfileImage] = useState<string | null>(
    null
  );
  const [profileImage, setProfileImage] = useState<string | null>(
    initialProfileImage
  );
  const [firstName, setFirstName] = useState(initialFirstName);
  const [lastName, setLastName] = useState(initialLastName);
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    setInitialFirstName(user?.first_name || "");
    setInitialLastName(user?.last_name || "");
    setInitialProfileImage(null);
  }, [user]);

  const uploadProfileImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status === "denied") {
      Toast.show({
        type: "error",
        text1: "Permission Required",
        text2:
          "Permission to access the media library is required. Please enable it in settings.",
      });
      return;
    }

    if (status === "granted") {
      launchImagePicker();
    }
  };

  const launchImagePicker = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const uri = result.assets[0].uri;
      setProfileImage(uri);
    }
  };

  const nameRegex = /^[A-Za-z\s]*$/;

  const handleFirstNameChange = (value: string) => {
    if (!value.trim()) {
      setFirstNameError("Required.");
    } else if (!nameRegex.test(value)) {
      setFirstNameError("Only letters and spaces are allowed.");
    } else {
      setFirstNameError("");
    }
    setFirstName(value);
  };

  const handleLastNameChange = (value: string) => {
    if (!value.trim()) {
      setLastNameError("Required.");
    } else if (!nameRegex.test(value)) {
      setLastNameError("Only letters and spaces are allowed.");
    } else {
      setLastNameError("");
    }
    setLastName(value);
  };

  const validateInputs = () => {
    if (!firstName.trim() && !lastName.trim()) {
      Toast.show({
        type: "error",
        text1: "Validation Error",
        text2: "First name and last name cannot be empty.",
      });
      return false;
    }

    if (!firstName.trim()) {
      Toast.show({
        type: "error",
        text1: "Validation Error",
        text2: "First name cannot be empty.",
      });
      return false;
    }
    if (!nameRegex.test(firstName)) {
      setFirstNameError("Only letters and spaces are allowed.");
      Toast.show({
        type: "error",
        text1: "Validation Error",
        text2: "First name contains invalid characters.",
      });
      return false;
    }

    if (!lastName.trim()) {
      Toast.show({
        type: "error",
        text1: "Validation Error",
        text2: "Last name cannot be empty.",
      });
      return false;
    }
    if (!nameRegex.test(lastName)) {
      setLastNameError("Only letters and spaces are allowed.");
      Toast.show({
        type: "error",
        text1: "Validation Error",
        text2: "Last name contains invalid characters.",
      });
      return false;
    }
    return true;
  };

  const handleSave = () => {
    if (validateInputs()) {
      setIsSaving(true);
      Toast.show({
        type: "success",
        text1: "Profile Saved",
        text2: "Your profile changes have been saved successfully.",
      });

      setInitialFirstName(firstName);
      setInitialLastName(lastName);
      setInitialProfileImage(profileImage);

      setTimeout(() => {
        setIsSaving(false);
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: "profile" }],
          })
        );
      }, 1000);
    }
  };

  const handleCancel = () => {
    if (
      firstName !== initialFirstName ||
      lastName !== initialLastName ||
      profileImage !== initialProfileImage
    ) {
      setShowModal(true);
    } else {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "profile" }],
        })
      );
    }
  };

  const confirmDiscardChanges = () => {
    setFirstName(initialFirstName);
    setLastName(initialLastName);
    setProfileImage(initialProfileImage);
    setShowModal(false);
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: "profile" }],
      })
    );
  };

  const handleBack = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: "profile" }],
      })
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="absolute left-10 top-16 z-10">
        <Pressable onPress={handleBack}>
          <Back width={20} height={20} />
        </Pressable>
      </View>

      <View className="top-8">
        <Text className="text-center text-[20px] font-bold">
          Profile Settings
        </Text>
      </View>

      <ScrollView className="flex-1" keyboardShouldPersistTaps="handled">
        <View className="flex-1 px-6">
          <View className="items-center my-16">
            <Pressable onPress={uploadProfileImage} className="absolute z-10">
              <View className="h-[130px] w-[130px] rounded-full bg-[#F2F2F2] items-center justify-center">
                {profileImage ? (
                  <Image
                    source={{ uri: profileImage }}
                    className="h-full w-full rounded-full"
                    style={{ resizeMode: "cover" }}
                  />
                ) : (
                  <NoProfileImg width={130} height={130} />
                )}
                <View className="absolute right-0 bottom-1">
                  <CameraIcon width={30} height={30} />
                </View>
              </View>
            </Pressable>
          </View>
          <View className="mt-28">
            <View className="mb-3">
              <Text className="mb-1">
                First Name<Text className="text-[#EE4E4E]"> *</Text>
              </Text>
              <TextInput
                className="bg-[#F3F3F3] h-[42px] rounded-[10px] px-4"
                value={firstName}
                onChangeText={handleFirstNameChange}
                maxLength={40}
                autoCapitalize="words"
              />
              {firstNameError ? (
                <Text className="text-[#EE4E4E] italic">{firstNameError}</Text>
              ) : null}
            </View>

            <View className="mb-3">
              <Text className="mb-1">
                Last Name<Text className="text-[#EE4E4E]"> *</Text>
              </Text>
              <TextInput
                className="bg-[#F3F3F3] h-[42px] rounded-[10px] px-4"
                value={lastName}
                onChangeText={handleLastNameChange}
                maxLength={40}
                autoCapitalize="words"
              />
              {lastNameError ? (
                <Text className="text-[#EE4E4E] italic">{lastNameError}</Text>
              ) : null}
            </View>
            <View className="mb-3">
              <Text className="mb-1">Email</Text>
              <View className="bg-[#F3F3F3] h-[42px] rounded-[10px] px-4 justify-center">
                <Text className="text-[#B7B7B7]">{user?.email}</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      <View className="absolute bottom-0 w-full flex-row justify-between px-6 pb-4">
        <Pressable
          onPress={handleCancel}
          className="flex mx-2 bg-[#F9F9F9] rounded-[10px] border border-solid border-[#7AB2B2] w-[160px] h-[42px] justify-center"
        >
          <Text className="text-center text-[#7AB2B2] text-[16px]">Cancel</Text>
        </Pressable>

        <Pressable
          onPress={handleSave}
          className="bg-[#7AB2B2] items-center justify-center rounded-[10px] w-[160px] h-[42px]"
        >
          <View>
            {isSaving ? (
              <Spinner type={"primary"} />
            ) : (
              <Text className="text-[16px] text-white">Save</Text>
            )}
          </View>
        </Pressable>
      </View>

      <Modal transparent={true} visible={showModal}>
        <View className="flex-1 justify-center items-center bg-black opacity-90">
          <View className="bg-white rounded-[10px] p-6">
            <Text className="text-center text-[18px] font-bold">
              Discard Changes?
            </Text>
            <Text className="mt-2 text-center">
              You have unsaved changes. Do you want to discard them?
            </Text>
            <View className="flex-row justify-between items-center mt-4">
              <Pressable
                onPress={() => setShowModal(false)}
                className="border border-solid border-[#7AB2B2] rounded-[10px] px-12 py-2.5"
              >
                <Text className="text-[#7AB2B2] text-[16px]">Edit</Text>
              </Pressable>
              <Pressable
                onPress={confirmDiscardChanges}
                className="bg-[#7AB2B2] border border-solid border-[#7AB2B2] rounded-[10px] px-12 py-2.5"
              >
                <Text className="text-white text-[16px]">Discard</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default ProfileSettings;
