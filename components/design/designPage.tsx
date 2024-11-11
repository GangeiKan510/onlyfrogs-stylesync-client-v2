import { View, Text, StyleSheet } from "react-native";
import { useMemo, useRef } from "react";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Header from "@/components/common/Header";

const DesignPage = () => {
  const snapPoints = useMemo(() => ["40%", "80%"], []);
  const bottomSheet = useRef(null);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Header />
      {/* <Text className="text-[14px] font-bold font-logo text-gray-800 text-center mt-4">
        Create your own outfit
      </Text> */}
        <View className="w-full border-t-[1px] border-[#D9D9D9] h-72 mt-6"></View>
      <BottomSheet
        ref={bottomSheet}
        index={0}
        snapPoints={snapPoints}
        backgroundStyle={{ backgroundColor: "#EFEFEF" }}
        handleIndicatorStyle={{
          backgroundColor: "#7AB2B2",
          width: 40,
          height: 5,
        }}
      >
        <BottomSheetView style={styles.contentContainer}>
          <View className="flex flex-row px-10 w-full justify-between mb-1">
            <Text className="text-base text-center">Closet (3)</Text>
            <Text className="text-base text-center">Pieces (10)</Text>
          </View>
          <View style={styles.dividerLine} />
        </BottomSheetView>
      </BottomSheet>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  dividerLine: {
    width: "100%",
    height: 2,
    backgroundColor: "white",
    marginBottom: 10,
  },
});

export default DesignPage;
