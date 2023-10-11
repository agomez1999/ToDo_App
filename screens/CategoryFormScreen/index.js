import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

// Components
import Layout from "../../components/Layout";
import { ColorPicker } from "react-native-color-picker";

import { insertCategory } from "../../utils/db";

const CategoryFormScreen = ({ navigation, route }) => {
  const [category, setCategory] = useState({
    name: "",
    color: null,
  });

  const [isColorPickerVisible, setColorPickerVisible] = useState(false);

  const handleChange = (field, value) => {
    setCategory({ ...category, [field]: value });
  };

  const handleSubmit = async () => {
    console.log(category);
    await insertCategory(category.name, category.color);

    navigation.navigate("CategoryScreen");
  };

  const handleColorPickerToggle = () => {
    setColorPickerVisible(!isColorPickerVisible);
  };

  return (
    <Layout>
      <View style={styles.containerView}>
        <View style={{ width: "100%", alignItems: "center" }}>
          <TextInput
            style={styles.input}
            placeholder="Escribe un nombre"
            placeholderTextColor="#ffffff"
            onChangeText={(text) => handleChange("name", text)}
            value={category.name}
          />

          <TouchableOpacity
            style={styles.buttonColor}
            onPress={handleColorPickerToggle}
          >
            <Text style={styles.buttonText}>{category.color ? category.color : 'Elegir color'}</Text>
          </TouchableOpacity>
        </View>

        {isColorPickerVisible && (
          <ColorPicker
            defaultColor={category.color}
            onColorSelected={(color) => {
              handleChange("color", color);
              setColorPickerVisible(false);
            }}
            style={{ height: "80%", width: "100%" }}
          />
        )}

        <TouchableOpacity style={styles.buttonSave} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Guardar</Text>
        </TouchableOpacity>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  containerView: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 4,
  },
  input: {
    width: "90%",
    fontSize: 14,
    marginBottom: 7,
    borderWidth: 1,
    borderColor: "#C48507",
    height: 35,
    color: "#ffffff",
    padding: 4,
    textAlign: "left",
    borderRadius: 5,
  },
  inputDesc: {
    width: "90%",
    fontSize: 14,
    marginBottom: 7,
    borderWidth: 1,
    borderColor: "#C48507",
    height: "auto",
    maxHeight: 460,
    color: "#ffffff",
    padding: 4,
    textAlign: "justify",
    borderRadius: 5,
  },
  buttonSave: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: "#C48507",
    width: "90%",
  },
  buttonColor: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#C48507",
    width: "90%",
  },
  buttonText: {
    textAlign: "center",
    color: "#ffffff",
    textTransform: "uppercase",
  },
});

export default CategoryFormScreen;
