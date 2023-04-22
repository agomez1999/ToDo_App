import { View, Text, TextInput, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";

// Components
import Layout from "../../components/Layout";

import { TouchableOpacity } from "react-native";

// Database
import { handleInsert, handleUpdate, fetchTaskById } from "../../utils/db";

const TaskFormScreen = ({ navigation, route }) => {
  const [task, setTask] = useState({
    title: "",
    description: "",
  });

  const [editing, setEditing] = useState(false);

  const handleChange = (name, value) => {
    setTask({ ...task, [name]: value });
  };

  const handleSubmit = async () => {
    if (!editing) {
      await handleInsert(task.title, task.description);
    } else {
      await handleUpdate(route.params.id, task.title, task.description);
    }
    navigation.navigate("Home");
  };

  useEffect(() => {
    if (route.params && route.params.id) {
      navigation.setOptions({ headerTitle: "Actualizar tarea" });
      setEditing(true);

      (async () => {
        const task = await fetchTaskById(route.params.id);
        setTask({ title: task.title, description: task.description });
      })();
    }
  }, []);

  return (
    <Layout>
      <Text></Text>
      <TextInput
        style={styles.input}
        placeholder="Escribe un título"
        placeholderTextColor="#ffffff"
        onChangeText={(text) => handleChange("title", text)}
        value={task.title}
      />
      <TextInput
        style={styles.inputDesc}
        multiline
        placeholder="Escribe una descripción"
        placeholderTextColor="#ffffff"
        onChangeText={(text) => handleChange("description", text)}
        value={task.description}
      />

      <TouchableOpacity style={styles.buttonSave} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Guardar</Text>
      </TouchableOpacity>
    </Layout>
  );
};

const styles = StyleSheet.create({
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
    maxHeight: 550,
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
  buttonText: {
    textAlign: "center",
    color: "#ffffff",
    textTransform: "uppercase",
  },
});

export default TaskFormScreen;
