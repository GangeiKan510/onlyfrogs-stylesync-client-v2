import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  Modal,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import { useUser } from "@/components/config/user-context";
import FitsCard from "@/components/cards/FitsCard";

const FitsTab = () => {
  const { user } = useUser();
  const [selectedFit, setSelectedFit] = useState<{
    id: string;
    name: string;
    thumbnail_url: string;
  } | null>(null);

  const handleFitClick = (fit: {
    id: string;
    name: string;
    thumbnail_url: string;
  }) => {
    setSelectedFit(fit);
  };

  const handleCloseModal = () => {
    setSelectedFit(null);
  };

  return (
    <View className="flex-1 bg-white p-3">
      <FlatList
        data={user?.fits}
        renderItem={({ item }) => (
          <FitsCard fit={item} onPress={handleFitClick} />
        )}
        keyExtractor={(item) => item.id}
        numColumns={3}
      />
      {selectedFit && (
        <Modal
          animationType="fade"
          transparent={true}
          visible={!!selectedFit}
          onRequestClose={handleCloseModal}
        >
          <View style={styles.modalOverlay}>
            <View className="bg-white rounded-lg p-5 items-center">
              <Image
                source={{ uri: selectedFit.thumbnail_url }}
                className="w-72 h-72"
                resizeMode="contain"
              />
              <Text className="text-lg font-bold my-3">{selectedFit.name}</Text>
              <TouchableOpacity
                className="bg-tertiary py-2 px-4 rounded-md"
                onPress={handleCloseModal}
              >
                <Text className="text-white text-base">Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default FitsTab;
