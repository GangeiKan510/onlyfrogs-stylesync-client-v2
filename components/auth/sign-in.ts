import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebaseConfig";
import { Alert } from "react-native";

export const signIn = async (email: string, password: string) => {
  const firebaseAuth = auth;

  try {
    const res = await signInWithEmailAndPassword(firebaseAuth, email, password);
    console.log(res);
  } catch (error) {
    console.log(error);
    Alert.alert("Login Error", "Please check your credentials and try again.");
  }
};
