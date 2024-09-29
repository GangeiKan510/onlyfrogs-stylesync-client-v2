import React, { useState, useRef } from "react";
import Header from "@/components/common/Header";
import { View, Text, TextInput, Pressable, ScrollView } from "react-native";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";
import Back from "../assets/icons/back-icon.svg";
import { Href, Link } from "expo-router";
import { routes } from "@/utils/routes";
import CirclesIcon from "../assets/icons/circles-icon.svg";
import MailIcon from "../assets/icons/mail-icon.svg";

export default function VerificationCode() {
  const [code, setCode] = useState(Array(6).fill(""));
  const inputs = useRef<Array<TextInput | null>>([]);
  const navigation = useNavigation();

  const handleInputChange = (value: string, index: number) => {
    const newCode = [...code];
    newCode[index] = value;

    setCode(newCode);

    if (value.length === 1 && index < 5) {
      inputs.current[index + 1]?.focus();
    } else if (value === "" && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === "Backspace" && code[index] === "") {
      if (index > 0) {
        inputs.current[index - 1]?.focus();
      }
    }
  };

  const handleVerifyCode = () => {
    if (code.includes("")) {
      Toast.show({
        type: "error",
        text1: "Incomplete Code",
        text2: "Please enter the full 6-digit code.",
        position: "top",
      });
      return;
    }

    const verificationCode = code.join("");
    Toast.show({
      type: "success",
      text1: "Code Verified",
      text2: `Verification code: ${verificationCode}`,
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
      <ScrollView
        className="flex-1"
        keyboardShouldPersistTaps="handled"
      >
        <View className="absolute top-[17%] left-[36.5%] z-10">
          <MailIcon />
        </View>
        <View className="justify-center items-center mt-16">
          <CirclesIcon />
        </View>

        <View className="flex-1 mt-16 mx-10">
          <View className="justify-center items-center mb-10">
            <Text className="text-[24px] font-bold">
              Enter Verification Code
            </Text>
            <Text className="text-[16px] mt-4 text-center">
              We&apos;ve sent a 6-digit code to your email. Please enter it
              below to verify your account.
            </Text>
          </View>

          <View className="flex-row justify-between">
            {code.map((digit, index) => (
              <TextInput
                key={index}
                ref={(el) => (inputs.current[index] = el)}
                value={digit}
                onChangeText={(value) => handleInputChange(value, index)}
                onKeyPress={(e) => handleKeyPress(e, index)}
                keyboardType="number-pad"
                maxLength={1}
                className="bg-[#F3F3F3] h-[50px] w-[50px] text-center text-[24px] rounded-[10px] mx-1"
              />
            ))}
          </View>

          <Pressable
            className="bg-[#7ab2b2] h-[42px] rounded-[10px] px-4 mt-8 justify-center items-center"
            onPress={handleVerifyCode}
          >
            <Text className="text-white text-[16px]">Verify Code</Text>
          </Pressable>
          <Link
            href={routes.setUpNewPassword as Href<string | object>}
            className="text-[#0d0e0e] text-[16px] underline text-center mt-3"
          >
            <Text>Proceed to set up new password</Text>
          </Link>
        </View>
      </ScrollView>
    </View>
  );
}
