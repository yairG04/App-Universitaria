import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  Button,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { useRouter } from 'expo-router';
import { useIsFocused } from '@react-navigation/native';

export default function PerfilScreen() {
  const [perfil, setPerfil] = useState(null);
  const [cargando, setCargando] = useState(true);
  const router = useRouter();
  const isFocused = useIsFocused();

  const cargarPerfil = async () => {
    setCargando(true);
    const correo = await AsyncStorage.getItem('correo');
    if (!correo) return;

    try {
      const res = await fetch(
        `http://apliacionmovil.atwebpages.com/perfil.php?correo=${correo}`
      );
      const data = await res.json();
      if (data.success) {
        setPerfil(data.perfil);
      }
    } catch (error) {
      console.error('Error al cargar perfil:', error);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    if (isFocused) {
      cargarPerfil();
    }
  }, [isFocused]);

  if (cargando) {
    return (
      <ThemedView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3b82f6" />
      </ThemedView>
    );
  }

  if (!perfil) {
    return (
      <ThemedView style={styles.loadingContainer}>
        <ThemedText>No se pudo cargar el perfil.</ThemedText>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <ThemedText type="title" style={styles.title}>
          Perfil del Estudiante
        </ThemedText>

        <View style={styles.card}>
          <Text style={styles.label}>Nombre completo</Text>
          <Text style={styles.value}>{perfil.nombre_completo}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>Cédula</Text>
          <Text style={styles.value}>{perfil.cedula}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>Carrera</Text>
          <Text style={styles.value}>{perfil.carrera}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>Semestre</Text>
          <Text style={styles.value}>{perfil.semestre}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>Teléfono</Text>
          <Text style={styles.value}>{perfil.telefono}</Text>
        </View>

        <View style={styles.boton}>
          <Button title="Editar perfil" onPress={() => router.push('/editar-perfil')} />
        </View>

        <View style={styles.boton}>
          <Button title="Ir al inicio" onPress={() => router.push('/home')} color="#0A84FF" />
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
    padding: 20,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 20,
    color: '#111827',
    textAlign: 'center',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 5,
  },
  label: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 6,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  value: {
    fontSize: 18,
    color: '#111827',
    fontWeight: '500',
  },
  boton: {
    marginTop: 20,
    alignSelf: 'center',
    width: '80%',
  },
});
