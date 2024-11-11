import React, { useState } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";

interface ToggleButtonProps {
  onToggle: (newState: boolean) => void;
  initialState: boolean;
  positiveText?: string;
  negativeText?: string;
  showLabel?: boolean;
}

const ToggleButton: React.FC<ToggleButtonProps> = ({
  onToggle,
  initialState,
  positiveText = "Enabled",
  negativeText = "Disabled",
  showLabel = true,
}) => {
  const [isToggled, setIsToggled] = useState(initialState);

  const handleToggle = () => {
    const newState = !isToggled;
    setIsToggled(newState);
    onToggle(newState);
  };

  return (
    <View style={styles.container}>
      {/* Toggle Button */}
      <Pressable
        onPress={handleToggle}
        style={[
          styles.toggleButton,
          isToggled ? styles.toggleEnabled : styles.toggleDisabled,
        ]}
      >
        <View
          style={[
            styles.toggleIndicator,
            isToggled ? styles.indicatorEnabled : styles.indicatorDisabled,
          ]}
        />
      </Pressable>

      {/* Label */}
      {showLabel && (
        <Text style={styles.label}>
          {isToggled ? positiveText : negativeText}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  toggleButton: {
    width: 48,
    height: 28,
    borderRadius: 14,
    padding: 2,
    justifyContent: "center",
  },
  toggleEnabled: {
    backgroundColor: "#7AB2B2",
  },
  toggleDisabled: {
    backgroundColor: "#D6D9DE",
  },
  toggleIndicator: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#FFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  indicatorEnabled: {
    transform: [{ translateX: 22 }],
  },
  indicatorDisabled: {
    transform: [{ translateX: 2 }],
  },
  label: {
    fontSize: 14,
    color: "#000",
  },
});

export default ToggleButton;
