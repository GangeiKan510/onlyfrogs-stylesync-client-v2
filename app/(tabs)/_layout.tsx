import React, { useEffect, useState } from "react";
import { Tabs } from "expo-router";
import { UserProvider } from "@/components/config/user-context";
import HomeIcon from "../../assets/icons/tabs/home.svg";
import DesignIcon from "../../assets/icons/tabs/design.svg";
import NotificationsIcon from "../../assets/icons/tabs/notifications.svg";
import ProfileIcon from "../../assets/icons/tabs/profile.svg";
import AliIcon from "../../assets/icons/tabs/ali.svg";
import AliActiveIcon from "../../assets/icons/tabs/ali-active.svg";
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
            height: 60,
            backgroundColor: "#f3f3f3",
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
                <HomeIcon
                  width={22}
                  height={22}
                  color={focused ? "#7ab2b2" : "black"}
                />
                <Text
                  style={[
                    styles.tabLabel,
                    { color: focused ? "#7ab2b2" : "black" },
                  ]}
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
              <View style={styles.iconLabelContainer}>
                <DesignIcon
                  width={23.36}
                  height={22}
                  color={focused ? "#7ab2b2" : "black"}
                />
                <Text
                  style={[
                    styles.tabLabel,
                    { color: focused ? "#7ab2b2" : "black" },
                  ]}
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
              <View
                style={[
                  styles.iconLabelContainer,
                  {
                    paddingBottom: 10,
                    paddingVertical: 5,
                    paddingHorizontal: 10,
                  },
                ]}
              >
                {focused ? (
                  <AliActiveIcon width={75} height={55} />
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
              <View style={styles.iconLabelContainer}>
                <NotificationsIcon
                  width={22}
                  height={22}
                  color={focused ? "#7ab2b2" : "black"}
                />
                <Text
                  style={[
                    styles.tabLabel,
                    { color: focused ? "#7ab2b2" : "black" },
                  ]}
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
              <View style={styles.iconLabelContainer}>
                <ProfileIcon
                  width={22}
                  height={22}
                  color={focused ? "#7ab2b2" : "black"}
                />
                <Text
                  style={[
                    styles.tabLabel,
                    { color: focused ? "#7ab2b2" : "black" },
                  ]}
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
