import { View, Text, TextInput, Pressable, Platform } from "react-native";
import React, { useMemo, useState } from "react";
import Header from "@/components/common/Header";
import { RadioButtonProps } from "react-native-radio-buttons-group";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";

const PersonalInformation = () => {
  const gender: RadioButtonProps[] = useMemo(
    () => [
      { id: "1", label: "Man" },
      { id: "2", label: "Woman" },
      { id: "3", label: "Non-Binary" },
      { id: "4", label: "Prefer not to say" },
    ],
    []
  );

  const [selectedId, setSelectedId] = useState<string | undefined>();
  const [birthday, setBirthday] = useState("");
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const toggleShow = () => {
    setShow(!show);
  };

  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = { month: 'long', day: '2-digit', year: 'numeric' };
    const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);
    
    const [month, day, year] = formattedDate.replace(',', '').split(' ');
    
    return `${month} | ${day} | ${year}`;
  };
  

  const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (selectedDate) {
      setDate(selectedDate);
      setBirthday(formatDate(selectedDate));
    }
    setShow(false);
  };


 
  return (
    <View>
      <Header />
      <View>
        <Text className="text-[20px] text-center font-bold">
          Personal Information
        </Text>
      </View>
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
      {/* Height */}
      <View className="mt-14">
        <View className="flex-row">
          <Text className="pt-30 px-5 text-[16px]">Height</Text>
          <Text className="pt-25 absolute right-10 text-[20px] text-[#7AB2B2]">
            cm
          </Text>
        </View>
        <View className="items-center mt-1">
          <TextInput
            className="pt-1 bg-[#D9D9D9] bh-[42px] rounded-[10px] px-4 w-96 h-10"
            keyboardType="numeric"
            placeholder="Enter Height"
          />
        </View>
      </View>
      {/* Weight */}
      <View className="mt-16">
        <View className="flex-row">
          <Text className="pt-30 px-5 text-[16px]">Weight</Text>
          <Text className="pt-25 absolute right-10 text-[20px] text-[#7AB2B2]">
            kg
          </Text>
        </View>
        <View className="mt-1 items-center">
          <TextInput
            className="pt-1 bg-[#D9D9D9] bh-[42px] rounded-[10px] px-4 w-96 h-10"
            keyboardType="numeric"
            placeholder="Enter Weight"
          />
        </View>
      </View>
    </View>
  );
};

export default PersonalInformation;
