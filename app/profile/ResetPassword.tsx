import React from "react";
import { Text, View, SafeAreaView, TextInput, Pressable } from "react-native";
import WelcomeHero from "../../assets/images/svg/welcome-hero.svg";

const ResetPassword = () => {

    const handleCancel = () => {
    // Cancel the reset password process
    }

    const handleSave = () => {
    // Save the new password
    }


  return (
    <SafeAreaView className="flex-1 bg-[#ffffff]">
      <WelcomeHero className="absolute top-0 left-0 right-0 bottom-0 z-0 h-[368px]" />
      <View className="absolute top-10 left-0 right-0 flex items-center justify-center z-10">
        <Text className="text-center font-medium text-[16px]">
          Reset Password
        </Text>
      </View>
      {/* Input Fields */}
      <View className="flex-1 mx-5">
        <Text className="text-[14px] mx-2 text-[#B7B7B7] ">
          Current Password
        </Text>
        <View className="bg-[#F2F2F2] border border-[#7AB2B2] rounded-[10px] mt-2 mb-8 w-[95%] h-[40px] mx-auto">
          <TextInput
            placeholder="Current Password"
            secureTextEntry
            className="px-5 py-2"
          />
        </View>

        <Text className="text-[14px] mx-2 text-[#B7B7B7]">
          New Password
        </Text>
        <View className="bg-[#F2F2F2] border border-[#7AB2B2] rounded-[10px] mt-2 mb-8 w-[95%] h-[40px] mx-auto">
          <TextInput
            placeholder="New Password"
            secureTextEntry
            className="px-5 py-2 w-full h-full"
          />
        </View>

        <Text className="text-[14px] mx-2 text-[#B7B7B7]">
          Confirm Password
        </Text>
        <View className="bg-[#F2F2F2] border border-[#7AB2B2] rounded-[10px] mt-2 w-[95%] h-[40px] mx-auto">
          <TextInput
            placeholder="Confirm Password"
            secureTextEntry
            className="px-5 py-2 w-full h-full"
          />
        </View>

       <View className="flex-row justify-between fixed mt-16">
        <Pressable
          onPress={handleCancel}
          className="flex mx-2 bg-[#F9F9F9] rounded-[10px] border border-solid border-[#7AB2B2]"
        >
          <Text className="text-center text-[#7AB2B2] text-[16px] w-[140px] h-[42px] py-2">
            Cancel
          </Text>
        </Pressable>

        <Pressable
          onPress={handleSave}
          className="flex mr-2 bg-[#7AB2B2] rounded-[10px]"
        >
          <Text className="text-center text-[#FFFFFF] text-[16px] w-[140px] h-[42px] py-2">
            Save
          </Text>
        </Pressable>
      </View>

      

       
      </View>
    </SafeAreaView>
  );
};

export default ResetPassword;
