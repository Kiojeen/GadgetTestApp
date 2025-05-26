import {
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  Text,
  ImageSourcePropType,
} from "react-native";

interface BrandItemProps {
  brand: {
    id: number;
    name: string;
    icon: ImageSourcePropType;
  };
}

export default function BrandItem({ brand }: BrandItemProps) {
  return (
    <TouchableOpacity key={brand.id} style={styles.brandItem}>
      <View style={styles.brandIconContainer}>
        <Image source={brand.icon} style={styles.brandIcon} />
        <Text style={styles.brandName}>{brand.name}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  brandItem: {
    alignItems: "center",
    marginRight: 20,
  },
  brandIconContainer: {
    width: 100,
    height: 120,
    borderRadius: 10,
    backgroundColor: "#ecfbff",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  brandIcon: {
    width: 50,
    height: 50,
    resizeMode: "contain",
  },
  brandName: {
    fontSize: 14,
    marginTop: 8,
    fontFamily: "Poppins_500Medium",
    color: "#1a1a1a",
  },
});
