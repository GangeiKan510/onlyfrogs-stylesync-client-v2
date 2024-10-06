import React, { useEffect, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, CommonActions } from "@react-navigation/native";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  Modal,
  ScrollView,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import Toast from "react-native-toast-message";
import NoProfileImg from "../../../assets/icons/profile/no-profile-img.svg";
import Back from "../../../assets/icons/back-icon.svg";
import CameraIcon from "../../../assets/icons/profile/camera-icon.svg";
import Spinner from "@/components/common/Spinner";
import { useUser } from "@/components/config/user-context";
import { UpdateUserName } from "@/utils/types/UpdateUser";
import { updateUserName } from "@/network/web/user";

const ProfileSettings = () => {
  const { user } = useUser();
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [firstName, setFirstName] = useState(user?.first_name || "");
  const [lastName, setLastName] = useState(user?.last_name || "");
  const initialFirstName = useRef(user?.first_name || "");
  const initialLastName = useRef(user?.last_name || "");
  const initialProfileImage = useRef<string | null>(null);
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    resetToInitialState();
  }, [user]);

  const resetToInitialState = () => {
    setFirstName(user?.first_name || '');
    setLastName(user?.last_name || '');
    setProfileImage(null);
    initialFirstName.current = user?.first_name || '';
    initialLastName.current = user?.last_name || '';
    initialProfileImage.current = null;
  };

  const uploadProfileImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  
    if (status === "denied") {
      Alert.alert(
        "Permission Required",
        "Permission to access the media library is required. Please enable it in settings.",
        [
          { text: "Cancel", style: "cancel" },
          {
            text: "Try Again",
            onPress: async () => {
              const newPermissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
              if (newPermissionResult.granted) {
                launchImagePicker();
              } else {
                Alert.alert("Permission still denied. Please enable it in settings.");
              }
            },
          },
        ]
      );
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

  const handleSave = async () => {
    if (validateInputs()) {
      setIsSaving(true);
  
      const userData: UpdateUserName = {
        first_name: firstName,
        last_name: lastName,
      };
  
      try {
        const updatedUser = await updateUserName(userData);
        setFirstName(updatedUser.first_name);
        setLastName(updatedUser.last_name);
        setProfileImage(profileImage);
  
        Toast.show({
          type: "success",
          text1: "Profile Saved",
          text2: "Your profile changes have been saved successfully.",
        });
  
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: "profile" }],
          })
        );
      } catch (error) {
        Toast.show({
          type: "error",
          text1: "Save Failed",
          text2: "Failed to save your profile. Please try again.",
        });
      } finally {
        setIsSaving(false);
      }
    }
    console.log()
  };
  
  
  const handleCancel = () => {
    // Compare the current values with the initial values stored in useRef
    if (
      firstName !== initialFirstName.current ||
      lastName !== initialLastName.current ||
      profileImage !== initialProfileImage.current
    ) {
      setShowModal(true); // Show modal if changes are detected
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
    resetToInitialState();
    setShowModal(false);
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
        <TouchableOpacity onPress={handleCancel}>
          <Back width={20} height={20} />
        </TouchableOpacity>
      </View>

      <View className="top-8">
        <Text className="text-center text-[20px] font-bold">
          Profile Settings
        </Text>
      </View>

      <ScrollView className="flex-1" keyboardShouldPersistTaps="handled">
        <View className="flex-1 px-6">
          <View className="items-center my-16">
            <TouchableOpacity onPress={uploadProfileImage} className="absolute z-10">
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
            </TouchableOpacity>
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
        <TouchableOpacity
          onPress={handleCancel}
          className="flex mx-2 rounded-[10px] bg-[#F9F9F9] border border-solid border-[#7AB2B2] w-[160px] h-[42px] justify-center"
        >
          <Text className="text-center text-[#7AB2B2]">Cancel</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleSave}
          className= "bg-[#7AB2B2] items-center justify-center rounded-[10px] w-[160px] h-[42px]">
          <View>
            {isSaving ? (
              <Spinner type={"primary"} />
            ) : (
              <Text className="text-[16px] text-white">Save</Text>
            )}
          </View>
        </TouchableOpacity>
      </View>

      <Modal animationType="fade" transparent={true} visible={showModal}>
        <View className="flex-1 justify-center items-center" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
          <View className="w-4/5 bg-white rounded-[10px] p-5 items-center">
            <Text className="text-[18px] mb-1 font-bold">
              Discard Changes?
            </Text>
            <Text className="mt-2 text-center">
              You have unsaved changes. Do you want to discard them?
            </Text>
            <View className="flex-row justify-between items-center mt-4">
              <TouchableOpacity
                onPress={() => setShowModal(false)}
                className="h-[42px] flex-1 border border-[#7ab3b3] rounded-lg mx-2 justify-center items-center"
              >
                <Text className="text-[#7AB2B2] text-[16px]">Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={confirmDiscardChanges}
                className="h-[42px] flex-1 border border-[#7ab3b3] bg-[#7ab3b3] rounded-lg mx-2 justify-center items-center"
              >
                <Text className="text-white text-[16px]">Discard</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default ProfileSettings;
