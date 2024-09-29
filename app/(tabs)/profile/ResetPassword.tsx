import React, { useState } from "react";
import {
  Text,
  View,
  SafeAreaView,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
} from "react-native";
import Background from "../../../assets/icons/profile/background.svg";
import EyeIcon from "../../../assets/icons/profile/eye-icon.svg";
import Header from "../../../components/common/Header";
import BackButton from "@/components/buttons/BackButton";

const ResetPassword = () => {
  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [showCurrentPassword, setShowCurrentPassword] =
    useState<boolean>(false);
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  const handleShowCurrentPassword = () => {
    setShowCurrentPassword(!showCurrentPassword);
  };

  const handleShowNewPassword = () => {
    setShowNewPassword(!showNewPassword);
  };

  const handleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleRevert = () => {
    // Revert the password
  };

  const handleReset = () => {};

  return (
    <SafeAreaView className="flex-1 bg-[#ffffff]">
      <View className="items-center">
        <Background />
      </View>
      <View className="absolute flex-1 mt-10 mx-10">
        <BackButton />
      </View>
      <View className="absolute top-10 left-0 right-0 flex items-center z-10">
        <Text className="flex-1 text-center font-medium text-[16px]">
          Reset Password
        </Text>
        <View className="mt-5 items-center">
          <Header />
        </View>
      </View>

      {/* Input Fields */}
      <KeyboardAvoidingView>
        <View className="flex-1 mx-5">
          <Text className="text-[14px] mx-2 text-[#B7B7B7] ">
            Current Password
          </Text>
          <View className="bg-[#F2F2F2] border border-[#7AB2B2] rounded-[10px] mt-2 mb-8 w-[95%] h-[40px] mx-auto">
            <TextInput
              placeholder="Current Password"
              secureTextEntry={!showCurrentPassword}
              className="px-5 py-2"
              value={currentPassword}
              onChangeText={(text) => setCurrentPassword(text)}
            />
            <Pressable
              onPress={handleShowCurrentPassword}
              className="absolute right-0 mr-2 mt-2"
            >
              <EyeIcon width={20} height={20} />
            </Pressable>
          </View>

          <Text className="text-[14px] mx-2 text-[#B7B7B7]">New Password</Text>
          <View className="bg-[#F2F2F2] border border-[#7AB2B2] rounded-[10px] mt-2 mb-8 w-[95%] h-[40px] mx-auto">
            <TextInput
              placeholder="New Password"
              secureTextEntry={!showNewPassword}
              className="px-5 py-2 w-full h-full"
              value={newPassword}
              onChangeText={setNewPassword}
            />
            <Pressable
              onPress={handleShowNewPassword}
              className="absolute right-0 mr-2 mt-2"
            >
              <EyeIcon width={20} height={20} />
            </Pressable>
          </View>

          <Text className="text-[14px] mx-2 text-[#B7B7B7]">
            Confirm Password
          </Text>
          <View className="bg-[#F2F2F2] border border-[#7AB2B2] rounded-[10px] mt-2 w-[95%] h-[40px] mx-auto">
            <TextInput
              placeholder="Confirm Password"
              secureTextEntry={!showConfirmPassword}
              className="px-5 py-2 w-full h-full"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
            <Pressable
              onPress={handleShowConfirmPassword}
              className="absolute right-0 mr-2 mt-2"
            >
              <EyeIcon width={20} height={20} />
            </Pressable>
          </View>

          {/* Revert Button */}
          <View className="flex-row justify-between fixed mt-20">
            <Pressable
              onPress={handleRevert}
              className="flex mx-2 bg-[#F9F9F9] rounded-[10px] border border-solid border-[#7AB2B2] w-[45%] h-[42px]"
            >
              <Text className="text-center text-[#7AB2B2] text-[16px] py-2">
                Revert
              </Text>
            </Pressable>
            {/* Reset Button */}
            <Pressable
              onPress={handleReset}
              className="flex mr-2 bg-[#7AB2B2] rounded-[10px] w-[45%] h-[42px]"
            >
              <Text className="text-center text-[#FFFFFF] text-[16px] py-2">
                Reset
              </Text>
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ResetPassword;
