import { View, StyleSheet, StatusBar } from "react-native";
import React from "react";

const Layout = ({ children }) => {
  return (
    <View style={styles.container}>
      <StatusBar />
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#222f3e",
    padding: 10,
    flex: 1,
    alignItems: "center",
  },
});

export default Layout;
