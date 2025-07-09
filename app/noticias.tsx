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
      'El CRUV dio la bienvenida a los nuevos estudiantes con una jornada llena de actividades y charlas.',
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
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      <Text style={styles.tituloPrincipal}>Noticias Universitarias</Text>

      {noticias.map((noticia, index) => (
        <View key={index} style={styles.card}>
          <View style={styles.imagenContainer}>
            <Image
              source={{ uri: noticia.imagen }}
              style={styles.imagen}
            />
          </View>
          <Text style={styles.titulo}>{noticia.titulo}</Text>
          <Text style={styles.fecha}>{noticia.fecha}</Text>
          <Text style={styles.descripcion}>{noticia.descripcion}</Text>
        </View>
      ))}

      <TouchableOpacity
        style={styles.boton}
        activeOpacity={0.8}
        onPress={() => router.replace('/home')}
      >
        <Text style={styles.botonTexto}>Volver al menú principal</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fafafa',
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  tituloPrincipal: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#003366',
    textAlign: 'center',
    marginBottom: 24,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 14,
    marginBottom: 24,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 4,
  },
  imagenContainer: {
    width: '100%',
    height: 180,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagen: {
    width: '60%',           // ajusta el ancho
    height: '100%',
    resizeMode: 'cover',
    alignSelf: 'center',
  },
  titulo: {
    fontSize: 20,
    fontWeight: '700',
    color: '#004080',
    marginHorizontal: 16,
    marginTop: 16,
  },
  fecha: {
    fontSize: 14,
    color: '#888',
    marginHorizontal: 16,
    marginTop: 6,
    fontStyle: 'italic',
  },
  descripcion: {
    fontSize: 16,
    color: '#333',
    marginHorizontal: 16,
    marginVertical: 16,
    lineHeight: 22,
  },
  boton: {
    backgroundColor: '#004080',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 30,
    alignSelf: 'center',
    shadowColor: '#004080',
    shadowOpacity: 0.6,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  botonTexto: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
});
