import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

// Icons
import { MaterialCommunityIcons, Entypo } from '@expo/vector-icons';

const TaskItem = ({ task, handleDelete, toggleFinished }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.itemContainer}>
      <TouchableOpacity
        style={{ flexDirection: 'column', justifyContent: 'space-between', height: 50 }}
        onPress={() => navigation.navigate("TaskScreen", { id: task.id })}
      >
        <Text style={styles.itemTitle}>
          {" "}
          {task.title.length > 31
            ? task.title.slice(0, 31) + "..."
            : task.title}
        </Text>
        <Text style={styles.itemDescription}>
          {" "}
          {task.description.length > 31
            ? task.description.slice(0, 31) + "..."
            : task.description}
        </Text>
      </TouchableOpacity>

      <View style={{ flexDirection: "column", gap: 5 }}>
        <TouchableOpacity
          style={{ backgroundColor: "#ee5253", padding: 7, borderRadius: 5 }}
          onPress={() => handleDelete(task.id)}
        >
          <Text style={{ color: "#fff" }}>Eliminar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{  backgroundColor: task.finished ? "#10ac84" : "#C48507", padding: 7, borderRadius: 5, height: 32 }}
          onPress={() => toggleFinished(task.id, !task.finished)}
        >
          { task.finished ? 
            <MaterialCommunityIcons name="check" size={19} color="white" style={{ textAlign: "center" }} />
            :
            <MaterialCommunityIcons name="clock" size={19} color="white" style={{ textAlign: "center" }} />
          }
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: "#333333",
    padding: 15,
    marginVertical: 8,
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    
  },
  itemTitle: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: 700,
  },
  itemDescription: {
    color: "#ffffff",
  },
});

export default TaskItem;
