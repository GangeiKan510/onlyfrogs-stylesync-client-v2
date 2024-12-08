import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Modal,
  Pressable,
  ActivityIndicator,
} from "react-native";

interface EditClosetModalProps {
  visible: boolean;
  onConfirm: (name: string, description: string) => Promise<void>;
  onCancel: () => void;
  initialName: string;
  initialDescription: string;
  isLoading: boolean;
}

const EditClosetModal: React.FC<EditClosetModalProps> = ({
  visible,
  onConfirm,
  onCancel,
  initialName,
  initialDescription,
  isLoading,
}) => {
  const [name, setName] = useState(initialName);
  const [description, setDescription] = useState(initialDescription);
  const [error, setError] = useState("");

  const handleConfirm = async () => {
    if (!name.trim()) {
      setError("Name is required.");
      return;
    }
    setError("");
    await onConfirm(name.trim(), description.trim());
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onCancel}
    >
      <View
        className="flex-1 justify-center items-center"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
      >
        <View className="w-4/5 bg-white rounded-[10px] p-5">
          <Text className="text-[18px] mb-3 font-bold text-center">
            Edit Closet
          </Text>

          <Text className="text-[16px] mb-1">Name</Text>
          <TextInput
            className="bg-[#F3F3F3] h-[42px] rounded-[10px] px-4 mb-3"
            value={name}
            onChangeText={setName}
            placeholder="Enter closet name"
          />
          {error && <Text className="text-red-500 text-sm mb-3">{error}</Text>}

          <Text className="text-[16px] mb-1">Description</Text>
          <TextInput
            className="bg-[#F3F3F3] h-[42px] rounded-[10px] px-4 mb-4"
            value={description}
            onChangeText={setDescription}
            placeholder="Enter closet description"
            multiline
          />

          <View className="flex-row justify-between w-full">
            <Pressable
              className="h-[42px] flex-1 border border-[#7ab3b3] rounded-lg mx-2 justify-center items-center"
              onPress={onCancel}
              disabled={isLoading}
            >
              <Text className="text-base text-center text-text-tertiary">
                Cancel
              </Text>
            </Pressable>
            <Pressable
              className="h-[42px] flex-1 border border-[#7ab3b3] bg-[#7ab3b3] rounded-lg mx-2 justify-center items-center"
              onPress={handleConfirm}
              disabled={isLoading}
            >
              <Text className="text-base text-white text-center">
                {isLoading ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  "Save"
                )}
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default EditClosetModal;
