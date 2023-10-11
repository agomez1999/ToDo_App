import React, { useEffect, useState } from "react";
import { FlatList, Text, RefreshControl, Alert } from "react-native";
import { useIsFocused } from "@react-navigation/native";

// Database
import { fetchCategories, deleteCategory } from "../utils/db";

// Components
import CategoryItem from "./CategoryItem";

function CategoryList() {
  const [categories, setCategories] = useState([]);
  const [isEmpty, setIsEmpty] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const isFocused = useIsFocused();

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await loadCategories();
    setRefreshing(false);
  });

  const loadCategories = async () => {
    const data = await fetchCategories();
    setCategories(data);

    if (data.length === 0) {
      setIsEmpty(true);
    } else {
      setIsEmpty(false);
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    Alert.alert(
      "Confirmar borrado",
      "¿Estás seguro de que deseas borrar esta categoria?",
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
            await deleteCategory(categoryId);
            await loadCategories();
          },
        },
      ],
      { cancelable: false }
    );
  };

  const renderItem = ({ item }) => {
    return <CategoryItem category={item} handleDelete={handleDeleteCategory} />;
  };

  useEffect(() => {
    if (isFocused) {
      loadCategories();
    }
  }, [isFocused]);

  return (
    <>
      {isEmpty ? (
        <Text style={{ marginTop: 100, color: "#fff", fontSize: 20 }}>
          No hay categorias
        </Text>
      ) : (
        <FlatList
          style={{ width: "100%", marginTop: 8 }}
          data={categories}
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
}

export default CategoryList;
