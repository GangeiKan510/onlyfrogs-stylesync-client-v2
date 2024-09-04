import { View, Text, Pressable } from "react-native";
import { Href, useRouter } from "expo-router";
import useSignOut from "@/network/firebase/sign-out";
import { auth } from "@/firebaseConfig";
import { routes } from "@/utils/routes";
import { useUser } from "@/components/config/user-context";

export default function HomeScreen() {
  const router = useRouter();
  const { user } = useUser();
  const [signOut] = useSignOut(auth);

  const handleLogout = async () => {
    const isSignoutSuccessful = await signOut();

    if (isSignoutSuccessful) {
      router.replace(routes.login as Href<string | object>);
    }
  };

  return (
    <View className="flex-1 justify-center items-center">
      <Text>Welcome back, {user?.first_name}!</Text>
      <Pressable onPress={handleLogout}>
        <Text className="text-[#7ab2b2] text-[16px] underline mt-3">
          Logout
        </Text>
      </Pressable>
    </View>
  );
}
