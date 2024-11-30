import React, { useEffect, useState } from "react";
import { Tabs } from "expo-router";
import { UserProvider } from "@/components/config/user-context";
import HomeIcon from "../../assets/icons/tabs/home.svg";
import DesignIcon from "../../assets/icons/tabs/design.svg";
import NotificationsIcon from "../../assets/icons/tabs/notifications.svg";
import ProfileIcon from "../../assets/icons/tabs/profile.svg";
import AliIcon from "../../assets/icons/tabs/ali.svg";
import AliActiveIcon from "../../assets/icons/tabs/ali-active.svg";
import { View, Text, Keyboard, Animated } from "react-native";
import { useRouter } from "expo-router";
import { auth } from "@/firebaseConfig";
import { routes } from "@/utils/routes";
import { onAuthStateChanged } from "firebase/auth";
import LoadingScreen from "@/components/common/LoadingScreen";

export default function TabLayout() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const tabBarOffset = new Animated.Value(0);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoading(false);
      } else {
        router.replace(routes.welcome as "/welcome");
      }
    });

    return () => unsubscribe();
  }, [router]);

  
  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      Animated.timing(tabBarOffset, {
        toValue: 60,
        duration: 50,
        useNativeDriver: true,
      }).start();
    });

    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      Animated.timing(tabBarOffset, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
      }).start();
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  if (loading) {
    return <LoadingScreen message={"Preparing the app."} />;
  }

  return (
    <UserProvider>
      <Tabs
        screenOptions={({ route }) => ({
          tabBarInactiveTintColor: "black",
          tabBarActiveTintColor: "#7ab2b2",
          headerShown: false,
          position: "absolute",
          tabBarStyle: {
            height: 60,
            bottom: 0,
            backgroundColor: "#f3f3f3",
            paddingVertical: 20,
            paddingTop:10,
            position: "fixed",
            // display: keyboardVisible ? "none" : "flex",
            transform: [{ translateY: tabBarOffset }],
          },
          tabBarLabelStyle: {
            
            fontSize: 14,
            fontWeight: route.name === "index" ? "bold" : "normal",
          },
        })}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "",
            tabBarIcon: ({ focused }) => (
              <View className="flex flex-col items-center justify-center w-16">
                <HomeIcon
                  className="w-5 h-5"
                  color={focused ? "#7ab2b2" : "black"}
                />
                <Text
                className={`mt-1 text-xs text-center whitespace-nowrap ${
                  focused ? "text-[#7ab2b2]" : "text-black"
                }`}
                >
                  Home
                </Text>
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="design"
          options={{
            title: "",
            tabBarIcon: ({ focused }) => (
              <View className="flex flex-col items-center justify-center w-16">
                <DesignIcon
                  width={23.36}
                  height={22}
                  color={focused ? "#7ab2b2" : "black"}
                />
                <Text
                   className={`mt-1 text-xs text-center whitespace-nowrap ${
                    focused ? "text-[#7ab2b2]" : "text-black"
                  }`}
                >
                  Design
                </Text>
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="index"
          options={{
            title: "",
            tabBarIcon: ({ focused }) => (
              <View className="flex flex-col items-center justify-center w-16">
                {focused ? (
                  <AliActiveIcon width={65} height={55} />
                ) : (
                  <AliIcon width={75} height={55} />
                )}
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="notifications"
          options={{
            title: "",
            tabBarIcon: ({ focused }) => (
              <View className="flex flex-col items-center justify-center w-20">
                <NotificationsIcon
                  width={22}
                  height={22}
                  color={focused ? "#7ab2b2" : "black"}
                />
                <Text
                 className={`mt-1 text-xs text-center whitespace-nowrap ${
                  focused ? "text-[#7ab2b2]" : "text-black"
                }`}
                >
                  Notifications
                </Text>
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "",
            tabBarIcon: ({ focused }) => (
              <View className="flex flex-col items-center justify-center w-20">
                <ProfileIcon
                  width={22}
                  height={22}
                  color={focused ? "#7ab2b2" : "black"}
                />
                <Text
                 className={`mt-1 text-xs text-center whitespace-nowrap ${
                  focused ? "text-[#7ab2b2]" : "text-black"
                }`}
                >
                  Profile
                </Text>
              </View>
            ),
          }}
        />

        <Tabs.Screen
          name="closet/[id]"
          options={{
            href: null,
          }}
        />
        <Tabs.Screen
          name="survey/survey"
          options={{
            href: null,
            tabBarStyle: { display: "none" },
          }}
        />
        <Tabs.Screen
          name="profile/body-type"
          options={{
            href: null,
            tabBarStyle: { display: "none" },
          }}
        />
        <Tabs.Screen
          name="profile/personal-information"
          options={{
            href: null,
            tabBarStyle: { display: "none" },
          }}
        />
        <Tabs.Screen
          name="profile/preferences-and-budget"
          options={{ href: null, tabBarStyle: { display: "none" } }}
        />
        <Tabs.Screen
          name="profile/reset-password"
          options={{
            href: null,
            tabBarStyle: { display: "none" },
          }}
        />
        <Tabs.Screen
          name="profile/skin-tone-analysis"
          options={{
            href: null,
            tabBarStyle: { display: "none" },
          }}
        />
        <Tabs.Screen
          name="profile/profile-settings"
          options={{
            href: null,
            tabBarStyle: { display: "none" },
          }}
        />
        <Tabs.Screen
          name="profile/subscription"
          options={{
            href: null,
            tabBarStyle: { display: "none" },
          }}
        />
        <Tabs.Screen
          name="profile/success"
          options={{
            href: null,
            tabBarStyle: { display: "none" },
          }}
        />
      </Tabs>
    </UserProvider>
  );
}