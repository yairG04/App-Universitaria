import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, Text } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const tintColor = Colors[colorScheme ?? 'light'].tint;
  const activeRed = 'red';

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute',
          },
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Inicio',
          tabBarIcon: ({ color, focused }) => (
            <IconSymbol size={28} name="house.fill" color={color} />
          ),
          tabBarActiveTintColor: tintColor,
          tabBarLabel: ({ focused, color }) => (
            <Text style={{ color: focused ? tintColor : color, fontSize: 12 }}>
              Inicio
            </Text>
          ),
        }}
      />
      <Tabs.Screen
        name="calendario"
        options={{
          title: 'Calendario',
          tabBarIcon: ({ color, focused }) => (
            <IconSymbol size={28} name="calendar" color={focused ? activeRed : color} />
          ),
          tabBarLabel: ({ focused }) => (
            <Text style={{ color: focused ? activeRed : tintColor, fontSize: 12 }}>
              Calendario
            </Text>
          ),
        }}
      />
      <Tabs.Screen
        name="contacto"
        options={{
          title: 'Contacto',
          tabBarIcon: ({ color, focused }) => (
            <IconSymbol size={28} name="phone.fill" color={focused ? activeRed : color} />
          ),
          tabBarLabel: ({ focused }) => (
            <Text style={{ color: focused ? activeRed : tintColor, fontSize: 12 }}>
              Contacto
            </Text>
          ),
        }}
      />
    </Tabs>
  );
}

//ajuste de Navegacion tabs
