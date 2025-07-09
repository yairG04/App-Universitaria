import { useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import {
    Dimensions,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

const { width } = Dimensions.get('window');

const paginas = [
  'Verano',
  'Primer semestre',
  'Segundo semestre',
  'Feriados',
  'Días cívicos',
];

export default function CalendarioScreen() {
  const scrollRef = useRef<ScrollView>(null);
  const [paginaActual, setPaginaActual] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const intervalo = setInterval(() => {
      const siguiente = (paginaActual + 1) % paginas.length;
      scrollRef.current?.scrollTo({ x: siguiente * width, animated: true });
      setPaginaActual(siguiente);
    }, 5000);

    return () => clearInterval(intervalo);
  }, [paginaActual]);

  const onScroll = (event: any) => {
    const page = Math.round(event.nativeEvent.contentOffset.x / width);
    setPaginaActual(page);
  };

  return (
    <View style={styles.container}>
      {/* TÍTULOS */}
      <View style={styles.header}>
        <Text style={styles.universidad}>UNIVERSIDAD DE PANAMÁ</Text>
        <Text style={styles.titulo}>CALENDARIO ACADÉMICO 2024 – 2025</Text>
      </View>

      {/* CARRUSEL */}
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        scrollEventThrottle={16}
        ref={scrollRef}
        style={styles.carrusel}
      >
        {paginas.map((titulo, index) => (
          <View key={index} style={styles.slide}>
            <View style={styles.card}>
              <Text style={styles.bloqueTitulo}>{titulo.toUpperCase()}</Text>
              {contenidoPorPagina[index].map((linea, i) => (
                <Text key={i} style={styles.linea}>📅 {linea}</Text>
              ))}
            </View>
          </View>
        ))}
      </ScrollView>

      {/* INDICADORES */}
      <View style={styles.indicadores}>
        {paginas.map((_, i) => (
          <View
            key={i}
            style={[
              styles.punto,
              i === paginaActual && styles.puntoActivo,
            ]}
          />
        ))}
      </View>

      {/* BOTÓN */}
      <TouchableOpacity style={styles.boton} onPress={() => router.replace('/home')}>
        <Text style={styles.botonTexto}>Volver al menú principal</Text>
      </TouchableOpacity>
    </View>
  );
}

// 📋 CONTENIDO POR PÁGINA
const contenidoPorPagina: string[][] = [
  [
    'Organización: 18 nov al 13 dic 2024',
    'Matrícula: 6 al 11 de enero',
    'Pago matrícula: 7 ene al 22 feb',
    'Inicio de clases: 13 de enero',
    'Último día de clases: 22 de febrero',
    'Exámenes: 24 feb al 1 mar',
    'Entrega de notas: máx. 7 días hábiles',
    'Cierre de verano: 8 de marzo',
  ],
  [
    'Matrícula nuevo ingreso: 3 al 8 marzo',
    'Matrícula regulares: 10 al 22 marzo',
    'Pago matrícula: 4 mar al 5 abril',
    'Inicio de clases: 24 marzo',
    'Retiros: 24 marzo al 12 abril',
    'Fin de clases: 5 julio',
    'Exámenes: 7 al 19 julio',
    'Entrega notas: máx. 7 días',
    'Recuperación: 21 al 26 julio',
    'Cierre semestre: 2 agosto',
  ],
  [
    'Matrícula: 4 al 16 agosto',
    'Pago matrícula: 5 ago al 6 sep',
    'Inicio clases: 18 agosto',
    'Retiros: 18 ago al 6 sep',
    'Fin clases: 29 nov',
    'Exámenes: 1 al 13 diciembre',
    'Entrega notas: máx. 7 días',
    'Vacaciones admin.: 16 al 30 dic',
    'Cierre semestre: 31 diciembre',
    'Vacaciones docentes: enero 2026',
  ],
  [
    '1 enero – Año nuevo',
    '9 enero – Día de los Mártires',
    '28 marzo – Viernes Santo',
    '1 mayo – Día del trabajador',
    '3 nov – Separación de Colombia',
    '4 nov – Día de la Bandera',
    '5 nov – Gesta de Colón',
    '10 nov – Primer Grito de Independencia',
    '28 nov – Independencia de España',
    '8 dic – Día de la Madre',
    '25 dic – Navidad',
  ],
  [
    '7 octubre – Fundación de la Universidad de Panamá',
  ],
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fdfdfd',
  },
  header: {
    alignItems: 'center',
    paddingVertical: 24,
    paddingHorizontal: 16,
  },
  universidad: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#0A2C56',
    letterSpacing: 1,
  },
  titulo: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 6,
    color: '#1E3D6B',
  },
  carrusel: {
    flexGrow: 0,
  },
  slide: {
    width,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 14,
    padding: 24,
    width: '90%',
    alignItems: 'flex-start', // ✅ Alinea contenido a la izquierda
    borderWidth: 1,
    borderColor: '#ddd',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  bloqueTitulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#004080',
    textAlign: 'center',
    alignSelf: 'center',
  },
  linea: {
    fontSize: 16,
    textAlign: 'left', // ✅ Alineado a la izquierda
    marginBottom: 6,
    color: '#333',
  },
  indicadores: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 12,
  },
  punto: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#ccc',
    marginHorizontal: 4,
  },
  puntoActivo: {
    backgroundColor: '#004080',
  },
  boton: {
    marginTop: 16,
    marginBottom: 24,
    backgroundColor: '#004080',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    alignSelf: 'center',
  },
  botonTexto: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
});
