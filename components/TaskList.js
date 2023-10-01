import {
  Alert,
  FlatList,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
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
  getTasksByDateAsc,
  getTasksByDateDesc,
} from "../utils/db";

// Icons
import { AntDesign, Entypo } from "@expo/vector-icons";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState(1);

  const isFocused = useIsFocused();
  const [search, setSearch] = useState("");

  const handleSearch = (text) => {
    setSearch(text);
  };

  const filteredTasks = tasks.filter(
    (task) =>
      task.title.toLowerCase().includes(search.toLowerCase()) ||
      task.description.toLowerCase().includes(search.toLowerCase())
  );

  const loadTasks = async () => {
    const data = await fetchTasks();
    setTasks(data);

    if (data.length === 0) {
      setIsEmpty(true);
    } else {
      setIsEmpty(false);
    }
  };

  const setFormatedDate = (date) => {
    if (typeof date !== "string") {
      // Verifica si date no es una cadena de texto
      console.error("La fecha no es una cadena de texto");
      return "";
    }

    if (date.length !== 8) {
      // Verifica si date no tiene una longitud de 8 caracteres
      console.error("La fecha no tiene el formato correcto (yyyymmdd)");
      return "";
    }

    const año = date.slice(0, 4);
    const mes = date.slice(4, 6);
    const día = date.slice(6, 8);

    // Crea la cadena de texto formateada
    const fechaFormateada = `${día}-${mes}-${año}`;
    return fechaFormateada;
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
        setFormatedDate={setFormatedDate}
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

    if (data.length === 0) {
      setIsEmpty(true);
    } else {
      setIsEmpty(false);
    }
  };

  const handleOrder = async (status) => {
    if (status === "asc") {
      const data = await getTasksByDateAsc();
      setTasks(data);
    } else {
      const data = await getTasksByDateDesc();
      setTasks(data);
    }
  };

  const clearSearchBar = () => {
    setSearch("");
  };

  return (
    <>
      {search != "" ? (
        <TouchableOpacity
          onPress={() => clearSearchBar()}
          style={{ position: "absolute", right: 10, top: 65, zIndex: 10 }}
        >
          <Entypo name="cross" size={24} color="white" />
        </TouchableOpacity>
      ) : (
        ""
      )}
      <TextInput
        style={styles.searchBar}
        placeholder="Buscar tarea 🔎"
        onChangeText={handleSearch}
        value={search}
        placeholderTextColor={"#fff"}
      />
      <ScrollView
        style={{ position: "absolute", top: 20 }}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
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

        <TouchableOpacity
          style={selectedFilter === 4 ? styles.filterSelected : styles.filter}
          onPress={async () => {
            await handleOrder("asc");
            setSelectedFilter(4);
          }}
        >
          <Text style={styles.textFilter}>
            Fecha <AntDesign name="arrowdown" size={12} color="white" />
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={selectedFilter === 5 ? styles.filterSelected : styles.filter}
          onPress={async () => {
            await handleOrder("desc");
            setSelectedFilter(5);
          }}
        >
          <Text style={styles.textFilter}>
            Fecha <AntDesign name="arrowup" size={12} color="white" />
          </Text>
        </TouchableOpacity>
      </ScrollView>
      {isEmpty ? (
        <Text style={{ marginTop: 100, color: "#fff", fontSize: 20 }}>
          No hay tareas
        </Text>
      ) : (
        <FlatList
          style={{ width: "100%", marginTop: 8 }}
          data={filteredTasks}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              colors={["#78e08f"]}
              onRefresh={onRefresh}
            />
          }
        />
      )}
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
    alignItems: "center",
  },
  filterSelected: {
    marginHorizontal: 5,
    paddingVertical: 3,
    paddingHorizontal: 7,
    backgroundColor: "#985E03", // Estilo para filtro seleccionado, más oscuro
    borderRadius: 5,
    alignItems: "center",
  },
  textFilter: {
    color: "#fff",
  },
  searchBar: {
    marginTop: 50,
    borderRadius: 5,
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: "#C48507",
    borderTopWidth: 1,
    borderTopColor: "#C48507",
    color: "#fff",
    paddingVertical: 3,
    paddingHorizontal: 7,
    paddingRight: 25,
  },
});

export default TaskList;
