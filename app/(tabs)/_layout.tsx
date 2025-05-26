import {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  useFonts,
} from '@expo-google-fonts/poppins';
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";
import { View } from "react-native";

const CustomTabIcon = (props: {
  name: keyof typeof Ionicons.glyphMap;
  focused: boolean;
  color: string;
  size: number;
}) => {
  const { name, focused, color, size } = props;
  return (
    <View style={{ alignItems: 'center', width: '100%' }}>
      {focused && (
        <View
          style={{
            position: 'absolute',
            top: -10,
            width: '100%',
            height: 3,
            backgroundColor: '#000',
          }}
        />
      )}
      <Ionicons
        name={name}
        size={size}
        color={focused ? '#000' : '#999'}
        style={{
          opacity: focused ? 1 : 0.5,
        }}
      />
    </View>
  );
};

export default function TabLayout() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#000",
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "white",
          borderTopWidth: 0,
          elevation: 0,
          height: 80,
          paddingBottom: 10,
          paddingTop: 10,
        },
        tabBarLabelStyle: {
          fontFamily: 'Poppins_500Medium',
          fontSize: 12,
          marginTop: 4,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ focused, color }) => (
            <CustomTabIcon
              name="home"
              focused={focused}
              color={color}
              size={28}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: "Cart",
          tabBarIcon: ({ focused, color }) => (
            <CustomTabIcon
              name="cart"
              focused={focused}
              color={color}
              size={28}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="favorite"
        options={{
          title: "Favorite",
          tabBarIcon: ({ focused, color }) => (
            <CustomTabIcon
              name="heart"
              focused={focused}
              color={color}
              size={28}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "profile",
          tabBarIcon: ({ focused, color }) => (
            <CustomTabIcon
              name="person"
              focused={focused}
              color={color}
              size={28}
            />
          ),
        }}
      />
    </Tabs>
  );
}
