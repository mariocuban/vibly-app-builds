import { View, Text, StyleSheet, FlatList } from "react-native";
import { useState } from "react";

export default function TodosScreen() {
  const [todos] = useState([{id: 1, text: "Learn React Native"}, {id: 2, text: "Build an app"}, {id: 3, text: "Ship it!"}]);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Todos</Text>
      <FlatList data={todos} keyExtractor={item => item.id.toString()} renderItem={({item}) => <View style={styles.todo}><Text style={styles.todoText}>{item.text}</Text></View>} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0f0f1a", padding: 20 },
  title: { fontSize: 28, fontWeight: "bold", color: "#fff", marginBottom: 20, marginTop: 40 },
  todo: { backgroundColor: "#1a1a2e", padding: 16, borderRadius: 12, marginBottom: 10 },
  todoText: { color: "#fff", fontSize: 16 }
});