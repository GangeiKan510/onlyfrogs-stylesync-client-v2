import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  BackHandler,
} from "react-native";
import RangeSlider from "@/components/survey/preferences-and-budget-components/RangeSlider";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Back from "../../../assets/icons/back-icon.svg";
import Spinner from "@/components/common/Spinner";
import { useUser } from "@/components/config/user-context";
import { useRouter } from "expo-router";
import { STYLE_LIST } from "@/components/constants/style-list";
import { COLOR_LIST } from "@/components/constants/color-list";
import SheinLogo from "../../../assets/images/shein.svg";
import PenshoppeLogo from "../../../assets/images/penshoppe.svg";
import UniqloLogo from "../../../assets/images/uniqlo.svg";
import BenchLogo from "../../../assets/images/bench.svg";
import Toast from "react-native-toast-message";

const PreferencesAndBudget = () => {
  const router = useRouter();
  const { user, refetchMe } = useUser();
  const MIN_DEFAULT = 100;
  const MAX_DEFAULT = 5000;
  const [minValue, setMinValue] = useState<number>(MIN_DEFAULT);
  const [maxValue, setMaxValue] = useState<number>(MAX_DEFAULT);
  const [styles, setStyles] = useState<string[]>([]);
  const [favoriteColors, setFavoriteColors] = useState<string[]>([]);
  const [brands, setBrands] = useState<string[]>([]);

  const [showAllStyles, setShowAllStyles] = useState<boolean>(false);
  const [showAllColors, setShowAllColors] = useState<boolean>(false);
  const [showAllBrands, setShowAllBrands] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);

  const brandsList = [
    { name: "Shein", logo: SheinLogo },
    { name: "Penshoppe", logo: PenshoppeLogo },
    { name: "Uniqlo", logo: UniqloLogo },
    { name: "Bench", logo: BenchLogo },
  ];

  const toggleStyleSelection = (styleName: string): string[] => {
    let updatedStyles;

    if (styles.includes(styleName)) {
      updatedStyles = styles.filter((style) => style !== styleName);
    } else {
      updatedStyles = [...styles, styleName];
    }

    setStyles(updatedStyles);

    return updatedStyles;
  };

  const toggleColorSelection = (colorName: string): string[] => {
    let updatedColors;

    if (favoriteColors.includes(colorName)) {
      updatedColors = favoriteColors.filter((color) => color !== colorName);
    } else {
      updatedColors = [...favoriteColors, colorName];
    }

    setFavoriteColors(updatedColors);

    console.log(updatedColors);
    return updatedColors;
  };

  const toggleBrandSelection = (brandName: string): string[] => {
    let updatedBrands;

    if (brands.includes(brandName)) {
      updatedBrands = brands.filter((brand) => brand !== brandName);
    } else {
      updatedBrands = [...brands, brandName];
    }

    setBrands(updatedBrands);

    console.log(updatedBrands);
    return updatedBrands;
  };

  const handleBudgetRangeChange = (range: { min: number; max: number }) => {
    setMinValue(range.min);
    setMaxValue(range.max);
    console.log("Selected Budget Range:", range);
  };

  const visibleStyles = showAllStyles ? STYLE_LIST : STYLE_LIST.slice(0, 8);
  const visibleColors = showAllColors ? COLOR_LIST : COLOR_LIST.slice(0, 8);
  const visibleBrands = showAllBrands ? brandsList : brandsList.slice(0, 4);

  const handleSave = async () => {
    setLoading(true);
    try {
      const preferences = {
        budgetRange: {
          min: minValue,
          max: maxValue,
        },
        styles: styles,
        favoriteColors: favoriteColors,
        brands: brands,
      };

      console.log("Preferences to save:", preferences);

      await new Promise((resolve) => setTimeout(resolve, 1000));

      Toast.show({
        type: "success",
        text1: "Preferences Saved",
        text2: "Your preferences have been updated successfully.",
        position: "top",
      });
      router.push("/(tabs)/profile");
    } catch (error) {
      console.error("Error saving preferences:", error);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Failed to save preferences. Please try again.",
        position: "top",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        return true;
      }
    );
    return () => {
      backHandler.remove();
    };
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="w-full flex-row items-center top-2 px-6 z-30 mt-8 mb-4">
        <TouchableOpacity
          onPress={() => router.push("/(tabs)/profile")}
          className="absolute left-6 z-40"
        >
          <Back width={20} height={20} />
        </TouchableOpacity>
        <Text className="flex-1 text-center text-[20px] font-bold">
          Preferences and Budget
        </Text>
      </View>
      <ScrollView className="flex-1">
        <View className="mx-5">
          <Text className="font-bold mt-8 mb-1">
            Choose your preferred styles
          </Text>

          <View>
            <View className="flex-wrap flex-row">
              {visibleStyles.map((style, index) => (
                <View key={index} className="flex-row items-center mb-1">
                  <TouchableOpacity
                    className={`m-1 px-3 py-1 border-[1px] rounded-full flex-row items-center ${
                      styles.includes(style.name)
                        ? "bg-[#7AB2B2] border-[#7AB2B2]"
                        : "bg-white border-[#7AB2B2]"
                    }`}
                    onPress={() => toggleStyleSelection(style.name)}
                  >
                    <Text
                      className={`text-base ${
                        styles.includes(style.name)
                          ? "text-white"
                          : "text-[#7AB2B2]"
                      }`}
                    >
                      {style.name}
                    </Text>
                  </TouchableOpacity>
                  {!showAllStyles && STYLE_LIST.length > 8 && index === 7 && (
                    <TouchableOpacity onPress={() => setShowAllStyles(true)}>
                      <Text className="text-[#7AB2B2] text-sm ml-4 mt-4">
                        Show more...
                      </Text>
                    </TouchableOpacity>
                  )}
                  {showAllStyles && index === STYLE_LIST.length - 1 && (
                    <TouchableOpacity onPress={() => setShowAllStyles(false)}>
                      <Text className="text-[#7AB2B2] text-sm ml-4 mt-4">
                        Show less
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              ))}
            </View>

            {styles.length > 0 && (
              <View className="">
                {styles.map((styleName) => {
                  const style = STYLE_LIST.find((s) => s.name === styleName);
                  return (
                    style && (
                      <View
                        key={styleName}
                        className="bg-gray-100 px-2 mb-2 rounded-md"
                      >
                        <Text className="font-bold text-[#7AB2B2]">
                          {style.name}:
                        </Text>
                        <Text className="text-[#7AB2B2]">
                          {style.description}
                        </Text>
                      </View>
                    )
                  );
                })}
              </View>
            )}
          </View>

          <Text className="font-bold mt-8 mb-1">
            Choose your preferred colors
          </Text>

          <View>
            <View className="flex-wrap flex-row">
              {visibleColors.map((color, index) => (
                <View key={index} className="flex-row items-center mb-1">
                  <TouchableOpacity
                    className={`m-1 px-3 py-1 border-[1px] rounded-full flex-row items-center ${
                      favoriteColors.includes(color.name)
                        ? "bg-[#7AB2B2] border-[#7AB2B2]"
                        : "bg-white border-[#7AB2B2]"
                    }`}
                    onPress={() => toggleColorSelection(color.name)}
                  >
                    <View
                      style={{ backgroundColor: color.colorCode }}
                      className="w-4 h-4 rounded-full mr-2 border-gray-400 border-[0.5px]"
                    />
                    <Text
                      className={`text-base ${
                        favoriteColors.includes(color.name)
                          ? "text-white"
                          : "text-[#7AB2B2]"
                      }`}
                    >
                      {color.name}
                    </Text>
                  </TouchableOpacity>
                  {!showAllColors && COLOR_LIST.length > 8 && index === 7 && (
                    <TouchableOpacity onPress={() => setShowAllColors(true)}>
                      <Text className="text-[#7AB2B2] text-sm ml-4 mt-4">
                        Show more...
                      </Text>
                    </TouchableOpacity>
                  )}
                  {showAllColors && index === COLOR_LIST.length - 1 && (
                    <TouchableOpacity onPress={() => setShowAllColors(false)}>
                      <Text className="text-[#7AB2B2] text-sm ml-4 mt-2">
                        Show less
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              ))}
            </View>
          </View>
          <Text className="font-bold mt-8 mb-1">
            Choose your preferred brands
          </Text>

          <View>
            <View className="flex-wrap flex-row">
              {visibleBrands.map((brandName, index) => (
                <View key={index} className="flex-row items-center mb-1">
                  <TouchableOpacity
                    className={`m-1 px-3 py-1 border-[1px] rounded-full flex-row items-center ${
                      brands.includes(brandName.name)
                        ? "bg-[#7AB2B2] border-[#7AB2B2]"
                        : "bg-white border-[#7AB2B2]"
                    }`}
                    onPress={() => toggleBrandSelection(brandName.name)}
                  >
                    <View
                      style={{
                        width: 22,
                        height: 22,
                        borderRadius: 5,
                        overflow: "hidden",
                        marginRight: 8,
                      }}
                    >
                      <brandName.logo width="100%" height="100%" />
                    </View>
                    <Text
                      className={`text-base ${
                        brands.includes(brandName.name)
                          ? "text-white"
                          : "text-[#7AB2B2]"
                      }`}
                    >
                      {brandName.name}
                    </Text>
                  </TouchableOpacity>
                  {!showAllBrands && brandsList.length > 4 && index === 3 && (
                    <TouchableOpacity onPress={() => setShowAllBrands(true)}>
                      <Text className="text-[#7AB2B2] text-sm ml-4 mt-4">
                        Show more...
                      </Text>
                    </TouchableOpacity>
                  )}
                  {showAllBrands && index === brandsList.length - 1 && (
                    <TouchableOpacity onPress={() => setShowAllBrands(false)}>
                      <Text className="text-[#7AB2B2] text-sm ml-4 mt-4">
                        Show less
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              ))}
            </View>
          </View>
          <Text className="font-bold mt-8 mb-1">
            Choose your preferred budget range
          </Text>

          <GestureHandlerRootView className="mt-1">
            <View className="justify-center items-center">
              <View className="z-10">
                <View className="flex-row justify-between mx-2 ">
                  <View className="mb-5">
                    <Text className="text-black text-[14px]">Min Price</Text>
                    <Text className="text-black font-bold text-[14px]">
                      ₱{minValue}
                    </Text>
                  </View>
                  <View>
                    <Text className="text-black text-[14px]">Max Price</Text>
                    <Text className="text-black font-bold text-[14px]">
                      ₱{maxValue}
                    </Text>
                  </View>
                </View>
                <View className="px-2 py-2  mb-4 flex justify-center items-center">
                  <RangeSlider
                    sliderWidth={330}
                    min={MIN_DEFAULT}
                    max={MAX_DEFAULT}
                    step={10}
                    onValueChange={handleBudgetRangeChange}
                  />
                </View>
              </View>
            </View>
          </GestureHandlerRootView>
        </View>

        <View className="mt-5 pb-2 px-6">
          <TouchableOpacity
            className="flex items-center justify-center h-[42px] bg-[#7AB2B2] rounded-lg"
            onPress={handleSave}
            // disabled={!isFormChanged}
          >
            {loading ? (
              <Spinner type="primary" />
            ) : (
              <Text className="text-white">Save</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PreferencesAndBudget;
