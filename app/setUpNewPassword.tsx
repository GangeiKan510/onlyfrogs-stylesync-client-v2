import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { auth } from "@/firebaseConfig";
import { updatePassword } from "firebase/auth";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";
import Back from "@/assets/icons/back-icon.svg";
import CirclesIcon from "@/assets/icons/circles-icon.svg";
import LockIcon from "@/assets/icons/lock-icon.svg";
import Eye from "@/assets/icons/eye-icon.svg";
import EyeSlash from "@/assets/icons/eye-slash-icon.svg";
import Header from "@/components/common/Header";

const ResetPassword = () => {
  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState<boolean>(false);
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<string>("");
  const [confirmPasswordError, setConfirmPasswordError] = useState<string>("");

  const navigation = useNavigation();

  const validatePassword = (value: string) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*\d)(?=.{6,})/;
    if (!passwordRegex.test(value)) {
      setPasswordError(
        "Password must contain at least 1 uppercase letter, 1 special character, 1 number, and be at least 6 characters long."
      );
    } else {
      setPasswordError("");
    }
  };

  const handleNewPasswordChange = (value: string) => {
    setNewPassword(value);
    validatePassword(value);
    // Validate confirm password
    validateConfirmPassword(confirmPassword);
  };

  const validateConfirmPassword = (value: string) => {
    if (value !== newPassword) {
      setConfirmPasswordError("Passwords do not match.");
    } else {
      setConfirmPasswordError("");
    }
  };

  const handleConfirmPasswordChange = (value: string) => {
    setConfirmPassword(value);
    validateConfirmPassword(value);
  };

  const handleResetPassword = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      Toast.show({
        type: "error",
        text1: "All fields are required",
        position: "top",
      });
      return;
    }

    if (passwordError || confirmPasswordError) {
      Toast.show({
        type: "error",
        text1: "Please fix the errors before proceeding.",
        position: "top",
      });
      return;
    }

    setLoading(true);
    try {
      const user = auth.currentUser;
      await updatePassword(user, newPassword);
      setLoading(false);
      Toast.show({
        type: "success",
        text1: "Password reset successful",
        position: "top",
      });
      navigation.goBack();
    } catch (error) {
      setLoading(false);
      Toast.show({
        type: "error",
        text1: "Failed to reset password",
        text2: "Please try again.",
        position: "top",
      });
      console.log("Error resetting password:", error);
    }
  };

  return (
    <View className="flex-1 bg-white">
      <View className="absolute left-10 top-16 z-10">
        <TouchableOpacity onPress={() => navigation.goBack()} className="mb-6">
          <Back width={20} height={20} />
        </TouchableOpacity>
      </View>
      <Header />
      <ScrollView className="flex-1" keyboardShouldPersistTaps="handled">
        <View className="absolute top-[11%] left-[31.5%] z-10">
          <LockIcon />
        </View>
        <View className="justify-center items-center mt-16">
          <CirclesIcon />
        </View>

        <View className="flex-1 mt-16 mx-10">
          <View className="justify-center items-center mb-10">
            <Text className="text-[24px] font-bold">Reset Your Password</Text>
            <Text className="text-[16px] mt-4 text-center">
              Please enter your current password and your new password below.
            </Text>
          </View>

          <Text className="mb-1">Current Password</Text>
          <View className="relative">
            <TextInput
              className="bg-[#F3F3F3] h-[42px] rounded-[10px] px-4 mb-4"
              value={currentPassword}
              onChangeText={(input) => setCurrentPassword(input)}
              secureTextEntry={!showCurrentPassword}
            />
            <TouchableOpacity
              className="absolute right-0 items-center justify-center px-4 h-[42px]"
              onPress={() => setShowCurrentPassword(!showCurrentPassword)}
            >
              {showCurrentPassword ? (
                <EyeSlash width={20} height={20} fill="#B7B7B7" />
              ) : (
                <Eye width={20} height={20} fill="#B7B7B7" />
              )}
            </TouchableOpacity>
          </View>

          <Text className="mb-1">New Password</Text>
          <View className="relative">
            <TextInput
              className="bg-[#F3F3F3] h-[42px] rounded-[10px] px-4 mb-4"
              value={newPassword}
              onChangeText={handleNewPasswordChange}
              secureTextEntry={!showNewPassword}
            />
            <TouchableOpacity
              className="absolute right-0 items-center justify-center px-4 h-[42px]"
              onPress={() => setShowNewPassword(!showNewPassword)}
            >
              {showNewPassword ? (
                <EyeSlash width={20} height={20} fill="#B7B7B7" />
              ) : (
                <Eye width={20} height={20} fill="#B7B7B7" />
              )}
            </TouchableOpacity>
          </View>
          {passwordError ? (
            <Text className="text-red-500 mb-4">{passwordError}</Text>
          ) : null}

          <Text className="mb-1">Confirm Password</Text>
          <View className="relative">
            <TextInput
              className="bg-[#F3F3F3] h-[42px] rounded-[10px] px-4 mb-4"
              value={confirmPassword}
              onChangeText={handleConfirmPasswordChange}
              secureTextEntry={!showConfirmPassword}
            />
            <TouchableOpacity
              className="absolute right-0 items-center justify-center px-4 h-[42px]"
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? (
                <EyeSlash width={20} height={20} fill="#B7B7B7" />
              ) : (
                <Eye width={20} height={20} fill="#B7B7B7" />
              )}
            </TouchableOpacity>
          </View>
          {confirmPasswordError ? (
            <Text className="text-red-500 mb-4">{confirmPasswordError}</Text>
          ) : null}

          <TouchableOpacity
            className="bg-[#7ab2b2] h-[42px] rounded-[10px] px-4 mb-6 justify-center items-center"
            onPress={handleResetPassword}
            disabled={loading}
          >
            <Text className="text-white text-[16px]">
              {loading ? "Resetting..." : "Reset Password"}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default ResetPassword;
