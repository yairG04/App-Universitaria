import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Text,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';

export default function NotasScreen() {
  const [notas, setNotas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const cargarNotas = async () => {
      const correo = await AsyncStorage.getItem('correo');
      if (!correo) {
        setCargando(false);
        return;
      }

      try {
        const response = await fetch(
          `http://apliacionmovil.atwebpages.com/notas.php?correo=${encodeURIComponent(correo)}`
        );
        const data = await response.json();

        if (data.success) {
          setNotas(data.notas);
        }
      } catch (error) {
        console.error('Error al cargar notas:', error);
      } finally {
        setCargando(false);
      }
    };

    cargarNotas();
  }, []);

  if (cargando) {
    return (
      <ThemedView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3b82f6" />
      </ThemedView>
    );
  }

  if (notas.length === 0) {
    return (
      <ThemedView style={styles.emptyContainer}>
        <ThemedText style={styles.emptyText}>No hay notas para mostrar</ThemedText>
        <TouchableOpacity style={styles.boton} onPress={() => router.replace('/home')}>
          <Text style={styles.botonTexto}>Volver al inicio</Text>
        </TouchableOpacity>
      </ThemedView>
    );
  }

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        <ThemedText style={styles.asignatura}>{item.asignatura}</ThemedText>
        <View style={styles.details}>
          <Text style={styles.detail}>Semestre: {item.semestre}</Text>
          <Text style={[
            styles.nota, 
            parseFloat(item.nota) >= 10.5 ? styles.notaAprobada : styles.notaReprobada
          ]}>
            {item.nota}
          </Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <ThemedText type="title" style={styles.titulo}>Mis Notas</ThemedText>
      
      <FlatList
        data={notas}
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
      />
      
      <TouchableOpacity 
        style={styles.backButton} 
        onPress={() => router.replace('/home')}
      >
        <Text style={styles.backButtonText}>← Volver</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8fafc',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    padding: 20,
  },
  emptyText: {
    fontSize: 18,
    color: '#64748b',
    marginBottom: 20,
    textAlign: 'center',
  },
  titulo: {
    fontSize: 24,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 20,
    marginTop: 10,
  },
  listContent: {
    paddingBottom: 80,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    marginBottom: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  cardContent: {
    padding: 16,
  },
  asignatura: {
    fontSize: 17,
    fontWeight: '500',
    color: '#1e293b',
    marginBottom: 8,
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detail: {
    fontSize: 14,
    color: '#64748b',
  },
  nota: {
    fontSize: 16,
    fontWeight: '600',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  notaAprobada: {
    backgroundColor: '#f0fdf4',
    color: '#16a34a',
  },
  notaReprobada: {
    backgroundColor: '#fef2f2',
    color: '#dc2626',
  },
  boton: {
    backgroundColor: '#3b82f6',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  botonTexto: {
    color: '#fff',
    fontWeight: '500',
    fontSize: 16,
  },
  backButton: {
    position: 'absolute',
    bottom: 30,
    left: 20,
    right: 20,
    backgroundColor: '#ffffff',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  backButtonText: {
    color: '#3b82f6',
    fontWeight: '500',
    fontSize: 16,
  },
});