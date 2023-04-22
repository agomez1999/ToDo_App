import { Text, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";

// Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Screens
import HomeScreen from "./screens/HomeScreen";
import TaskFormScreen from "./screens/TaskFormScreen";
import TaskScreen from "./screens/TaskScreen";

// Database
import { createTable } from "./utils/db";

const Stack = createNativeStackNavigator();

const App = () => {
  useEffect(() => {
    createTable();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={({ navigation }) => ({
            title: "Task App",
            headerStyle: { backgroundColor: "#C48507" },
            headerTitleStyle: { color: "#ffffff" },
            headerRight: () => (
              <TouchableOpacity onPress={() => navigation.navigate("TaskForm")}>
                <Text style={{ color: "#ffffff", fontSize: 15 }}>Añadir</Text>
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen
          name="TaskForm"
          component={TaskFormScreen}
          options={{
            title: "Crear tarea",
            headerStyle: { backgroundColor: "#C48507" },
            headerTitleStyle: { color: "#ffffff" },
            headerTintColor: "#ffffff",
          }}
        />
        <Stack.Screen
          name="TaskScreen"
          component={TaskScreen}
          options={{
            title: "Visualizar tarea",
            headerStyle: { backgroundColor: "#C48507" },
            headerTitleStyle: { color: "#ffffff" },
            headerTintColor: "#ffffff",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
