import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, ActivityIndicator, ScrollView, Image } from 'react-native';

export default function BienvenidaScreen() {
  const [nombre, setNombre] = useState('');
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const [nombreGuardado, correoGuardado] = await Promise.all([
          AsyncStorage.getItem('nombre'),
          AsyncStorage.getItem('correo'),
        ]);
        
        if (!correoGuardado) {
          router.replace('/');
          return;
        }
        
        if (nombreGuardado) setNombre(nombreGuardado);
      } catch (error) {
        console.error("Error al obtener datos:", error);
      } finally {
        setLoading(false);
      }
    };

    obtenerDatos();
  }, []);

  const irAPerfil = () => router.push('/perfil');
  const irANotas = () => router.push('/notas');
  const irANoticias = () => router.push('/noticias');

  const cerrarSesion = async () => {
    try {
      await Promise.all([
        AsyncStorage.removeItem('nombre'),
        AsyncStorage.removeItem('correo'),
        AsyncStorage.removeItem('usuario_id'),
      ]);
      router.replace('/');
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  if (loading) {
    return (
      <ThemedView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4361ee" />
        <ThemedText style={styles.loadingText}>Cargando tu información...</ThemedText>
      </ThemedView>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <ThemedView style={styles.container}>
        {/* Encabezado con avatar */}
        <ThemedView style={styles.header}>
          <ThemedView style={styles.avatarContainer}>
            <Image 
              source={{ uri: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png' }} 
              style={styles.avatar}
            />
          </ThemedView>
          <ThemedText type="title" style={styles.titulo}>
            ¡Bienvenido, {nombre}! 👋
          </ThemedText>
          <ThemedText style={styles.subtexto}>
            Has iniciado sesión correctamente
          </ThemedText>
             {/* Botón de cerrar sesión */}
        <TouchableOpacity style={styles.logoutButton} onPress={cerrarSesion}>
          <ThemedText style={styles.logoutText}>Cerrar sesión</ThemedText>
        </TouchableOpacity>
        </ThemedView>
        {/* Tarjetas de acciones */}
        <ThemedView style={styles.cardsContainer}>
          <TouchableOpacity style={styles.card} onPress={irAPerfil}>
            <ThemedView style={styles.cardIcon}>
              <ThemedText style={styles.icon}>👤</ThemedText>
            </ThemedView>
            <ThemedText style={styles.cardTitle}>Mi Perfil</ThemedText>
            <ThemedText style={styles.cardDescription}>Ver y editar tu información personal</ThemedText>
          </TouchableOpacity>

          <TouchableOpacity style={styles.card} onPress={irANotas}>
            <ThemedView style={styles.cardIcon}>
              <ThemedText style={styles.icon}>📝</ThemedText>
            </ThemedView>
            <ThemedText style={styles.cardTitle}>Mis Notas</ThemedText>
            <ThemedText style={styles.cardDescription}>Consulta tus calificaciones</ThemedText>
          </TouchableOpacity>

          <TouchableOpacity style={styles.card} onPress={irANoticias}>
            <ThemedView style={styles.cardIcon}>
              <ThemedText style={styles.icon}>📰</ThemedText>
            </ThemedView>
            <ThemedText style={styles.cardTitle}>Noticias</ThemedText>
            <ThemedText style={styles.cardDescription}>Mantente informado</ThemedText>
          </TouchableOpacity>
        </ThemedView>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    gap: 20,
  },
  loadingText: {
    fontSize: 16,
    color: '#555',
  },
  container: {
    flex: 1,
    padding: 24,
    paddingTop: 40,
    backgroundColor: '#f8f9fa',
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  avatarContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#e0e7ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 3,
    borderColor: '#4f46e5',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  titulo: {
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 8,
    color: '#1e293b',
  },
  subtexto: {
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
    maxWidth: '80%',
  },
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  card: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    borderLeftWidth: 4,
    borderLeftColor: '#4f46e5',
  },
  cardIcon: {
    backgroundColor: '#eef2ff',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  icon: {
    fontSize: 28,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 5,
  },
  cardDescription: {
    fontSize: 14,
    color: '#64748b',
  },
  logoutButton: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  logoutText: {
    color: '#ef4444',
    fontSize: 16,
    fontWeight: '600',
  },
});