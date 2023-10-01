import { Text, TouchableOpacity, View } from "react-native";
import React, { useEffect } from "react";

// Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Screens
import HomeScreen from "./screens/HomeScreen";
import TaskFormScreen from "./screens/TaskFormScreen";
import TaskScreen from "./screens/TaskScreen";
import CalendarScreen from "./screens/CalendarScreen";

// Database
import { createTable } from "./utils/db";

// Icons
import { MaterialIcons, AntDesign } from "@expo/vector-icons";

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
              <View style={{ flexDirection: "row" }}>
                <TouchableOpacity
                  style={{ marginRight: 5 }}
                  onPress={() => navigation.navigate("CalendarScreen")}
                >
                  <AntDesign name="calendar" size={30} color="white" />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ marginLeft: 5 }}
                  onPress={() => navigation.navigate("TaskForm")}
                >
                  <MaterialIcons name="add-box" size={30} color="white" />
                  {/* <Text style={{ color: "#ffffff", fontSize: 15 }}>Añadir</Text> */}
                </TouchableOpacity>
              </View>
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
        <Stack.Screen
          name="CalendarScreen"
          component={CalendarScreen}
          options={{
            title: "Calendario",
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
