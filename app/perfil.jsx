import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Button, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function PerfilScreen() {
    const [perfil, setPerfil] = useState(null);
    const [cargando, setCargando] = useState(true);
    const router = useRouter();
    const isFocused = useIsFocused(); // 👈 importante

    const cargarPerfil = async () => {
        setCargando(true);
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
        } finally {
            setCargando(false);
        }
    };

    useEffect(() => {
        if (isFocused) {
            cargarPerfil(); // 🔄 recargar cuando vuelve a la pantalla
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
            </ScrollView>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#0f172a', // Fondo oscuro elegante
    },
    scrollContent: {
        paddingBottom: 40,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0f172a',
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 25,
        color: '#ffffff',
        textAlign: 'center',
        textShadowColor: '#00000066',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 4,
    },
    card: {
        backgroundColor: '#1e293b',
        borderRadius: 16,
        padding: 20,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOpacity: 0.15,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 4 },
        elevation: 6,
    },
    label: {
        fontSize: 13,
        color: '#94a3b8',
        marginBottom: 6,
        fontWeight: '600',
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    value: {
        fontSize: 20,
        color: '#f8fafc',
        fontWeight: '500',
    },
    boton: {
        marginTop: 25,
        alignSelf: 'center',
        width: '85%',
        backgroundColor: '#3b82f6',
        borderRadius: 12,
        overflow: 'hidden',
        elevation: 4,
    },
});

