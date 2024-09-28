import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";
import Back from "../assets/icons/back-icon.svg";
import Header from "@/components/common/Header";
import Eye from "../assets/icons/eye-icon.svg";
import EyeSlash from "../assets/icons/eye-slash-icon.svg";
import CirclesIcon from "../assets/icons/circles-icon.svg";
import LockCheckIcon from "../assets/icons/lock-check-icon.svg";

export default function SetUpNewPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const navigation = useNavigation();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

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

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    validatePassword(value);
  };

  const validateConfirmPassword = (value: string) => {
    if (value !== password) {
      setConfirmPasswordError("Passwords do not match.");
    } else {
      setConfirmPasswordError("");
    }
  };

  const handleConfirmPasswordChange = (value: string) => {
    setConfirmPassword(value);
    validateConfirmPassword(value);
  };

  const handleSetUpNewPassword = () => {
    if (passwordError || confirmPasswordError) {
      return; // Do not proceed if there are validation errors
    }

    // Proceed with password setup logic
    Toast.show({
      type: "success",
      text1: "Password Set",
      text2: "Your password has been successfully updated.",
      position: "top",
    });
  };

  return (
    <View className="flex-1 bg-white">
      <View className="absolute left-10 top-16 z-10">
        <Pressable onPress={() => navigation.goBack()} className="mb-6">
          <Back width={20} height={20} />
        </Pressable>
      </View>
      <Header />
      <ScrollView className="flex-1" keyboardShouldPersistTaps="handled">
        <View className="absolute top-[14%] left-[34.5%] z-10">
          <LockCheckIcon />
        </View>
        <View className="justify-center items-center mt-16">
          <CirclesIcon />
        </View>

        <View className="flex-1 mt-20 mx-10">
          <View className="justify-center items-center mb-10">
            <Text className="text-[24px] font-bold">Set Up New Password</Text>
            <Text className="text-[16px] mt-4 text-center">
              Create a new password for your account. Be sure to remember it for
              your next login.
            </Text>
          </View>
          <View className="mb-3">
            <Text>
              Password<Text className="text-[#EE4E4E]"> *</Text>
            </Text>
            <View className="relative">
              <TextInput
                className="bg-[#F3F3F3] h-[42px] rounded-[10px] px-4"
                value={password}
                onChangeText={handlePasswordChange}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity
                className="absolute right-0 items-center justify-center px-4 h-[42px]"
                onPress={togglePasswordVisibility}
              >
                {showPassword ? (
                  <EyeSlash width={20} height={20} fill="#B7B7B7" />
                ) : (
                  <Eye width={20} height={20} fill="#B7B7B7" />
                )}
              </TouchableOpacity>
              {passwordError ? (
                <Text className="text-[#EE4E4E] italic">{passwordError}</Text>
              ) : null}
            </View>
          </View>
          <View className="mb-8">
            <Text>
              Confirm Password<Text className="text-[#EE4E4E]"> *</Text>
            </Text>
            <View className="relative">
              <TextInput
                className="bg-[#F3F3F3] h-[42px] rounded-[10px] px-4"
                value={confirmPassword}
                onChangeText={handleConfirmPasswordChange}
                secureTextEntry={!showConfirmPassword}
              />
              <TouchableOpacity
                className="absolute right-0 items-center justify-center px-4 h-[42px]"
                onPress={toggleConfirmPasswordVisibility}
              >
                {showConfirmPassword ? (
                  <EyeSlash width={20} height={20} fill="#B7B7B7" />
                ) : (
                  <Eye width={20} height={20} fill="#B7B7B7" />
                )}
              </TouchableOpacity>
              {confirmPasswordError ? (
                <Text className="text-[#EE4E4E] italic">
                  {confirmPasswordError}
                </Text>
              ) : null}
            </View>
          </View>
          <Pressable
            className="bg-[#7ab2b2] h-[42px] rounded-[10px] px-4 justify-center items-center"
            onPress={handleSetUpNewPassword}
          >
            <Text className="text-white text-[16px]">Set Password</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}
