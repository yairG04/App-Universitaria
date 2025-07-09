import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

export default function LoginScreen() {
  const [correo, setCorreo] = useState('');
  const [clave, setClave] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  const showMessage = (text) => {
    setMessage(text);
    setTimeout(() => setMessage(''), 3000);
  };

  const login = async () => {
    try {
      const response = await fetch('http://apliacionmovil.atwebpages.com/login.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `correo=${encodeURIComponent(correo)}&clave=${encodeURIComponent(clave)}`
      });

      const data = await response.json();

      if (data.success) {
        await AsyncStorage.setItem('nombre', data.nombre);
        await AsyncStorage.setItem('correo', correo);
        showMessage('✅ ' + data.message);
        router.replace('/home');
      } else {
        showMessage('❌ ' + data.message);
      }
    } catch (error) {
      console.error('Error de red:', error);
      showMessage('❌ Error al conectar con el servidor');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.card}>
        <Text style={styles.title}>🎓 Bienvenido</Text>
        <Text style={styles.subtitle}>Inicia sesión para continuar</Text>

        {message ? <Text style={styles.message}>{message}</Text> : null}

        <TextInput
          style={styles.input}
          placeholder="Correo institucional"
          value={correo}
          onChangeText={setCorreo}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          value={clave}
          onChangeText={setClave}
          secureTextEntry
        />

        <TouchableOpacity style={styles.button} onPress={login}>
          <Text style={styles.buttonText}>Iniciar Sesión</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eff6ff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: '#ffffff',
    width: '100%',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 6,
    color: '#1e3a8a',
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 45,
    borderColor: '#cbd5e1',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    marginBottom: 12,
    fontSize: 16,
    backgroundColor: '#f9fafb',
  },
  button: {
    backgroundColor: '#2563eb',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
    marginTop: 10,
    width: '100%',
  },
  buttonText: {
    color: '#ffffff',
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 16,
  },
  message: {
    backgroundColor: '#e0f2fe',
    color: '#1e40af',
    padding: 10,
    borderRadius: 8,
    textAlign: 'center',
    marginBottom: 12,
    fontWeight: 'bold',
    width: '100%',
  },
});
