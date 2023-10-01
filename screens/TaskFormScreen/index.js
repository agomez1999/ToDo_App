import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";

// DateTimePickerModal
import DateTimePickerModal from "react-native-modal-datetime-picker";

// Checkbox
import { CheckBox } from "react-native-elements";

// Components
import Layout from "../../components/Layout";

// Database
import { handleInsert, handleUpdate, fetchTaskById } from "../../utils/db";

const TaskFormScreen = ({ navigation, route }) => {
  const [task, setTask] = useState({
    title: "",
    description: "",
    date: "",
  });

  const [editing, setEditing] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [date, setDate] = useState("");

  const handleCheck = () => {
    setIsChecked(!isChecked);
    if (!isChecked) {
      setDate("");
    }
  };

  const handleChange = (name, value) => {
    setTask({ ...task, [name]: value });
  };

  const handleSubmit = async () => {
    console.log(task);
    if (!editing) {
      await handleInsert(task.title, task.description, task.date);
    } else {
      await handleUpdate(route.params.id, task.title, task.description, task.date);
    }
    navigation.navigate("Home");
  };

  const formateDate = (date) => {
    const año = date.getFullYear();
    const mes = String(date.getMonth() + 1).padStart(2, "0");
    const día = String(date.getDate()).padStart(2, "0");

    // Crea la cadena de texto formateada
    const fechaFormateada = `${día}-${mes}-${año}`;
    setDate(fechaFormateada);
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

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <CheckBox
          title={"Informar fecha"}
          checked={isChecked}
          onPress={handleCheck}
          containerStyle={{
            backgroundColor: "transparent",
            borderColor: "transparent",
          }}
          textStyle={{ color: "#fff", fontWeight: 400 }}
        />
        {isChecked ? (
          <Text
            style={{
              color: "#fff",
              backgroundColor: "#C48507",
              borderRadius: 5,
              padding: 3,
              marginRight: 18,
            }}
          >
            {date}
          </Text>
        ) : (
          ""
        )}
      </View>

      <DateTimePickerModal
        isVisible={isChecked}
        mode="date"
        onConfirm={(res) => {
          formateDate(res);
          handleChange(
            "date",
            res.toISOString().substring(0, 10).replace(/-/g, "")
          );
        }}
        onCancel={() => setIsChecked(!isChecked)}
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
    maxHeight: 520,
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
  calendar: {
    backgroundColor: "#808080",
    borderRadius: 5,
    opacity: 0.9,
  },
});

export default TaskFormScreen;
