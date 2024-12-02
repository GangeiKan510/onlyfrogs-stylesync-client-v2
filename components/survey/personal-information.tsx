import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  TouchableOpacity,
  Platform,
} from "react-native";
import * as Location from "expo-location";

interface PersonalInformationProps {
  setPersonalInfo: (info: PersonalInfoData) => void;
}

interface PersonalInfoData {
  birthday: string;
  gender: string;
  location: {
    name: string;
    lat: string;
    lon: string;
  } | null;
  height_cm: number;
  weight_kg: number;
}

const PersonalInformation: React.FC<PersonalInformationProps> = ({
  setPersonalInfo,
}) => {
  const [selectedId, setSelectedId] = useState<"1" | "2" | "3" | "4">("1");
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [address, setAddress] = useState<{
    name: string;
    lat: string;
    lon: string;
  } | null>(null);
  const [height, setHeight] = useState<number>(0);
  const [weight, setWeight] = useState<number>(0);
  const [birthDate, setBirthDate] = useState("");
  const [birthDateError, setBirthDateError] = useState<string | null>(null);
  const [parsedBirthDate, setParsedBirthDate] = useState<Date | null>(null);
  const [heightError, setHeightError] = useState<string | null>(null);
  const [weightError, setWeightError] = useState<string | null>(null);

  const genderButtons = [
    { id: "1", label: "Female" },
    { id: "2", label: "Male" },
    { id: "3", label: "Non-Binary" },
    { id: "4", label: "Rather Not Say" },
  ];

  const validateBirthDate = (dateString: string) => {
    const regex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])\/(19|20)\d{2}$/;

    if (!dateString) {
      setBirthDateError(null);
      return true;
    }
    if (!regex.test(dateString)) {
      setBirthDateError("Please enter a valid date in MM/DD/YYYY format.");
      return false;
    }

    const [month, day, year] = dateString.split("/").map(Number);

    const daysInMonth = (month: number, year: number): number => {
      return new Date(year, month, 0).getDate();
    };

    if (day > daysInMonth(month, year)) {
      setBirthDateError("Invalid day for the given month.");
      return false;
    }

    const enteredDate = new Date(year, month - 1, day);
    const today = new Date();

    if (isNaN(enteredDate.getTime())) {
      setBirthDateError("Invalid date.");
      return false;
    }

    if (enteredDate >= today) {
      setBirthDateError("Birthdate must be in the past.");
      return false;
    }

    setBirthDateError(null);
    setParsedBirthDate(enteredDate);
    return true;
  };

  const handleBirthDateChange = (value: string) => {
    const formattedDate = formatDateInput(value);
    setBirthDate(formattedDate);
    validateBirthDate(formattedDate);
  };

  const formatDateInput = (value: string) => {
    let cleaned = value.replace(/\D/g, "");

    if (cleaned.length >= 3 && cleaned.length <= 4) {
      cleaned = cleaned.replace(/^(\d{2})(\d)/, "$1/$2"); // MM/DD
    } else if (cleaned.length >= 5) {
      cleaned = cleaned.replace(/^(\d{2})(\d{2})(\d{0,4})/, "$1/$2/$3"); // MM/DD/YYYY
    }

    return cleaned.slice(0, 10);
  };

  const validateHeight = (value: number | null) => {
    if (value === null) {
      setHeightError("Height is required.");
      return false;
    }
    
    if (value == 0) {
      setHeightError(null);
      return true;
    }
    if (value < 70) {
      setHeightError("Height should be at least 70 cm.");
      return false;
    }
    if (value > 215) {
      setHeightError("Height should not exceed 215 cm.");
      return false;
    }
    setHeightError(null);
    return true;
  };
  
  const validateWeight = (value: number | null) => {
    if (value === null) {
      setWeightError("Weight is required.");
      return false;
    }
    if (value == 0) {
      setWeightError(null); 
      return true;
    }
    if (value < 8) {
      setWeightError("Weight should be at least 8 kg.");
      return false;
    }
    if (value > 150) {
      setWeightError("Weight should not exceed 150 kg.");
      return false;
    }
    setWeightError(null);
    return true;
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

          const locationObject = {
            name: `${firstResult.city}, ${firstResult.region}, ${firstResult.country}`,
            lat: location.coords.latitude.toString(),
            lon: location.coords.longitude.toString(),
          };

          setAddress(locationObject);
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

    if (!birthDateError) {
      setPersonalInfo({
        birthday: parsedBirthDate ? parsedBirthDate.toISOString() : birthDate,
        gender: genderMapping[selectedId],
        location: address,
        height_cm: height,
        weight_kg: weight,
      });
    }
  }, [birthDate, parsedBirthDate, selectedId, address, height, weight]);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (address) {
    text = `${address.name}`;
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
            <View className="flex-row items-center">
              <TextInput
                className="flex-1 border-[#F3F3F3] bg-[#F3F3F3] rounded-lg p-3"
                keyboardType="numeric"
                placeholder="MM/DD/YYYY"
                value={birthDate}
                onChangeText={handleBirthDateChange}
              />
            </View>
            {birthDateError && (
              <Text className="text-red text-xs italic">{birthDateError}</Text>
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
                onChangeText={(value) => {
                  const numericValue = Number(value);
                  if (numericValue <= 250) {
                    setHeight(numericValue);
                  }
                  validateHeight(numericValue);
                }}
              />
            </View>
            {heightError && (
              <Text className="text-red text-xs italic">{heightError}</Text>
            )}
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
                onChangeText={(value) => {
                  const numericValue = Number(value);
                  if (numericValue <= 115) {
                    setWeight(numericValue);
                  }
                  validateWeight(numericValue);
                }}
              />
            </View>
            {weightError && (
              <Text className="text-red text-xs italic">{weightError}</Text>
            )}
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
