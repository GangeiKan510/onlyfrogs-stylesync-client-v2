import React, { useState } from "react";
import Header from "@/components/common/Header";
import { View, Text, TextInput, Pressable } from "react-native";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/firebaseConfig";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";
import Back from "../assets/icons/back-icon.svg";
import ForgotPasswordIcon from "../assets/icons/forgot-password.svg";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const handleResetPassword = async () => {
    if (!email) {
      Toast.show({
        type: "error",
        text1: "Email is required",
        position: "top",
      });
      return;
    }

    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      setLoading(false);
      Toast.show({
        type: "success",
        text1: "Reset link sent",
        text2: "Check your email for a password reset link.",
        position: "top",
      });
    } catch (error) {
      setLoading(false);
      Toast.show({
        type: "error",
        text1: "Failed to send reset email",
        text2: "Please check the email address and try again.",
        position: "top",
      });
      console.log("Error sending password reset email:", error);
    }
  };

  return (
    <View className="flex-1 bg-white">
      <View className="absolute left-10 top-16 z-10">
        <Pressable onPress={() => navigation.goBack()} className="mb-6">
          <Back width={20} height={20} />
        </Pressable>
      </View>
      <Header />
      <View className="justify-center items-center z-10">
        <ForgotPasswordIcon />
      </View>

      <View className="flex-1 mt-20 mx-10">
        <View>
          <Text className="text-[24px] font-bold mb-4">
            Reset Your Password
          </Text>
          <Text className="text-[16px] mb-4">
            Enter the email associated with your account and we&apos;ll send an
            email with instructions to reset your password.
          </Text>

          <Text className="mb-1">Email</Text>
          <TextInput
            className="bg-[#F3F3F3] h-[42px] rounded-[10px] px-4 mb-4"
            value={email}
            onChangeText={(input) => setEmail(input)}
            keyboardType="email-address"
          />
        </View>

        <Pressable
          className="bg-[#7ab2b2] h-[42px] rounded-[10px] px-4 mb-6 justify-center items-center"
          onPress={handleResetPassword}
          disabled={loading}
        >
          <Text className="text-white text-[16px]">
            {loading ? "Sending..." : "Send Reset Link"}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
