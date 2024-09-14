import React, { useEffect, useState } from "react";
import { Tabs } from "expo-router";
import { UserProvider } from "@/components/config/user-context";
import HomeIcon from "../../assets/icons/tabs/home.svg";
import DesignIcon from "../../assets/icons/tabs/design.svg";
import NotificationsIcon from "../../assets/icons/tabs/notifications.svg";
import ProfileIcon from "../../assets/icons/tabs/profile.svg";
import AliIcon from "../../assets/icons/tabs/ali.svg";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { Href, useRouter } from "expo-router";
import { auth } from "@/firebaseConfig";
import { routes } from "@/utils/routes";
import { onAuthStateChanged } from "firebase/auth";

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
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#F3F3F3",
        }}
      >
        <ActivityIndicator size="small" color="#7ab2b2" />
      </View>
    );
  }

  return (
    <UserProvider>
      <Tabs
        screenOptions={({ route }) => ({
          tabBarInactiveTintColor: "black",
          tabBarActiveTintColor: "black",
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
            tabBarIcon: () => (
              <View style={styles.iconLabelContainer}>
                <HomeIcon width={22} height={22} />
                <Text style={styles.tabLabel}>Home</Text>
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="design"
          options={{
            title: "",
            tabBarIcon: () => (
              <View style={styles.iconLabelContainer}>
                <DesignIcon width={23.36} height={22} />
                <Text style={styles.tabLabel}>Design</Text>
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
            tabBarIcon: () => (
              <View style={styles.iconLabelContainer}>
                <NotificationsIcon width={22} height={22} />
                <Text style={styles.tabLabel}>Notifications</Text>
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "",
            tabBarIcon: () => (
              <View style={styles.iconLabelContainer}>
                <ProfileIcon width={22} height={22} />
                <Text style={styles.tabLabel}>Profile</Text>
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
    color: "black",
  },
});
