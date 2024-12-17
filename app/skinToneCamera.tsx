import React, { useState, useEffect, useRef } from "react";
import { SafeAreaView, View, Text, TouchableOpacity } from "react-native";
import Svg, { Ellipse, Rect, Mask, Defs } from "react-native-svg";
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
    <View className="flex-1">
      {isVisible && hasPermission !== null && (
        <SafeAreaView className="flex-1">
          <View className="flex-1 ">
            <View className="flex-1">
              <CameraView
                ref={cameraRef}
                facing={cameraFacing}
                className="flex-1 "
                style={{ zIndex: 4 }}
                onCameraReady={() => console.log("Camera is ready")}
              />

              <View className="flex-1 justify-center items-center absolute w-full h-full z-10">
                <Svg height="100%" width="100%">
                  <Defs>
                    <Mask id="mask" x="0" y="0" width="100%" height="100%">
                      <Rect width="100%" height="100%" fill="white" />
                      <Ellipse
                        cx="50%"
                        cy="45%"
                        rx="35%"
                        ry="25%"
                        fill="black"
                      />
                    </Mask>
                  </Defs>

                  <Rect
                    width="100%"
                    height="100%"
                    fill="rgba(0, 0, 0, 0.7)"
                    mask="url(#mask)"
                  />
                </Svg>
              </View>
            </View>
          </View>

          <View className="flex bg-white h-[15%]">
            <View className="absolute bottom-10 left-0 right-0 flex-row justify-between items-center px-8">
              <TouchableOpacity
                onPress={onCancel}
                className=" p-3 rounded-full"
              >
                <Text className="text-black"> Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={onSwitchCamera}>
                <SwitchCamera width={60} height={60} color="black" />
              </TouchableOpacity>
            </View>
            <View className="absolute bottom-6 left-0 right-0 justify-center items-center">
              <TouchableOpacity
                onPress={handleTakePicture}
                activeOpacity={0.7}
                className="flex justify-center items-center"
              >
                <CameraButton width={80} height={80} />
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      )}
    </View>
  );
};

export default SkinToneCamera;
