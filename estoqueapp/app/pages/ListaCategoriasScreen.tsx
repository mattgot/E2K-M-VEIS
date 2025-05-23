import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { useCategoriesDatabase } from "@db/useCategoriesDatabase";

export default function ListaCategoriasScreen() {
  const { listCategories } = useCategoriesDatabase();
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    async function fetch() {
      const dados = await listCategories();
      setCategorias(dados);
    }

    fetch();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Categorias Cadastradas</Text>
      <FlatList
        data={categorias}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.name}>{item.name}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  card: {
    backgroundColor: "#f5f5f5",
    padding: 12,
    borderRadius: 6,
    marginBottom: 10,
  },
  name: { fontSize: 16, fontWeight: "bold" },
});
