import React from "react";
import {View, Text, StyleSheet} from 'react-native'

const AcercaDeNosotros = ()=> {
  return(
    <View style={styles.container}>
      <Text>{'\n'}</Text>
      <Text style={styles.container_text}>iLabTDI es un equipo de desarrollo de software estudiantil que destaca por su pasión y creatividad. Compuesto por jóvenes talentosos y apasionados por la tecnología, iLabTDI trabaja incansablemente para crear soluciones innovadoras. Su enfoque en la colaboración y el aprendizaje continuo fomenta un ambiente donde las ideas florecen y los proyectos cobran vida. 
      Este equipo no solo construye aplicaciones, sino también un futuro prometedor para sus miembros, brindándoles la experiencia necesaria para triunfar en la industria tecnológica.
      </Text>
    </View>
  )
};

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#D4BDFA',
  },
  container_text:{
    flex: 1,
    backgroundColor: '#D4BDFA',
    fontSize: 25,
    color: 'black',
    textAlign: 'center',
    //alignItems:'center',
    marginLeft: 10,
    marginRight: 10,
  }
});

export default AcercaDeNosotros;