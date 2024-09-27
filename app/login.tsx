import {
  View,
  Text,
  TextInput,
  Pressable,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import Header from "@/components/common/Header";
import { Href, Link, useRouter } from "expo-router";
import { signIn } from "@/components/auth/sign-in";
import { auth } from "@/firebaseConfig";
import { onAuthStateChanged, User } from "firebase/auth";
import { routes } from "@/utils/routes";
import CustomButton from "@/components/buttons/CustomButton";
import Toast from "react-native-toast-message";
import Eye from "../assets/icons/eye-icon.svg";
import EyeSlash from "../assets/icons/eye-slash-icon.svg";

export default function Login() {
  const [user, setUser] = useState<User | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  const handleSignIn = async () => {
    setLoading(true);
    try {
      await signIn(email, password);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      Toast.show({
        type: "error",
        text1: "Login failed!",
        text2: "Please check your email and password.",
        position: "top",
        swipeable: true,
      });
      console.log(error);
    }
  };

  useEffect(() => {
    const checkAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        Toast.show({
          type: "success",
          text1: "You're now logged in!",
          position: "top",
          swipeable: true,
        });
        setUser(user);
        router.replace(routes.tabs as Href<string | object>);
      } else {
        setUser(null);
      }
    });

    return () => checkAuth();
  }, [router]);

  if (user) {
    return null;
  }

  return (
    <View className="flex-1 bg-[#ffffff]">
      <Header />
      <View className="mx-8 mt-20">
        <View className="mb-4">
          <Text className="text-[20px] font-bold">Welcome Back!</Text>
          <Text className="text-[16px]">
            Continue with one of the following:
          </Text>
        </View>
        <View>
          <View className="mb-3">
            <Text className="text-[16px] mb-1">Email Address</Text>
            <TextInput
              className="bg-[#F3F3F3] h-[42px] rounded-[10px] px-4"
              value={email}
              onChangeText={(input) => setEmail(input)}
            />
          </View>
          <View className="mb-8">
            <Text className="text-[16px]">Password</Text>
            <View className="mb-8 relative">
              <TextInput
                className="bg-[#F3F3F3] h-[42px] rounded-[10px] px-4"
                value={password}
                onChangeText={(input) => setPassword(input)}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity
                className="absolute right-0 items-center justify-center px-4 h-[42px]"
                onPress={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeSlash width={20} height={20} fill="#B7B7B7" />
                ) : (
                  <Eye width={20} height={20} fill="#B7B7B7" />
                )}
              </TouchableOpacity>
            </View>
          </View>
          <View>
            <CustomButton
              isLoading={loading}
              callBack={handleSignIn}
              label={"Login"}
              type={"primary"}
            />
            <Link
              href={routes.register as Href<string | object>}
              className="text-[#0d0e0e] text-[16px] underline text-center mt-3"
            >
              <Text>I don&apos;t have an account</Text>
            </Link>
            <View className="my-4">
              <Text className="text-center text-[16px]">or</Text>
            </View>
            <Pressable className="bg-[#F3F3F3] h-[42px] rounded-[10px] px-4">
              <View className="flex-1 justify-center items-center">
                <Link
                  href={routes.welcome as Href<string | object>}
                  className="text-[16px]"
                >
                  <Text>Sign Up with Google</Text>
                </Link>
              </View>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
}
