import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

// Icons
import { MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";

const CategoryItem = ({ category, handleDelete }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("CategoryFormScreen", { id: category.id })
      }
      style={[styles.card, { backgroundColor: category?.color }]}
    >
      <Text>{category?.name}</Text>
      <View style={{ flexDirection: "row" }}>

        <TouchableOpacity
          style={{
            backgroundColor: "#ee5253",
            padding: 7,
            borderRadius: 5,
            marginLeft: 3,
          }}
          onPress={() => handleDelete(category.id)}
        >
          <MaterialCommunityIcons
            name="trash-can-outline"
            size={17}
            color="white"
            style={{ textAlign: "center" }}
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 8,
    borderRadius: 5,
    padding: 10,
    borderWidth: 1,
    borderColor: "#C48507",
  },
});

export default CategoryItem;
