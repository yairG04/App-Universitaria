import React, { useState } from 'react';
import {
  Alert,
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function ContactoScreen() {
  const router = useRouter();
  const [nombre, setNombre] = useState<string>('');
  const [correo, setCorreo] = useState<string>('');
  const [mensaje, setMensaje] = useState<string>('');

  const mostrarAlerta = (titulo: string, mensaje: string) => {
    if (Platform.OS === 'web') {
      alert(`${titulo}\n${mensaje}`);
    } else {
      Alert.alert(titulo, mensaje);
    }
  };

  const enviarFormulario = () => {
    if (!nombre || !correo || !mensaje) {
      mostrarAlerta('Campos incompletos', 'Por favor completa todos los campos.');
      return;
    }

    mostrarAlerta('Mensaje enviado', 'Tu solicitud ha sido enviada exitosamente.');
    setNombre('');
    setCorreo('');
    setMensaje('');
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.titulo}>Centro Regional Universitario de Veraguas</Text>
      <Text style={styles.subtitulo}>Universidad de Panamá</Text>

      <View style={styles.card}>
        <View style={styles.row}>
          <View style={styles.column}>
            <Text style={styles.label}>🌐 Sitio Web</Text>
            <TouchableOpacity onPress={() => Linking.openURL('https://cruveraguas.up.ac.pa/es/')}>
              <Text style={styles.link}>https://cruv.up.ac.pa/</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.column}>
            <Text style={styles.label}>📍 Dirección</Text>
            <Text style={styles.info}>
              Ciudad de Santiago, Calle Décima, vía San Francisco.
            </Text>
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.columnSmall}>
            <Text style={styles.label}>📷 Instagram</Text>
            <TouchableOpacity onPress={() => Linking.openURL('https://www.instagram.com/upcruv/')}>
              <Text style={styles.link}>@upcruv</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.columnSmall}>
            <Text style={styles.label}>📧 Correo</Text>
            <TouchableOpacity onPress={() => Linking.openURL('mailto:cruv@up.ac.pa')}>
              <Text style={styles.link}>cruv@up.ac.pa</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.columnSmall}>
            <Text style={styles.label}>📞 Teléfono</Text>
            <TouchableOpacity onPress={() => Linking.openURL('tel:(507)935-1766')}>
              <Text style={styles.link}>(507) 935-1766</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <Text style={styles.formTitulo}>¿Necesitas ayuda? Escríbenos:</Text>

      <View style={styles.formulario}>
        <TextInput
          placeholder="Tu nombre"
          value={nombre}
          onChangeText={setNombre}
          style={styles.input}
        />
        <TextInput
          placeholder="Tu correo"
          value={correo}
          onChangeText={setCorreo}
          keyboardType="email-address"
          style={styles.input}
        />
        <TextInput
          placeholder="Escribe tu mensaje..."
          value={mensaje}
          onChangeText={setMensaje}
          multiline
          numberOfLines={4}
          style={[styles.input, styles.textArea]}
        />
        <TouchableOpacity style={styles.enviarBtn} onPress={enviarFormulario}>
          <FontAwesome name="send" size={16} color="#fff" />
          <Text style={styles.enviarTexto}> Enviar solicitud</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.volverBtn} onPress={() => router.replace('/home')}>
        <FontAwesome name="home" size={16} color="#fff" />
        <Text style={styles.volverTexto}> Volver al menú principal</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fdfdfd',
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#0A2C56',
    marginTop: 20,
  },
  subtitulo: {
    fontSize: 16,
    textAlign: 'center',
    color: '#333',
    marginBottom: 24,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 30,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 20,
    marginBottom: 20,
    flexWrap: 'wrap',
  },
  column: {
    flex: 1,
    minWidth: '45%',
  },
  columnSmall: {
    flex: 1,
    minWidth: '30%',
  },
  label: {
    fontWeight: 'bold',
    fontSize: 15,
    marginBottom: 4,
    color: '#004080',
  },
  info: {
    fontSize: 15,
    color: '#333',
  },
  link: {
    fontSize: 15,
    color: '#0056cc',
    textDecorationLine: 'underline',
  },
  formTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#0A2C56',
  },
  formulario: {
    marginBottom: 40,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    fontSize: 15,
    backgroundColor: '#fff',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  enviarBtn: {
    flexDirection: 'row',
    backgroundColor: '#004080',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  enviarTexto: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
  },
  volverBtn: {
    flexDirection: 'row',
    backgroundColor: '#0A2C56',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
  },
  volverTexto: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
  },
});
