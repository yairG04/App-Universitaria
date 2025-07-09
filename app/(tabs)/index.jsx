import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Button, StyleSheet, TextInput } from 'react-native';

export default function HomeScreen() {
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
                // Guardar nombre y correo en AsyncStorage
                await AsyncStorage.setItem('nombre', data.nombre);
                await AsyncStorage.setItem('correo', correo);

                showMessage('✅ ' + data.message);
                router.replace('/home'); // Navegar a bienvenida
            } else {
                showMessage('❌ ' + data.message);
            }
        } catch (error) {
            console.error('Error de red:', error);
            showMessage('❌ Error al conectar con el servidor');
        }
    };

    return (
        <ThemedView style={styles.container}>
            {message ? <ThemedText style={styles.message}>{message}</ThemedText> : null}
            <ThemedText type="title">Inicio de Sesión</ThemedText>

            <TextInput
                style={styles.input}
                placeholder="Correo"
                value={correo}
                onChangeText={setCorreo}
                keyboardType="email-address"
                autoCapitalize="none"
            />

            <TextInput
                style={styles.input}
                placeholder="Clave"
                value={clave}
                onChangeText={setClave}
                secureTextEntry
            />

            <Button title="Iniciar Sesión" onPress={login} />
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        gap: 12,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        paddingHorizontal: 10,
        borderRadius: 4,
    },
    message: {
        backgroundColor: '#d4edda',
        color: '#155724',
        padding: 10,
        borderRadius: 4,
        textAlign: 'center',
        fontWeight: 'bold',
    },
});
