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
import { deleteFit, renameFit } from "@/network/web/fits";
import Spinner from "@/components/common/Spinner";
import Toast from "react-native-toast-message";

const FitsTab = () => {
  const { user, refetchMe } = useUser();
  const [selectedFit, setSelectedFit] = useState<{
    id: string;
    name: string;
    thumbnail_url: string;
  } | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState<string>("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isRenaming, setIsRenaming] = useState(false);

  const handleFitClick = (fit: {
    id: string;
    name: string;
    thumbnail_url: string;
  }) => {
    setSelectedFit(fit);
    setEditedName(fit.name);
  };

  const handleSaveEdit = async () => {
    if (!selectedFit || editedName.trim() === selectedFit.name) return;

    setIsRenaming(true);

    try {
      await renameFit(selectedFit.id, editedName.trim());
      Toast.show({
        type: "success",
        text1: "Rename Successful",
        text2: `${selectedFit.name} renamed to "${editedName}".`,
        position: "top",
      });
      refetchMe();
      setSelectedFit({ ...selectedFit, name: editedName });
      setIsEditing(false);
      handleCloseModal();
    } catch (error) {
      console.error("Rename failed:", error);
      Toast.show({
        type: "error",
        text1: "Rename Failed",
        text2: "An error occurred while renaming the fit.",
        position: "top",
      });
    } finally {
      setIsRenaming(false);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedName(selectedFit?.name || "");
  };

  const handleDeleteFit = async () => {
    if (!selectedFit) return;

    setIsDeleting(true);

    try {
      await deleteFit(selectedFit.id);
      Toast.show({
        type: "success",
        text1: "Fit Deleted",
        text2: `${selectedFit.name} has been successfully deleted.`,
        position: "top",
      });
      refetchMe();
      handleCloseModal();
    } catch (error) {
      console.error("Failed to delete fit:", error);
      Toast.show({
        type: "error",
        text1: "Delete Failed",
        text2: "An error occurred while deleting the fit.",
        position: "top",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const handleCloseModal = () => {
    setSelectedFit(null);
    setIsEditing(false);
    setEditedName("");
    setIsDeleting(false);
    setIsRenaming(false);
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
                  <View className=" justify-center items-center flex-1 ml-12">
                    <TextInput
                      value={editedName}
                      onChangeText={setEditedName}
                      className="border-b text-center border-light-gray text-base"
                      placeholder="Edit name"
                      maxLength={20}
                    />
                  </View>
                ) : (
                  <View className="justify-center items-center flex-1 ml-6">
                    <Text className="font-semibold text-lg">
                      {selectedFit.name}
                    </Text>
                  </View>
                )}
                <View className="flex-row">
                  {isEditing ? (
                    <View className="flex-row mt-[1px]">
                      <TouchableOpacity
                        onPress={handleSaveEdit}
                        disabled={isRenaming}
                        className=""
                      >
                        {isRenaming ? (
                          <Spinner type="secondary" />
                        ) : (
                          <CheckIcon width={18} height={18} color={"#7AB2B2"} />
                        )}
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={handleCancelEdit}
                        disabled={isRenaming}
                        className="ml-2"
                      >
                        <CloseIcon width={18} height={18} color={"red"} />
                      </TouchableOpacity>
                    </View>
                  ) : (
                    <TouchableOpacity
                      className="relative right-2"
                      onPress={() => setIsEditing(true)}
                    >
                      <EditIcon width={16} height={16} color={"#7AB2B2"} />
                    </TouchableOpacity>
                  )}
                  {!isEditing &&
                    (isDeleting ? (
                      <Spinner type="secondary" />
                    ) : (
                      <TouchableOpacity
                        className="ml-1"
                        onPress={handleDeleteFit}
                        disabled={isDeleting}
                      >
                        <DeleteIcon width={16} height={16} color={"red"} />
                      </TouchableOpacity>
                    ))}
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
                  disabled={isDeleting}
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
