import React from 'react';
import { Image, ImageSourcePropType, StyleSheet, Text, View } from 'react-native';

interface GadgetProps {
  image: ImageSourcePropType;
  label?: string;
}

export default function Gadget({ image, label }: GadgetProps) {
  return (
    <View style={styles.container}>
      {label && (
        <View style={styles.labelBadge}>
          <Text style={styles.labelText}>{label}</Text>
        </View>
      )}
      <View style={styles.imageContainer}>
        <Image source={image} style={styles.image} resizeMode="contain" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 160,
    height: 160,
    marginHorizontal: 8,
    position: 'relative',
  },
  imageContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: "#ecfbff",
    borderRadius: 16,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  labelBadge: {
    position: 'absolute',
    top: 12,
    right: 0,
    backgroundColor: '#fbcf6a',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    zIndex: 1,
  },
  labelText: {
    color: '#242423',
    fontSize: 12,
    fontWeight: '600',
  },
}); 