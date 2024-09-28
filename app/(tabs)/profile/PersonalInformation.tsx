import React, { useMemo, useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  Platform,
  ScrollView,
  KeyboardAvoidingView,
  SafeAreaView,
} from "react-native";
import { RadioButtonProps } from "react-native-radio-buttons-group";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import * as Location from "expo-location";

const PersonalInformation = () => {
  const [selectedId, setSelectedId] = useState<string | undefined>();
  const [birthday, setBirthday] = useState("");
  const [date, setDate] = useState<Date>(new Date());
  const [show, setShow] = useState(false);
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [address, setAddress] = useState<string | null>(null);

  const gender: RadioButtonProps[] = useMemo(
    () => [
      { id: "1", label: "Man" },
      { id: "2", label: "Woman" },
      { id: "3", label: "Non-Binary" },
      { id: "4", label: "Prefer not to say" },
    ],
    []
  );

  const toggleShow = () => {
    setShow(!show);
  };

  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      month: "long",
      day: "2-digit",
      year: "numeric",
    };
    const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
      date
    );

    const [month, day, year] = formattedDate.replace(",", "").split(" ");

    return `${month} | ${day} | ${year}`;
  };

  const onChange = (
    _event: DateTimePickerEvent,
    selectedDate: Date | undefined
  ) => {
    if (selectedDate) {
      setDate(selectedDate);
      setBirthday(formatDate(selectedDate));
    }
    setShow(false);
  };

  const requestLocationPermission = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let locationServicesEnabled = await Location.hasServicesEnabledAsync();
      if (!locationServicesEnabled) {
        setErrorMsg(
          "Location services are not enabled. Please turn on location services."
        );
        return;
      }

      let location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      if (location) {
        setLocation(location);
        setErrorMsg(null);

        let reverseGeocode = await Location.reverseGeocodeAsync({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });

        if (reverseGeocode.length > 0) {
          let firstResult = reverseGeocode[0];
          setAddress(
            ` ${firstResult.city}, ${firstResult.region}, ${firstResult.country}`
          );
        } else {
          setErrorMsg("Unable to retrieve address from location.");
        }
      } else {
        setErrorMsg("Current location not available. Please try again.");
      }
    } catch (error) {
      setErrorMsg("Failed to get location: " + (error as Error).message);
    }
  };

  useEffect(() => {
    requestLocationPermission();
  }, []);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (address) {
    text = `${address}`;
  } else if (location) {
    text = `Coordinates: ${JSON.stringify(location.coords)}`;
  }

  const handleCancel = () => {
    // Cancel the personal information
  };

  const handleSave = () => {
    // Save the personal information
  };

  return (
    <SafeAreaView className="flex-1 bg-[#ffffff] mt-10">
      <ScrollView>
        <View className="flex justify-center items-center mt-5 mb-5">
          <Text className="text-[20px] text-center font-bold">
            Personal Information
          </Text>
        </View>
        <KeyboardAvoidingView
          style={{ flex: 1 }} // Added flex: 1
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          <View>
            {/* Birthday */}
            <View>
              <Text className="pt-6 px-5 text-[16px]">Birthday</Text>
              <View className="flex-row items-center justify-center mt-3">
                {!show && (
                  <Pressable onPress={toggleShow}>
                    <TextInput
                      className="p-1.5 bg-[#D9D9D9] bh-[42px] rounded-[5px] px-4 w-80 text-center text-black"
                      value={birthday}
                      placeholder="Month | Day | Year"
                      editable={false}
                      onPressIn={toggleShow}
                    />
                  </Pressable>
                )}
                {show && (
                  <DateTimePicker
                    mode="date"
                    display={Platform.OS === "android" ? "spinner" : "default"}
                    value={date}
                    onChange={onChange}
                  />
                )}
              </View>
            </View>
            {/* Gender */}
            <View className="mt-12">
              <Text className="pt-30 px-5 text-[16px]">Gender</Text>
              <View className="px-5 flex-row flex-wrap">
                {gender.map((button) => (
                  <View
                    key={button.id}
                    className={`border border-[#7AB2B2] rounded-full p-1 mb-4 w-[44%] ${selectedId === button.id ? "bg-[#7AB2B2]" : "bg-[#F3F3F3]"} m-2`}
                  >
                    <Text
                      className={`text-center text-base ${selectedId === button.id ? "text-white" : "text-black"}`}
                      onPress={() => setSelectedId(button.id)}
                    >
                      {button.label}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
            {/* Location */}
            <View className="mt-11">
              <View className="flex-row">
                <Text className="pt-30 px-5 text-[16px]">Location</Text>
              </View>
            </View>
            <View className="items-center mt-1">
              <Pressable onPress={requestLocationPermission}>
                <TextInput
                  className="pt-1 bg-[#D9D9D9] bh-[42px] rounded-[10px] px-4 w-80 h-10 text-black"
                  value={text}
                  editable={false}
                  onPress={requestLocationPermission}
                />
              </Pressable>
            </View>
            {/* Height */}
            <View className="mt-11">
              <View className="flex-row">
                <Text className="pt-30 px-5 text-[16px]">Height</Text>
                <Text className="pt-25 absolute right-10 text-[20px] text-[#7AB2B2]">
                  cm
                </Text>
              </View>
              <View className="items-center mt-1">
                <TextInput
                  className="bg-[#D9D9D9] bh-[42px] rounded-[10px] px-4 w-80 h-10"
                  keyboardType="numeric"
                  placeholder="Enter Height"
                />
              </View>
            </View>
            {/* Weight */}
            <View className="mt-11">
              <View className="flex-row">
                <Text className="pt-30 px-5 text-[16px]">Weight</Text>
                <Text className="pt-25 absolute right-10 text-[20px] text-[#7AB2B2]">
                  kg
                </Text>
              </View>
              <View className="mt-1 items-center">
                <TextInput
                  className="bg-[#D9D9D9] bh-[42px] rounded-[10px] px-4 w-80 h-10"
                  keyboardType="numeric"
                  placeholder="Enter Weight"
                />
              </View>
            </View>

            {/* buttons */}
            <View className="flex-row justify-between fixed mt-10 mb-5">
              <Pressable
                onPress={handleCancel}
                className="flex mx-5 bg-[#F9F9F9] rounded-[10px] border border-solid border-[#7AB2B2]"
              >
                <Text className="text-center text-[#7AB2B2] text-[16px] w-[150px] h-[42px] py-2">
                  Cancel
                </Text>
              </Pressable>

              <Pressable
                onPress={handleSave}
                className="flex mr-5 bg-[#7AB2B2] rounded-[10px]"
              >
                <Text className="text-center text-[#FFFFFF] text-[16px] w-[150px] h-[42px] py-2">
                  Save
                </Text>
              </Pressable>
            </View>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PersonalInformation;
