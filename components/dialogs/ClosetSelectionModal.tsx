import React, { useState, useEffect, useRef } from "react";
import { View, Text, Modal, Pressable, Animated, Easing } from "react-native";
import { Picker } from "@react-native-picker/picker";

interface ClosetSelectionModalProps {
  isVisible: boolean;
  closets: { id: string; name: string }[];
  onClose: () => void;
  onSave: (selectedClosetId: string) => void;
}

const ClosetSelectionModal: React.FC<ClosetSelectionModalProps> = ({
  isVisible,
  closets,
  onClose,
  onSave,
}) => {
  const [selectedClosetId, setSelectedClosetId] = useState<string | null>(
    closets[0]?.id || null
  );

  const scaleValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isVisible) {
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 300,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(scaleValue, {
        toValue: 0,
        duration: 200,
        easing: Easing.in(Easing.ease),
        useNativeDriver: true,
      }).start();
    }
  }, [isVisible]);

  const handleSave = () => {
    if (selectedClosetId) {
      onSave(selectedClosetId);
    }
    onClose();
  };

  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="none"
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-center items-center bg-black/50">
        <Animated.View
          style={[
            {
              width: "80%",
              backgroundColor: "white",
              padding: 20,
              borderRadius: 10,
            },
            {
              transform: [{ scale: scaleValue }],
            },
          ]}
        >
          <Text className="text-lg font-bold mb-4">Select Closet</Text>
          <View className="border border-gray rounded-lg mb-4">
            <Picker
              selectedValue={selectedClosetId}
              onValueChange={(itemValue) => setSelectedClosetId(itemValue)}
            >
              {closets.map((closet) => (
                <Picker.Item
                  key={closet.id}
                  label={closet.name}
                  value={closet.id}
                />
              ))}
            </Picker>
          </View>
          <View className="flex-row justify-end">
            <Pressable
              className="w-[80px] flex-row items-center justify-center px-4 py-2 border border-tertiary rounded-lg mr-2"
              onPress={onClose}
            >
              <Text className="text-tertiary">Cancel</Text>
            </Pressable>
            <Pressable
              className="w-[80px] flex-row items-center justify-center px-4 py-2 bg-tertiary rounded-lg"
              onPress={handleSave}
            >
              <Text className="text-white">Save</Text>
            </Pressable>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

export default ClosetSelectionModal;
