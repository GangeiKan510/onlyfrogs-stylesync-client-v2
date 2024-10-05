import React, { useState } from "react";
import Header from "@/components/common/Header";
import { View, Text, TextInput, Pressable, ScrollView } from "react-native";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/firebaseConfig";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";
import Back from "../assets/icons/back-icon.svg";
import CirclesIcon from "../assets/icons/circles-icon.svg";
import LockIcon from "../assets/icons/lock-icon.svg";
import { Href, Link } from "expo-router";
import { routes } from "@/utils/routes";

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
      <ScrollView className="flex-1" keyboardShouldPersistTaps="handled">
        <View className="absolute top-[14%] left-[31.5%] z-10">
          <LockIcon />
        </View>
        <View className="justify-center items-center mt-16">
          <CirclesIcon />
        </View>

        <View className="flex-1 mt-16 mx-10">
          <View className="justify-center items-center mb-10">
            <Text className="text-[24px] font-bold">Reset Your Password</Text>
            <Text className="text-[16px] mt-4 text-center">
              Enter the email associated with your account and we&apos;ll send
              an email with instructions to reset your password.
            </Text>
          </View>

          <Text className="mb-1">Email</Text>
          <TextInput
            className="bg-[#F3F3F3] h-[42px] rounded-[10px] px-4 mb-4"
            value={email}
            onChangeText={(input) => setEmail(input)}
            keyboardType="email-address"
          />

          <Pressable
            className="bg-[#7ab2b2] h-[42px] rounded-[10px] px-4 mb-6 justify-center items-center"
            onPress={handleResetPassword}
            disabled={loading}
          >
            <Text className="text-white text-[16px]">
              {loading ? "Sending..." : "Send Code"}
            </Text>
          </Pressable>
          {/* <Link
            href={routes.verificationCode as Href<string | object>}
            className="text-[#0d0e0e] text-[16px] underline text-center mt-3"
          >
            <Text>Proceed to verify code</Text>
          </Link> */}
        </View>
      </ScrollView>
    </View>
  );
}
