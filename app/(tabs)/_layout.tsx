import React, { useEffect, useState } from "react";
import { Tabs } from "expo-router";
import { UserProvider } from "@/components/config/user-context";
import HomeIcon from "../../assets/icons/tabs/home.svg";
import HomeFilled from "../../assets/icons/tabs/home-filled.svg";
import DesignIcon from "../../assets/icons/tabs/design.svg";
import NotificationsIcon from "../../assets/icons/tabs/notifications.svg";
import ProfileIcon from "../../assets/icons/tabs/profile.svg";
import AliIcon from "../../assets/icons/tabs/ali.svg";
import { View, Text, StyleSheet } from "react-native";
import { Href, useRouter } from "expo-router";
import { auth } from "@/firebaseConfig";
import { routes } from "@/utils/routes";
import { onAuthStateChanged } from "firebase/auth";
import LoadingScreen from "@/components/common/LoadingScreen";

export default function TabLayout() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoading(false);
      } else {
        router.replace(routes.welcome as Href<string | object>);
      }
    });

    return () => unsubscribe();
  }, [router]);

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
          tabBarStyle: {
            height: 90,
            backgroundColor: "#F3F3F3",
            paddingVertical: 20,
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
              <View style={styles.iconLabelContainer}>
                <HomeIcon width={22} height={22} color={focused ? "#7ab2b2" : "black"} />
                <Text style={[styles.tabLabel, { color: focused ? "#7ab2b2" : "black" }]}>Home</Text>
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="design"
          options={{
            title: "",
            tabBarIcon: ({ focused }) => (
              <View style={styles.iconLabelContainer}>
                <DesignIcon width={23.36} height={22} color={focused ? "#7ab2b2" : "black"} />
                <Text style={[styles.tabLabel, { color: focused ? "#7ab2b2" : "black" }]}>Design</Text>
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="index"
          options={{
            title: "",
            tabBarIcon: () => (
              <View style={styles.aliIconContainer}>
                <AliIcon width={89} height={89} />
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="notifications"
          options={{
            title: "",
            tabBarIcon: ({ focused }) => (
              <View style={styles.iconLabelContainer}>
                <NotificationsIcon width={22} height={22} color={focused ? "#7ab2b2" : "black"} />
                <Text style={[styles.tabLabel, { color: focused ? "#7ab2b2" : "black" }]}>Notifications</Text>
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "",
            tabBarIcon: ({ focused }) => (
              <View style={styles.iconLabelContainer}>
                <ProfileIcon width={22} height={22} color={focused ? "#7ab2b2" : "black"} />
                <Text style={[styles.tabLabel, { color: focused ? "#7ab2b2" : "black" }]}>Profile</Text>
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
          name="profile/BodyType"
          options={{
            href: null,
            tabBarStyle: { display: "none" },
          }}
        />
        <Tabs.Screen
          name="profile/PersonalInformation"
          options={{
            href: null,
            tabBarStyle: { display: "none" },
          }}
        />
        <Tabs.Screen
          name="profile/PreferencesAndBudget"
          options={{
            href: null,
            tabBarStyle: { display: "none" },
          }}
        />
        <Tabs.Screen
          name="profile/ResetPassword"
          options={{
            href: null,
            tabBarStyle: { display: "none" },
          }}
        />
        <Tabs.Screen
          name="profile/SkinToneAnalysis"
          options={{
            href: null,
            tabBarStyle: { display: "none" },
          }}
        />
        <Tabs.Screen
          name="profile/ProfileSettings"
          options={{
            href: null,
            tabBarStyle: { display: "none" },
          }}
        />
      </Tabs>
    </UserProvider>
  );
}

const styles = StyleSheet.create({
  aliIconContainer: {
    position: "absolute",
    top: -45,
    justifyContent: "center",
    alignItems: "center",
    width: 89,
    height: 89,
    borderRadius: 44.5,
  },
  iconLabelContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  tabLabel: {
    marginTop: 4,
    fontSize: 12,
  },
});
