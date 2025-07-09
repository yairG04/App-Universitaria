import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Button, StyleSheet, View } from 'react-native';

export default function BienvenidaScreen() {
  const [nombre, setNombre] = useState('');
  const router = useRouter();

  useEffect(() => {
    const obtenerDatos = async () => {
      const nombreGuardado = await AsyncStorage.getItem('nombre');
      const correoGuardado = await AsyncStorage.getItem('correo');
      if (!correoGuardado) {
        router.replace('/');
        return;
      }
      if (nombreGuardado) setNombre(nombreGuardado);
    };

    obtenerDatos();
  }, []);

  const irAPerfil = () => router.push('/perfil');
  const irANotas = () => router.push('/notas');
  const irACalendario = () => router.push('/calendario');
  const irANoticias = () => router.push('/noticias');
  const irAContacto = () => router.push('/contacto');

  const cerrarSesion = async () => {
    await AsyncStorage.removeItem('nombre');
    await AsyncStorage.removeItem('correo');
    await AsyncStorage.removeItem('usuario_id');
    router.replace('/');
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.titulo}>
        ¡Bienvenido, {nombre}! 👋
      </ThemedText>

      <ThemedText style={styles.subtexto}>
        Has iniciado sesión correctamente.
      </ThemedText>

      <View style={styles.boton}>
        <Button title="Ver mi perfil" onPress={irAPerfil} />
      </View>

      <View style={styles.boton}>
        <Button title="Ver mis notas" onPress={irANotas} />
      </View>

      <View style={styles.boton}>
        <Button title="Ver calendario académico" onPress={irACalendario} />
      </View>

      <View style={styles.boton}>
        <Button title="Noticias universitarias" onPress={irANoticias} />
      </View>

      <View style={styles.boton}>
        <Button title="Contacto y ayuda" onPress={irAContacto} />
      </View>

      <View style={styles.boton}>
        <Button title="Cerrar sesión" color="#a00" onPress={cerrarSesion} />
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    gap: 16,
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtexto: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
  },
  
  boton: {
    width: '80%',
    marginTop: 10,
  },
});
