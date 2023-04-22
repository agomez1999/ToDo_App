import {
  Alert,
  FlatList,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";

// Components
import TaskItem from "./TaskItem";

// Database
import {
  fetchTasks,
  updateTaskFinishedStatus,
  handleDelete,
  fetchTaskIfFinished,
} from "../utils/db";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState(1);

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

  const handleFilter = async (status) => {
    const data = await fetchTaskIfFinished(status);
    setTasks(data);
    console.log(data);
  };

  return (
    <>
      <ScrollView style={{ position: "absolute", top: 20 }} horizontal>
        <TouchableOpacity
          style={selectedFilter === 1 ? styles.filterSelected : styles.filter}
          onPress={async () => {
            await loadTasks();
            setSelectedFilter(1);
          }}
        >
          <Text style={styles.textFilter}>Todos</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={selectedFilter === 2 ? styles.filterSelected : styles.filter}
          onPress={async () => {
            await handleFilter(1);
            setSelectedFilter(2);
          }}
        >
          <Text style={styles.textFilter}>Terminados</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={selectedFilter === 3 ? styles.filterSelected : styles.filter}
          onPress={async () => {
            await handleFilter(0);
            setSelectedFilter(3);
          }}
        >
          <Text style={styles.textFilter}>Pendientes</Text>
        </TouchableOpacity>
      </ScrollView>
      <FlatList
        style={{ width: "100%", marginTop: 40 }}
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
    </>
  );
};

const styles = StyleSheet.create({
  filter: {
    marginHorizontal: 5,
    paddingVertical: 3,
    paddingHorizontal: 7,
    backgroundColor: "#C48507",
    borderRadius: 5,
  },
  filterSelected: {
    marginHorizontal: 5,
    paddingVertical: 3,
    paddingHorizontal: 7,
    backgroundColor: "#985E03", // Estilo para filtro seleccionado, más oscuro
    borderRadius: 5,
  },
  textFilter: {
    color: "#fff",
  },
});

export default TaskList;
