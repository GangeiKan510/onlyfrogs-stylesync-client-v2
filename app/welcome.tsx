import { View, Text, Pressable, ImageBackground } from "react-native";
import React from "react";
import { Href, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { routes } from "@/utils/routes";

const Welcome = () => {
  const router = useRouter();

  return (
    <ImageBackground
      source={{
        uri: "https://lh3.googleusercontent.com/pw/AP1GczMej1xjir5l5V93LJcy-yZTEt9Rd0fgwhnaDiA3hF8eKCaOyyZP4anSC9Lsmqjd7zDBIWyzzNSx4XCpXpWBNNCUeLVcljWNPKKMDegK0G3EKZB2uc67GSzfn6uUSX8PEbzZ5SsgJQ_z8pfC5zsCdCC-oiMVR78yQJLfU9OLr-w6ngkvESzXtNZxlwzNASevXg_lbM0-NwOgxMp4ntJzha6bloLf93UvVSCKOa2wHguHaw-4yK3wabt5bQFwNxzMeVlxjSGOvOlcNU3vdRqTKA7uO4gQ9oRUL5HpIqHzGKUtMaJWwEaf_oxfznYkSZe_ZiStLo0s2reHqVS0TA4UJ9NOmQ90sguC5lFjMSaAFarxxKdOnf7_JhYOs4rmqWpJVuLLxTHr5p_ds0hIS648a1CuNs8OMcocDKrJaX8kT_LyviuoXhLdJlCavtO44Y2pMgJppsaMscpctSq0S6IZ-N69SoQH4JNRXP2KrWHoYjaDdMK-wdI9-Fm9M1Dmi69aNfqZf6DE32p_B6k6FY1VElZ7XMVPIe7D_sVDl6fzVRY2qDCd5QaapFheooPF6dF6q1my5LyJdCJOUbAA7v1udsx9ACcGjaDiwAp7ylkeGmVwAJreNSDKYHEEv7v0fWdM-tRPLkxhPcYYFehCCY4SHEWzaYUYNr4rYKXtTWr4cZWs34yTk2u2aKBHpw_CrSCs-g5G8wOk7eNg_IpeLKxGF_D8QijhBbXJnLKdYv7h0J4gUhgDyqIaNLFT4y5Sb4EoKrwdmAQ59QLYbaUtf3KpIdbEE4sIqXkOpC3oLq07N2BkTVW0NIr3x_qKJjEQyu84340g1JQzkAZXVWkD2NJZTyn6be8pYwI39eM_tdLpIEkZpDe-e69KK2HRbsuhbGZ3wm7FojbiEU5G9klgsSJj02kFdBTOGFJhcXc59HFSSL29jcM8la6Z_jsCDyZQvEWpK63sZ72ev_-x6WJTHR8mM3cfXYVACH5_LX-3cxomQT6JK4m6r0vHaldRjxQSkOatUx2chuUQytTdrG_QOOMHqavbtSW71yUv0W3p=w391-h849-s-no-gm?authuser=6",
      }}
      className="flex-1"
      resizeMode="cover"
    >
      <SafeAreaView className="flex-1">
        <View className="flex-1 justify-center items-center">
          <View className="mx-8 mb-28">
            <Text className="text-[48px] text-center">StyleSync</Text>
            <Text className="text-[16px] text-center">Style effortlessly.</Text>
          </View>
        </View>
        <View className="absolute bottom-12 left-0 right-0 px-8">
          <Pressable
            onPress={() => router.push(routes.login as Href<string | object>)}
            className="bg-[#7ab2b2] rounded-[10px] h-[48px] flex justify-center items-center mb-3"
          >
            <Text className="text-white text-[16px]">Log in</Text>
          </Pressable>
          <Pressable
            onPress={() =>
              router.push(routes.register as Href<string | object>)
            }
            className="border rounded-[10px] h-[48px] flex justify-center items-center mb-2"
          >
            <Text className="text-[16px]">Sign up</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default Welcome;
