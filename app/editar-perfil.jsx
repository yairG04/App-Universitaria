import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { useRouter } from 'expo-router';

export default function EditarPerfilScreen() {
    const [perfil, setPerfil] = useState({
        nombre_completo: '',
        telefono: '',
        carrera: '',
        semestre: '',
    });

    const router = useRouter();

    const cargarPerfil = async () => {
        const correo = await AsyncStorage.getItem('correo');
        if (!correo) return;

        try {
            const res = await fetch(`http://apliacionmovil.atwebpages.com/perfil.php?correo=${correo}`);
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
            Alert.alert('Error', 'No se encontró el correo del usuario');
            return;
        }

        const formData = new URLSearchParams();
        formData.append('correo', correo);
        formData.append('nombre_completo', perfil.nombre_completo);
        formData.append('telefono', perfil.telefono);
        formData.append('carrera', perfil.carrera);
        formData.append('semestre', perfil.semestre);

        try {
            const response = await fetch('http://apliacionmovil.atwebpages.com/actualizar_perfil.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: formData.toString(),
            });

            const responseText = await response.text();
            console.log('Respuesta cruda:', responseText);

            try {
                const data = JSON.parse(responseText);
                if (data.success) {
                    setTimeout(() => {
                        Alert.alert('✅ Éxito', data.message || 'Perfil actualizado correctamente', [
                            { text: 'OK', onPress: () => router.replace('/perfil') },
                        ]);
                    }, 200); // 🔁 Pequeño retraso para asegurar visibilidad
                } else {
                    Alert.alert('❌ Error', data.message || 'No se pudo actualizar el perfil');
                }
            } catch (error) {
                console.error('Error al parsear JSON:', error);
                Alert.alert('❌ Error', 'Respuesta inesperada del servidor');
            }
        } catch (error) {
            console.error('Error al actualizar perfil:', error);
            Alert.alert('❌ Error', 'Error de conexión con el servidor');
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
                onChangeText={(text) => setPerfil({ ...perfil, telefono: text })}
                keyboardType="phone-pad"
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
                value={String(perfil.semestre)}
                onChangeText={(text) => setPerfil({ ...perfil, semestre: text })}
                keyboardType="numeric"
            />

            <Button title="Guardar Cambios" onPress={guardarCambios} />
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
});
