import React, { useState, useEffect, useRef } from "react";
import { SafeAreaView, View, Text, TouchableOpacity } from "react-native";

import { Camera, CameraView } from "expo-camera";
import CameraButton from "@/assets/icons/shoot.svg";
import SwitchCamera from "@/assets/icons/switch-camera.svg";

interface SkinToneCameraProps {
  onTakePicture: (uri: string) => void;
  onCancel: () => void;
  onSwitchCamera: () => void;
  cameraFacing: "front" | "back";
  isVisible: boolean;
}

const SkinToneCamera = ({
  onTakePicture,
  onCancel,
  onSwitchCamera,
  cameraFacing,
  isVisible,
}: SkinToneCameraProps) => {
  const cameraRef = useRef<CameraView>(null);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  const requestCameraPermissions = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    setHasPermission(status === "granted");
  };

  useEffect(() => {
    const requestPermissions = async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasPermission(cameraStatus.status === "granted");
    };

    requestPermissions();
  }, []);

  useEffect(() => {
    requestCameraPermissions();
  }, []);

  const handleTakePicture = async () => {
    if (hasPermission && cameraRef.current) {
      const result = await cameraRef.current.takePictureAsync({});
      if (result && result.uri) {
        onTakePicture(result.uri);
      }
    }
  };

  return (
    <>
      {isVisible && hasPermission !== null && (
        <SafeAreaView className="flex-1 bg-white">
          <View className="flex-1">
            <View className="absolute top-0 left-0 right-0 bottom-40 justify-center items-center">
              <View className="w-72 h-80 rounded-full  border-4 border-[#7AB2B2]  overflow-hidden">
                <CameraView
                  ref={cameraRef}
                  className="flex-1"
                  facing={cameraFacing}
                  onCameraReady={() => console.log("Camera is ready")}
                />
              </View>
            </View>

            <View className="flex-1">
              <View className="absolute bottom-10 left-0 right-0 flex-row justify-between items-center px-8">
                <TouchableOpacity
                  onPress={onCancel}
                  className=" p-3 rounded-full"
                >
                  <Text className="text-black"> Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={onSwitchCamera}>
                  <SwitchCamera width={40} height={40} />
                </TouchableOpacity>
              </View>
              <View className="absolute bottom-5 left-0 right-0 justify-center items-center">
                <TouchableOpacity
                  onPress={handleTakePicture}
                  activeOpacity={0.7}
                  className="flex justify-center items-center"
                >
                  <CameraButton width={80} height={80} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </SafeAreaView>
      )}
    </>
  );
};

export default SkinToneCamera;
