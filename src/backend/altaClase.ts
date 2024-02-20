//los backs que avance este es del alta a la clase
import { Alert } from 'react-native';
import {supabase} from "../../Lib/supabase";

const handleAltaClase = async (nuevaClase) => {
      try {
        const { data, error } = await supabase
          .from('clases') // Reemplaza 'Clases' con el nombre real de tu tabla en Supabase
          .upsert([
            nuevaClase
          ]);
    
        if (error) {
          Alert.alert("Alerta","No existe una clase con ese NRC, u ocurrio un error");
          
        } else {
          
        }
      } catch (error) {
        
      }
    };

    const handleAltaRelacion = async (codigo, nrc) => {
      try {
        const { data, error } = await supabase
          .from('clases_usuario')
          .upsert([
            { codigo_fk: codigo, nrc_fk: nrc }
          ]);

        if (error) {

          Alert.alert("Alerta","No existe una clase con ese NRC, u ocurrio un error");
          
        } else {
          
        }
      } catch (error) {
        
      }
    };

    export {
    	handleAltaClase,
      handleAltaRelacion,
    };