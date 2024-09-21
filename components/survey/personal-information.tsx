import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Platform,
  ScrollView,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import * as Location from "expo-location";

interface PersonalInformationProps {
  setPersonalInfo: (info: PersonalInfoData) => void;
}

interface PersonalInfoData {
  birthday: string;
  gender: string;
  location: string | null;
  height_cm: number;
  weight_kg: number;
}

const PersonalInformation: React.FC<PersonalInformationProps> = ({
  setPersonalInfo,
}) => {
  const [selectedId, setSelectedId] = useState<"1" | "2" | "3" | "4">("1");
  const [birthday, setBirthday] = useState("");
  const [date, setDate] = useState<Date>(new Date());
  const [show, setShow] = useState(false);
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [address, setAddress] = useState<string | null>(null);
  const [height, setHeight] = useState<number>(160);
  const [weight, setWeight] = useState<number>(70);

  const genderButtons = [
    { id: "1", label: "Female" },
    { id: "2", label: "Male" },
    { id: "3", label: "Non-Binary" },
    { id: "4", label: "Rather Not Say" },
  ];

  const toggleShow = () => {
    setShow(!show);
  };

  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      month: "long",
      day: "2-digit",
      year: "numeric",
    };
    return new Intl.DateTimeFormat("en-US", options).format(date);
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
            `${firstResult.city}, ${firstResult.region}, ${firstResult.country}`
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

  useEffect(() => {
    const genderMapping: { [key in "1" | "2" | "3" | "4"]: string } = {
      "1": "Female",
      "2": "Male",
      "3": "Non-Binary",
      "4": "Rather Not Say",
    };

    setPersonalInfo({
      birthday,
      gender: genderMapping[selectedId],
      location: address,
      height_cm: height,
      weight_kg: weight,
    });
  }, [birthday, selectedId, address, height, weight]);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (address) {
    text = `${address}`;
  } else if (location) {
    text = `Coordinates: ${JSON.stringify(location.coords)}`;
  }

  return (
    <ScrollView>
      <View className="flex justify-center items-center mt-10 mb-10">
        <Text className="text-[20px] text-center font-bold">
          Personal Information
        </Text>
      </View>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View className="px-5">
          {/* Birthday */}
          <View className="mb-5">
            <Text className="text-lg">Birthday</Text>
            <TouchableOpacity onPress={toggleShow}>
              <View className="border border-gray-300 p-3 rounded-lg flex-row justify-between items-center">
                <Text>{birthday || "Month | Day | Year"}</Text>
              </View>
            </TouchableOpacity>
            {show && (
              <DateTimePicker
                mode="date"
                display={Platform.OS === "android" ? "spinner" : "default"}
                value={date}
                onChange={onChange}
              />
            )}
          </View>

          {/* Gender */}
          <View className="mb-5">
            <Text className="text-lg">Gender</Text>
            <View className="flex flex-row flex-wrap justify-between mt-3">
              {genderButtons.map((button) => (
                <TouchableOpacity
                  key={button.id}
                  onPress={() =>
                    setSelectedId(button.id as "1" | "2" | "3" | "4")
                  }
                  className={`w-[48%] py-2 px-5 border rounded-[10px] mb-3 ${
                    selectedId === button.id
                      ? "border-tertiary bg-tertiary"
                      : "border-tertiary"
                  }`}
                >
                  <Text
                    className={`text-center ${
                      selectedId === button.id ? "text-white" : "text-tertiary"
                    }`}
                  >
                    {button.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Height */}
          <View className="mb-5">
            <View className="flex-row justify-between">
              <Text className="text-lg">Height</Text>
              <Text className="ml-2 text-tertiary">cm</Text>
            </View>
            <View className="flex-row items-center">
              <TextInput
                className="flex-1 border-[#F3F3F3] bg-[#F3F3F3] rounded-lg p-3"
                keyboardType="numeric"
                placeholder="Enter Height"
                value={height.toString()}
                onChangeText={(value) => setHeight(Number(value))}
              />
            </View>
          </View>

          {/* Weight */}
          <View className="mb-5">
            <View className="flex-row justify-between">
              <Text className="text-lg">Weight</Text>
              <Text className="ml-2 text-tertiary">kg</Text>
            </View>
            <View className="flex-row items-center">
              <TextInput
                className="flex-1 border-[#F3F3F3] bg-[#F3F3F3] rounded-lg p-3"
                keyboardType="numeric"
                placeholder="Enter Weight"
                value={weight.toString()}
                onChangeText={(value) => setWeight(Number(value))}
              />
            </View>
          </View>

          {/* Location */}
          <View className="mb-5">
            <Text className="text-lg">Location</Text>
            <TouchableOpacity onPress={requestLocationPermission}>
              <View className="border-[#F3F3F3] bg-[#F3F3F3] p-3 rounded-lg">
                <Text>{text}</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default PersonalInformation;
