import { useRouter } from 'expo-router';
import React from 'react';
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

const noticias = [
  {
    titulo: 'Semana de la Ciencia CRUV 2025',
    fecha: '15 - 19 de abril de 2025',
    descripcion:
      'Estudiantes de distintas carreras participaron en la exposición de proyectos científicos e innovaciones tecnológicas.',
    imagen:
      'https://www.senacyt.gob.pa/wp-content/uploads/2019/09/JHC-1984.jpg',
  },
  {
    titulo: 'Ceremonia de Bienvenida para Primer Ingreso',
    fecha: '24 de marzo de 2025',
    descripcion:
      'El CRUV dio la bienvenida a los nuevos estudiantes con una jornada llena de actividades y charlas .',
    imagen:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRcyp5lYwnsrL5wBWmPs9oUq9g6DSjWioJhg&s',
  },
  {
    titulo: 'Taller de Emprendimiento Juvenil',
    fecha: '5 de julio de 2025',
    descripcion:
      'Egresados exitosos compartieron sus experiencias con los estudiantes en un taller dinámico sobre liderazgo y negocios.',
    imagen:
      'https://www.oteima.ac.pa//wp-content/uploads/2024/06/programa-liderazgo-y-emprendimiento-juvenil-1.jpg',
  },
];

export default function NoticiasScreen() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.tituloPrincipal}>Noticias Universitarias</Text>

      {noticias.map((noticia, index) => (
        <View key={index} style={styles.card}>
          <View style={styles.imagenContainer}>
            <Image
              source={{ uri: noticia.imagen }}
              style={styles.imagen}
              resizeMode="contain"
            />
          </View>
          <Text style={styles.titulo}>{noticia.titulo}</Text>
          <Text style={styles.fecha}>{noticia.fecha}</Text>
          <Text style={styles.descripcion}>{noticia.descripcion}</Text>
        </View>
      ))}

      <TouchableOpacity style={styles.boton} onPress={() => router.replace('/home')}>
        <Text style={styles.botonTexto}>Volver al menú principal</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fdfdfd',
  },
  tituloPrincipal: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0A2C56',
    textAlign: 'center',
    marginVertical: 20,
  },
  card: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  imagenContainer: {
    width: '100%',
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#f0f0f0', // para mejor visual si la imagen es más pequeña
  },
  imagen: {
    width: '100%',
    height: '100%',
  },
  titulo: {
    fontSize: 18,
    fontWeight: '600',
    color: '#004080',
    marginBottom: 4,
  },
  fecha: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  descripcion: {
    fontSize: 15,
    color: '#333',
  },
  boton: {
    marginTop: 30,
    backgroundColor: '#004080',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 30,
  },
  botonTexto: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
});
