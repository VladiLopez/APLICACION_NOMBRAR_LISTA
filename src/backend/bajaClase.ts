import {supabase} from "../../Lib/supabase";



const handleBajaClase = async (bajaNRC) => {
      try {
        const { data, error } = await supabase
      	.from('clases')
      	.delete()
      	.eq('NRC', bajaNRC);
    
        if (error) {
          console.error('Error al eliminar', error);
        } else {
          console.log('Clase eliminada correctamente', data);
        }
      } catch (error) {
        console.error('Error general al interactuar con Supabase:', error);
      }
    };

    export {
      handleBajaClase
    };