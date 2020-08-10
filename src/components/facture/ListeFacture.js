import React from "react";
import { View, Text, StyleSheet } from "react-native";

function ListFactzure() {
  return (
    <View style={styles.container}>
      <Text>Afficher la liste des factures ici..</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ListFactzure;
