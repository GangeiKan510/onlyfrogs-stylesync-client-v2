import {
  TextInput,
  View,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import Header from "@/components/common/Header";
import { Href, Link, useRouter } from "expo-router";
import { signUp } from "@/components/auth/sign-up";
import { createUser } from "@/network/web/user";
import { routes } from "@/utils/routes";
import CustomButton from "@/components/buttons/CustomButton";
import { validateForm } from "@/components/validators/verifyRegistrationDetails";
import Toast from "react-native-toast-message";
import Eye from "../assets/icons/eye-icon.svg";
import EyeSlash from "../assets/icons/eye-slash-icon.svg";

export default function Register() {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [loading, setLoading] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const nameRegex = /^[A-Za-z\s]*$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleFirstNameChange = (value: string) => {
    if (!nameRegex.test(value)) {
      setFirstNameError("Only letters and spaces are allowed.");
    } else {
      setFirstNameError("");
    }
    setFirstName(value);
  };

  const handleLastNameChange = (value: string) => {
    if (!nameRegex.test(value)) {
      setLastNameError("Only letters and spaces are allowed.");
    } else {
      setLastNameError("");
    }
    setLastName(value);
  };

  const validateEmail = (value: string) => {
    if (!emailRegex.test(value)) {
      setEmailError("Please enter a valid email address.");
    } else {
      setEmailError("");
    }
  };

  const handleEmailChange = (value: string) => {
    validateEmail(value);
    setEmail(value);
  };

  const validatePassword = (value: string) => {
    const uppercaseRegex = /[A-Z]/;
    const specialCharRegex = /[!@#$%^&*]/;
    const numberRegex = /\d/;
    const lengthRequirement = value.length >= 6;

    const validations = {
      hasUppercase: uppercaseRegex.test(value),
      hasSpecialChar: specialCharRegex.test(value),
      hasNumber: numberRegex.test(value),
      hasMinLength: lengthRequirement,
    };

    return validations;
  };

  const [passwordValidations, setPasswordValidations] = useState({
    hasUppercase: false,
    hasSpecialChar: false,
    hasNumber: false,
    hasMinLength: false,
  });

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    const validations = validatePassword(value);
    setPasswordValidations(validations);
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

  const handleSignUp = async () => {
    setLoading(true);
    
    const lowercasedEmail = email.toLowerCase();

    const { success, message } = validateForm(
      firstName,
      lastName,
      lowercasedEmail,
      password,
      confirmPassword
    );

    if (!success || emailError) {
      Toast.show({
        type: "error",
        text1: "Registration Error",
        text2: emailError || message,
        position: "top",
        swipeable: true,
      });
      setLoading(false);
      return;
    }

    validatePassword(password);
    if (passwordError) {
      setLoading(false);
      return;
    }

    validateConfirmPassword(confirmPassword);
    if (confirmPasswordError) {
      setLoading(false);
      return;
    }

    try {
      const userData = {
        first_name: firstName,
        last_name: lastName,
        email: email.toLowerCase(),
      };

      const firebaseAuthUser = await signUp(email.toLowerCase(), password);
      const newUser = await createUser(userData);

      setLoading(false);

      if (firebaseAuthUser && newUser) {
        Toast.show({
          type: "success",
          text1: "Registration Successful",
          text2: "You have successfully signed up!",
          position: "top",
          swipeable: true,
        });
        router.push("/(tabs)/survey" as Href<string | object>)
      }
    } catch (error) {
      console.error(error);
      Toast.show({
        type: "error",
        text1: "Registration Error",
        text2: "Please check your credentials and try again.",
        position: "top",
        swipeable: true,
      });
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-[#ffffff]">
      <KeyboardAvoidingView>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <Header />
          <View className="mx-8 mt-10">
            <View className="mb-4">
              <Text className="text-[20px] font-bold">
                Thank you for styling with us!
              </Text>
              <Text>Please enter your details for registration:</Text>
            </View>
            <View>
              {/* First Name */}
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
                  <Text className="text-[#EE4E4E] italic text-xs">
                    {firstNameError}
                  </Text>
                ) : null}
              </View>

              {/* Last Name */}
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
                  <Text className="text-[#EE4E4E] italic text-xs">{lastNameError}</Text>
                ) : null}
              </View>

              {/* Email */}
              <View className="mb-3">
                <Text className="mb-1">
                  Email<Text className="text-[#EE4E4E]"> *</Text>
                </Text>
                <TextInput
                  className="bg-[#F3F3F3] h-[42px] rounded-[10px] px-4"
                  value={email}
                  onChangeText={handleEmailChange}
                  autoCapitalize="none"
                  keyboardType="email-address"
                />
                {emailError ? (
                  <Text className="text-[#EE4E4E] italic text-xs">{emailError}</Text>
                ) : null}
              </View>

              {/* Password */}
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
                </View>

                {/* Validation Messages */}
                {password !== "" &&
                  [
                    !passwordValidations.hasMinLength,
                    !passwordValidations.hasUppercase,
                    !passwordValidations.hasSpecialChar,
                    !passwordValidations.hasNumber,
                  ].some(Boolean) && (
                    <Text className="italic text-[#EE4E4E] text-xs">
                      Password must include
                      {[
                        !passwordValidations.hasMinLength &&
                          " at least 6 characters long",
                        !passwordValidations.hasUppercase &&
                          " an uppercase letter",
                        !passwordValidations.hasSpecialChar &&
                          " a special character",
                        !passwordValidations.hasNumber && " a number",
                      ]
                        .filter(Boolean)
                        .join(", ")
                        .replace(/, ([^,]*)$/, " and$1")}
                    </Text>
                  )}
              </View>

              {/* Confirm Password */}
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
                    <Text className="text-[#EE4E4E] italic text-xs">
                      {confirmPasswordError}
                    </Text>
                  ) : null}
                </View>
              </View>

              {/* Sign Up Button */}
              <View>
                <CustomButton
                  isLoading={loading}
                  callBack={handleSignUp}
                  label={"Sign up"}
                  type={"primary"}
                />
                <Link
                  href={routes.login as Href<string | object>}
                  className="text-[#7ab2b2] text-center mt-3"
                >
                  I already have an account
                </Link>
                {/* <View className="flex-row items-center my-4">
                  <View className="flex-1 h-px bg-gray-400"></View>
                  <Text className="text-center mx-4">or</Text>
                  <View className="flex-1 h-px bg-gray-400"></View>
                </View>
                <Pressable className="bg-[#F3F3F3] h-[42px] rounded-[10px] px-4">
                  <View className="flex-1 justify-center items-center">
                    <Text>Sign Up with Google</Text>
                  </View>
                </Pressable> */}
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}
