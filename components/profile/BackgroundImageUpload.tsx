import React, { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { View, Pressable, Image} from 'react-native';
import ImageIcon from '../../assets/icons/profile/image-icon.svg';

interface BackgroundImageProps {
  setBackgroundImage: (uri: string | null) => void;
}

const BackgroundImage: React.FC<BackgroundImageProps> = ({ setBackgroundImage }) => {
    const [backgroundImage, setBackgroundImageState] = useState<string | null>(null);

    const uploadBgImage = async () => {
        let permissionResult =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
    
        if (permissionResult.granted === false) {
          alert("Permission to access the media library is required!");
          return;
        }
    
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [16, 9],
          quality: 1,
        });
    
        if (!result.canceled) {
          if (result.assets && result.assets.length > 0) {
            const uri = result.assets[0].uri;
            setBackgroundImage(uri);
            setBackgroundImageState(uri);
          }
        }
      };

    return (
        <View className="bg-[#F2F2F2] w-full h-[150px]">
        <Pressable onPress={uploadBgImage}>
          {backgroundImage ? (
            <Image
              source={{ uri: backgroundImage }}
              className="h-full w-full"
              style={{ resizeMode: "cover" }}
            />
          ) : (
            <View className="w-full h-full items-center justify-center">
              <ImageIcon width={60} height={60}/>
            </View>
          )}
        </Pressable>
      </View>
       
    );
}


export default BackgroundImage;