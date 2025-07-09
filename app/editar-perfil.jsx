import React, { useEffect, useState } from 'react';
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  Platform,
  Text,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { useRouter } from 'expo-router';
// Componente principal para editar el perfil del usuario
export default function EditarPerfilScreen() {
  const [perfil, setPerfil] = useState({
    nombre_completo: '',
    telefono: '',
    carrera: '',
    semestre: '',
  });

  const [mensajeExito, setMensajeExito] = useState('');
  const router = useRouter();

  const mostrarAlerta = (titulo, mensaje, callback) => {
    if (Platform.OS === 'web') {
      alert(`${titulo}\n${mensaje}`);
      if (callback) callback();
    } else {
      Alert.alert(titulo, mensaje, [
        {
          text: 'OK',
          onPress: () => {
            if (callback) callback();
          },
        },
      ]);
    }
  };

  const cargarPerfil = async () => {
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
    }
  };

  useEffect(() => {
    cargarPerfil();
  }, []);

  const guardarCambios = async () => {
    const correo = await AsyncStorage.getItem('correo');
    if (!correo) {
      mostrarAlerta('Error', 'No se encontró el correo del usuario');
      return;
    }

    const formData = new URLSearchParams();
    formData.append('correo', correo);
    formData.append('nombre_completo', perfil.nombre_completo);
    formData.append('telefono', perfil.telefono);
    formData.append('carrera', perfil.carrera);
    formData.append('semestre', perfil.semestre);

    try {
      const response = await fetch(
        'http://apliacionmovil.atwebpages.com/actualizar_perfil.php',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: formData.toString(),
        }
      );

      const responseText = await response.text();
      console.log('Respuesta cruda:', responseText);

      try {
        const data = JSON.parse(responseText);
        if (data.success) {
          setMensajeExito('✅ Perfil actualizado correctamente');
          setTimeout(() => {
            setMensajeExito('');
            router.replace('/perfil');
          }, 2000);
        } else {
          mostrarAlerta('❌ Error', data.message || 'No se pudo actualizar el perfil');
        }
      } catch (error) {
        console.error('Error al parsear JSON:', error);
        mostrarAlerta('❌ Error', 'Respuesta inesperada del servidor');
      }
    } catch (error) {
      console.error('Error al actualizar perfil:', error);
      mostrarAlerta('❌ Error', 'Error de conexión con el servidor');
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Editar Perfil</ThemedText>

      <TextInput
        style={styles.input}
        placeholder="Nombre completo"
        value={perfil.nombre_completo}
        onChangeText={(text) => setPerfil({ ...perfil, nombre_completo: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Teléfono"
        value={perfil.telefono}
        keyboardType="phone-pad"
        onChangeText={(text) => setPerfil({ ...perfil, telefono: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Carrera"
        value={perfil.carrera}
        onChangeText={(text) => setPerfil({ ...perfil, carrera: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Semestre"
        value={perfil.semestre}
        keyboardType="numeric"
        onChangeText={(text) => setPerfil({ ...perfil, semestre: text })}
      />

      <Button title="Guardar Cambios" onPress={guardarCambios} />

      {mensajeExito !== '' && (
        <Text style={styles.mensajeExito}>{mensajeExito}</Text>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    gap: 12,
    justifyContent: 'center',
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  mensajeExito: {
    marginTop: 15,
    color: 'green',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
