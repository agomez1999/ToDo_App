import { Alert, FlatList, RefreshControl } from "react-native";
import React, { useState, useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";

// Components
import TaskItem from "./TaskItem";

// Database
import {
  fetchTasks,
  updateTaskFinishedStatus,
  handleDelete,
} from "../utils/db";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const isFocused = useIsFocused();

  const loadTasks = async () => {
    const data = await fetchTasks();
    setTasks(data);
  };

  useEffect(() => {
    if (isFocused) {
      loadTasks();
    }
  }, [isFocused]);

  const handleDeleteTask = (task) => {
    Alert.alert(
      "Confirmar borrado",
      "¿Estás seguro de que deseas borrar esta tarea?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Borrar",
          style: "destructive",
          onPress: async () => {
            // Lógica de borrado aquí
            console.log("Elemento borrado");
            await handleDelete(task);
            await loadTasks();
          },
        },
      ],
      { cancelable: false }
    );

  };

  const toggleFinished = async (id, status) => {
    await updateTaskFinishedStatus(id, status);
    await loadTasks();
  };

  const renderItem = ({ item }) => {
    return (
      <TaskItem
        task={item}
        handleDelete={handleDeleteTask}
        toggleFinished={toggleFinished}
      />
    );
  };

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await loadTasks();
    setRefreshing(false);
  });

  return (
    <FlatList
      style={{ width: "100%" }}
      data={tasks}
      keyExtractor={(item) => item.id + ""}
      renderItem={renderItem}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          colors={["#78e08f"]}
          onRefresh={onRefresh}
        />
      }
    />
  );
};

export default TaskList;
