import {
  TextInput,
  View,
  Text,
  Pressable,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import { useState } from "react";
import Header from "@/components/common/Header";
import { Href, Link, useRouter } from "expo-router";
import { signUp } from "@/components/auth/sign-up";
import { createUser } from "@/network/web/user";
import { routes } from "@/utils/routes";
import CustomButton from "@/components/buttons/CustomButton";
import { validateForm } from "@/components/validators/verifyRegistrationDetails";

export default function Register() {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    setLoading(true);

    const { success, message } = validateForm(
      firstName,
      lastName,
      email,
      password,
      confirmPassword
    );

    if (!success) {
      Alert.alert("Registration Error", message);
      setLoading(false);
      return;
    }

    try {
      const userData = {
        first_name: firstName,
        last_name: lastName,
        email: email,
      };

      const firebaseAuthUser = await signUp(email, password);
      const newUser = await createUser(userData);
      setLoading(false);

      if (firebaseAuthUser && newUser) {
        router.replace(routes.login as Href<string | object>);
      }
    } catch (error) {
      console.error(error);
      Alert.alert(
        "Registration Error",
        "Please check your credentials and try again."
      );
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-[#ffffff]">
      <KeyboardAvoidingView>
        <Header />
        <View className="mx-8 mt-16">
          <View className="mb-4">
            <Text className="text-[20px] font-bold">
              Thank you for styling with us!
            </Text>
            <Text>Please enter your details for registration:</Text>
          </View>
          <View>
            <View className="mb-3">
              <Text className="mb-1">
                First Name<Text className="text-[#EE4E4E]"> *</Text>
              </Text>
              <TextInput
                className="bg-[#F3F3F3] h-[42px] rounded-[10px] px-4"
                value={firstName}
                onChangeText={setFirstName}
              />
            </View>
            <View className="mb-3">
              <Text className="mb-1">
                Last Name<Text className="text-[#EE4E4E]"> *</Text>
              </Text>
              <TextInput
                className="bg-[#F3F3F3] h-[42px] rounded-[10px] px-4"
                value={lastName}
                onChangeText={setLastName}
              />
            </View>
            <View className="mb-3">
              <Text className="mb-1">
                Email<Text className="text-[#EE4E4E]"> *</Text>
              </Text>
              <TextInput
                className="bg-[#F3F3F3] h-[42px] rounded-[10px] px-4"
                value={email}
                onChangeText={setEmail}
              />
            </View>
            <View className="mb-3">
              <Text>
                Password<Text className="text-[#EE4E4E]"> *</Text>
              </Text>
              <TextInput
                className="bg-[#F3F3F3] h-[42px] rounded-[10px] px-4"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={true}
              />
            </View>
            <View className="mb-8">
              <Text className="mb-1">
                Confirm Password<Text className="text-[#EE4E4E]"> *</Text>
              </Text>
              <TextInput
                className="bg-[#F3F3F3] h-[42px] rounded-[10px] px-4"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={true}
              />
            </View>
            <View>
              <CustomButton
                isLoading={loading}
                callBack={handleSignUp}
                label={"Sign up"}
                type={"primary"}
              />
              <Link
                href={routes.login as Href<string | object>}
                className="text-[#7ab2b2] underline text-center mt-3"
              >
                I already have an account
              </Link>
              <View className="flex-row items-center my-4">
                <View className="flex-1 h-px bg-gray-400"></View>
                <Text className="text-center mx-4">or</Text>
                <View className="flex-1 h-px bg-gray-400"></View>
              </View>
              <Pressable className="bg-[#F3F3F3] h-[42px] rounded-[10px] px-4">
                <View className="flex-1 justify-center items-center">
                  <Link href={routes.welcome as Href<string | object>}>
                    Sign Up with Google
                  </Link>
                </View>
              </Pressable>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}
