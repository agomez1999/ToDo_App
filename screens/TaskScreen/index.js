import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";

// Components
import Layout from "../../components/Layout";

// Database
import { fetchTaskById } from "../../utils/db";

const TaskScreen = ({ navigation, route }) => {
  const [task, setTask] = useState({
    title: "",
    description: "",
  });

  useEffect(() => {
    if (route.params && route.params.id) {
      (async () => {
        const task = await fetchTaskById(route.params.id);
        setTask({ title: task.title, description: task.description });
      })();
    }
  }, []);

  return (
    <Layout>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
          <Text style={styles.taskTitle}>{task.title}</Text>
          <Text style={styles.taskDescription}>{task.description}</Text>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("TaskForm", { id: route.params.id })
            }
            style={styles.editButton}
          >
            <Text
              style={{
                color: "#fff",
                textAlign: "center",
                textTransform: "uppercase",
              }}
            >
              Editar
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexDirection: "column",
    width: "100%",
  },
  scrollContainer: {
    flexGrow: 1,
    width: "100%",
  },
  taskTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 10,
    width: "100%",
  },
  taskDescription: {
    color: "#fff",
    marginBottom: 50,
    textAlign: "justify",
  },
  editButton: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: "#C48507",
    padding: 5,
    borderRadius: 5,
    bottom: 0,
    position: "absolute",
    width: "100%",
  },
});

export default TaskScreen;
