import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useClases } from "./ClasesContext";

const ListadoAsistencia = () => {
  const navigation = useNavigation();
  const { clases } = useClases();

  const handleClase = (item) => {
    // Pasa el nombre de la clase como parámetro a la pantalla 'Alumnos'
    navigation.push('Alumnos', { claseNombre: item.NombreClase });
  };

  const HeaderSpacer = () => {
    return <View style={{ marginBottom: 15 }} />;
  };

  const colors = ["#83C809", "#099AC8", "#F73A5D", "#F7D53A", "#D796F3", "#96F3E9", "#F6A554", "#7D64FA", "#FFA6F4", "#F8FA64"];

  return (
    <View style={styles.contenido}>
      <FlatList
        data={clases}
        keyExtractor={(item, index) => index.toString()}
        ListHeaderComponent={<HeaderSpacer />}

        renderItem={({ item, index }) => (
          <TouchableOpacity onPress={() => handleClase(item)} style={[styles.estilo_clase, { backgroundColor: colors[index % colors.length] }]}>
            <Text style={styles.textoClase}>{item.NombreClase}</Text>
            <Text style={styles.textoClase}>Seccion: {item.Seccion}</Text>
            <Text style={styles.textoClase}>Aula: {item.Aula}</Text>
            <Text style={styles.textoClase}>NRC: {item.NRC}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  contenido: {
    flex: 1,
    //backgroundColor: '#D4BDFA',
    position: 'relative',
  },
  estilo_clase: {
    borderRadius: 20,
    width: '90%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 15,
    marginBottom: 10,
  },
  textoClase: {
    color: "black",
    fontSize: 25,
    fontWeight: 'bold',
  },
  iconoClase: {
    position: 'absolute',
    top: 0,
    right: 15,
    width: 40,
    height: 40,
    zIndex: 1,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
  },
});

export default ListadoAsistencia;
