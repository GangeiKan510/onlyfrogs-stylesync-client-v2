import React, { useState } from "react";
import { Modal, View, Text, TextInput, Pressable } from "react-native";
import MoreInfoIcon from "../../assets/icons/more-info-icon.svg";
import { uploadWithImageLink } from "@/network/web/clothes";

type LinkUploadModalProps = {
  isVisible: boolean;
  onClose: () => void;
  onUpload: (link: string) => void;
  closetId: string | null;
  userId: string | undefined;
};

const LinkUploadModal: React.FC<LinkUploadModalProps> = ({
  isVisible,
  onClose,
  onUpload,
  closetId,
  userId,
}) => {
  const [link, setLink] = useState("");
  const [validationMessage, setValidationMessage] = useState("");

  const handleUpload = () => {
    const isValidUrl = /^(https?:\/\/[^\s$.?#].[^\s]*)$/i.test(link);
    const isValidImageLink = /\.(jpg|jpeg|png)(?=\?|$)/i.test(link);

    if (isValidUrl && isValidImageLink) {
      onUpload(link);
      setLink("");
      setValidationMessage("");
    } else {
      setValidationMessage("The image link you enetered is invalid.");
    }
  };

  const handleCancel = () => {
    setLink("");
    setValidationMessage("");
    onClose();
  };

  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View
        className="flex-1 justify-center items-center "
        style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
      >
        <View className="w-4/5 bg-white rounded-lg p-5 items-center">
          <Text className="text-[18px] mb-5 font-bold">Image Link Upload</Text>
          <TextInput
            className="w-full border border-[#7AB2B2] rounded-[10px] p-2"
            placeholder="image.jpeg, image.png"
            placeholderTextColor={"#bbbbbb"}
            value={link}
            onChangeText={setLink}
          />
          {validationMessage ? (
            <Text className="text-red mt-2 italic">*{validationMessage}</Text>
          ) : null}
          <View className="my-3">
            <View className="flex-row gap-1 items-center justify-center px-4">
              <MoreInfoIcon />
              <Text className="text-gray">
                Please make sure that your image link format is either in PNG or
                JPG.
              </Text>
            </View>
          </View>
          <View className="flex-row justify-between w-full">
            <Pressable
              className="h-[42px] flex-1 border border-[#7ab3b3] rounded-lg mx-2 justify-center items-center"
              onPress={handleCancel}
            >
              <Text className="text-[#7AB2B2] text-[16px]">Cancel</Text>
            </Pressable>
            <Pressable
              className="h-[42px] flex-1 border border-[#7ab3b3] bg-[#7ab3b3] rounded-lg mx-2 justify-center items-center"
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
