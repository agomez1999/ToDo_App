import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

// Icons
import { MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";

const TaskItem = ({ task, handleDelete, toggleFinished, setFormatedDate }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.itemContainer}>
      <Text style={task.id_category ? [styles.category, {backgroundColor: task.color}] : { position: 'absolute' }}>{task.categoryName}</Text>
      <View style={styles.innerContainer}>
        <TouchableOpacity
          style={{
            flexDirection: "column",
            justifyContent: "space-between",
          }}
          onPress={() => navigation.navigate("TaskScreen", { id: task.id })}
        >
          <Text
            style={
              task.finished
                ? [styles.itemTitle, styles.finishedStyles]
                : styles.itemTitle
            }
          >
            {" "}
            {task.title.length > 31
              ? task.title.slice(0, 31) + "..."
              : task.title}
          </Text>
          <Text
            style={
              task.finished
                ? [styles.itemDescription, styles.finishedStyles]
                : styles.itemDescription
            }
          >
            {" "}
            {task.description.length > 31
              ? task.description.slice(0, 31) + "..."
              : task.description}
          </Text>
          <Text style={{ color: "#c0c0c0", marginLeft: 5, fontSize: 12 }}>
            {task.date ? setFormatedDate(task.date + "") : ""}
          </Text>
        </TouchableOpacity>

        <View style={{ flexDirection: "column", gap: 5 }}>
          <TouchableOpacity
            style={{ backgroundColor: "#ee5253", padding: 7, borderRadius: 5 }}
            onPress={() => handleDelete(task.id)}
          >
            <Text style={{ color: "#fff", textAlign: "center" }}>Eliminar</Text>
          </TouchableOpacity>

          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              style={{
                backgroundColor: "#007AFF",
                padding: 7,
                borderRadius: 5,
                height: 32,
              }}
              onPress={() => navigation.navigate("TaskForm", { id: task.id })}
            >
              <AntDesign
                name="edit"
                size={19}
                color="white"
                style={{ textAlign: "center" }}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                backgroundColor: task.finished ? "#10ac84" : "#C48507",
                padding: 7,
                borderRadius: 5,
                height: 32,
                marginLeft: 5,
              }}
              onPress={() => toggleFinished(task.id, !task.finished)}
            >
              {task.finished ? (
                <MaterialCommunityIcons
                  name="check"
                  size={19}
                  color="white"
                  style={{ textAlign: "center" }}
                />
              ) : (
                <MaterialCommunityIcons
                  name="clock"
                  size={19}
                  color="white"
                  style={{ textAlign: "center" }}
                />
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: "#333333",
    marginVertical: 8,
    borderRadius: 5,
  },
  innerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
  },
  itemTitle: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: 700,
  },
  itemDescription: {
    color: "#ffffff",
    marginVertical: 10,
  },
  finishedStyles: {
    textDecorationLine: "line-through",
    fontStyle: "italic",
  },
  category: {
    top: 0,
    width: "100%",
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    padding: 2,
  },
});

export default TaskItem;
