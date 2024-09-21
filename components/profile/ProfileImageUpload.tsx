import React, { useState } from "react";
import { View, Pressable, Image, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import NoProfilePicture from "../../assets/icons/profile/no-profile-picture.svg";

interface ProfileImageProps {
  setProfileImage: (uri: string) => void;
}

const ProfileImage: React.FC<ProfileImageProps> = ({ setProfileImage }) => {
  const [profileImage, setProfileImageState] = useState<string | null>(null);

  const pickImage = async () => {
    let { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status === 'denied') {
      Alert.alert(
        "Permission Required",
        "Permission to access the media library is required. Please enable it in settings.",
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "Try Again",
            onPress: async () => {
              const newPermissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
              if (newPermissionResult.granted) {
                launchImagePicker();
              } else {
                Alert.alert("Permission still denied. Please enable it in settings.");
              }
            },
          },
        ]
      );
      return;
    }

    if (status === 'granted') {
      launchImagePicker();
    }
  };

  const launchImagePicker = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const uri = result.assets[0].uri;
      setProfileImageState(uri);
      setProfileImage(uri); // Prop to parent component
    }
  };

  return (
    <Pressable onPress={pickImage} className="absolute -bottom-[50px] z-10">
      <View className="h-[110px] w-[110px] rounded-full bg-[#F2F2F2] items-center justify-center overflow-hidden">
        {profileImage ? (
          <Image
            source={{ uri: profileImage }}
            className="h-full w-full rounded-full"
            style={{ resizeMode: "cover" }}
          />
        ) : (
          <NoProfilePicture width={110} height={110} />
        )}
        </View>

    </Pressable>
  );
};

export default ProfileImage;
