import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  Modal,
  TouchableOpacity,
  Image,
  TextInput,
  StyleSheet,
} from "react-native";
import { useUser } from "@/components/config/user-context";
import FitsCard from "@/components/cards/FitsCard";
import DeleteIcon from "../../../assets/icons/delete-icon.svg";
import EditIcon from "../../../assets/icons/edit-icon.svg";
import CloseIcon from "../../../assets/icons/close-icon.svg";
import CheckIcon from "../../../assets/icons/check-icon.svg";

const FitsTab = () => {
  const { user } = useUser();
  const [selectedFit, setSelectedFit] = useState<{
    id: string;
    name: string;
    thumbnail_url: string;
  } | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState<string>("");

  const handleFitClick = (fit: {
    id: string;
    name: string;
    thumbnail_url: string;
  }) => {
    setSelectedFit(fit);
    setEditedName(fit.name);
  };

  const handleSaveEdit = () => {
    if (selectedFit && editedName.trim() !== selectedFit.name) {
      console.log(
        `Saving edited name: ${editedName} for Fit ID: ${selectedFit.id}`
      );
      setSelectedFit({ ...selectedFit, name: editedName });
      setIsEditing(false);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedName(selectedFit?.name || "");
  };

  const handleCloseModal = () => {
    setSelectedFit(null);
    setIsEditing(false);
    setEditedName("");
  };

  return (
    <View className="flex-1 bg-white px-3">
      <FlatList
        data={user?.fits}
        renderItem={({ item }) => (
          <FitsCard fit={item} onPress={handleFitClick} />
        )}
        keyExtractor={(item) => item.id}
        numColumns={3}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.list}
      />
      {selectedFit && (
        <Modal
          animationType="fade"
          transparent={true}
          visible={!!selectedFit}
          onRequestClose={handleCloseModal}
        >
          <View style={styles.modalOverlay}>
            <View className="bg-white rounded-lg p-4 items-center">
              <View className="w-[75%] flex-row justify-between items-center">
                {isEditing ? (
                  <TextInput
                    value={editedName}
                    onChangeText={setEditedName}
                    className="border-b border-light-gray text-lg flex-1 mr-2"
                    placeholder="Edit name"
                  />
                ) : (
                  <Text className="font-semibold text-lg">
                    {selectedFit.name}
                  </Text>
                )}
                <View className="flex-row">
                  {isEditing ? (
                    <View className="flex-row mt-[2px]">
                      <TouchableOpacity onPress={handleCancelEdit}>
                        <CloseIcon width={16} height={16} color={"red"} />
                      </TouchableOpacity>
                      <TouchableOpacity onPress={handleSaveEdit}>
                        <CheckIcon width={16} height={16} color={"green"} />
                      </TouchableOpacity>
                    </View>
                  ) : (
                    <TouchableOpacity onPress={() => setIsEditing(true)}>
                      <EditIcon width={16} height={16} color={"#000000"} />
                    </TouchableOpacity>
                  )}
                  <TouchableOpacity className="ml-1">
                    <DeleteIcon width={16} height={16} color={"red"} />
                  </TouchableOpacity>
                </View>
              </View>
              <Image
                source={{ uri: selectedFit.thumbnail_url }}
                className="w-72 h-72"
                resizeMode="contain"
              />
              <View className="flex-row gap-4">
                <TouchableOpacity
                  className="bg-tertiary py-2 px-4 rounded-md"
                  onPress={handleCloseModal}
                >
                  <Text className="text-white text-base">Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    justifyContent: "flex-start",
    marginBottom: 10,
    gap: 2,
  },
  list: {
    paddingHorizontal: 5,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default FitsTab;
