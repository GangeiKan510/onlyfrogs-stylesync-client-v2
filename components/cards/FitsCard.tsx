import React from "react";
import { Image, TouchableOpacity, StyleSheet } from "react-native";

interface FitsCardProps {
  fit: {
    id: string;
    name: string;
    thumbnail_url: string;
  };
  onPress: (fit: { id: string; name: string; thumbnail_url: string }) => void;
}

const FitsCard: React.FC<FitsCardProps> = ({ fit, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={() => onPress(fit)}>
      <Image
        source={{ uri: fit.thumbnail_url }}
        style={styles.thumbnail}
        resizeMode="cover"
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: "32%",
    aspectRatio: 1,
    marginVertical: 3,
    marginHorizontal: 3,
    backgroundColor: "#f3f3f3",
    borderRadius: 10,
    overflow: "hidden",
  },
  thumbnail: {
    width: "100%",
    height: "100%",
  },
});

export default FitsCard;
