import React, { useState } from "react";
import { Modal, View, Text, TextInput, Pressable } from "react-native";

type LinkUploadModalProps = {
  isVisible: boolean;
  onClose: () => void;
  onUpload: (link: string) => void;
};

const LinkUploadModal: React.FC<LinkUploadModalProps> = ({
  isVisible,
  onClose,
  onUpload,
}) => {
  const [link, setLink] = useState("");

  const handleUpload = () => {
    const isValidImageLink = /\.(jpg|jpeg|png)(?=\?|$)/i.test(link);
    if (isValidImageLink) {
      onUpload(link);
      setLink("");
    } else {
      alert("Please enter a valid image URL with .jpg, .jpeg, or .png");
      setLink("");
    }
  };

  const handleCancel = () => {
    setLink("");
    onClose();
  };

  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-center items-center bg-black opacity-80">
        <View className="w-4/5 bg-white rounded-lg p-5 items-center">
          <Text className="text-lg font-bold mb-5">Upload Image Link</Text>
          <TextInput
            className="w-full border border-[#7AB2B2] rounded-[10px] p-2 mb-5"
            placeholder="Paste your image link here"
            value={link}
            onChangeText={setLink}
          />
          <View className="flex-row justify-between w-full">
            <Pressable
              className="border border-solid border-[#7AB2B2] rounded-[10px] px-12 py-2.5"
              onPress={handleCancel}
            >
              <Text className="text-[#7AB2B2] text-[16px]">Cancel</Text>
            </Pressable>
            <Pressable
              className="bg-[#7AB2B2] border border-solid border-[#7AB2B2] rounded-[10px] px-12 py-2.5"
              onPress={handleUpload}
            >
              <Text className="text-white text-[16px]">Upload</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default LinkUploadModal;
