import BrandItem from "@/components/ui/BrandItem";
import FeaturedCard, { FeaturedCardProps } from "@/components/ui/FeaturedCard";
import Gadget from "@/components/ui/Gadget";
import {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
  useFonts,
} from "@expo-google-fonts/poppins";
import { Ionicons } from "@expo/vector-icons";
import React, { useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View
} from "react-native";
import { Searchbar, Text } from "react-native-paper";

const brands = [
  { id: 1, name: "Beats", icon: require("../../assets/images/beats-logo.png") },
  { id: 2, name: "JBL", icon: require("../../assets/images/jbl-logo.png") },
  { id: 3, name: "Sony", icon: require("../../assets/images/sony-logo.png") },
  { id: 4, name: "AKG", icon: require("../../assets/images/akg-logo.png") },
  { id: 5, name: "Anker", icon: require("../../assets/images/anker-logo.png") },
];

const featuredProducts: FeaturedCardProps[] = [
  {
    id: 1,
    name: "SONY - WH-1000XM4",
    description: "Noise Cancelling Wireless\nHeadphones",
    image: require("../../assets/images/SONY - WH-1000XM4.png"),
    price: 219.97,
    rating: 4.5,
    reviews: 420,
    features: [
      "Balanced Sound Signature",
      "Ideal for the Workplace",
      "Noise Cancelling",
    ],
  },
  {
    id: 2,
    name: "SONY - WH-ULT900N",
    description: "Sony ULT WEAR Wireless\nNoise Canceling Headphones",
    image: require("../../assets/images/SONY - WH-ULT900N.png"),
    price: 199.99,
    rating: 4.7,
    reviews: 350,
    features: [
      "Ultra-Comfortable Fit",
      "Active Noise Cancellation",
      "Bluetooth Connectivity",
    ],
  },
  {
    id: 3,
    name: "SONY - WF-1000XM5",
    description: "Truly Wireless Noise Cancelling\nEarbuds",
    image: require("../../assets/images/SONY - WF-1000XM5.png"),
    price: 149.99,
    rating: 4.6,
    reviews: 280,
    features: [
      "Ultra-Comfortable Fit",
      "Active Noise Cancellation",
      "Bluetooth Connectivity",
    ],
  },
];

const gadgets = [
  {
    id: 1,
    image: require("../../assets/images/SONY - WH-1000XM4.png"),
    discount: "15% OFF",
  },
  {
    id: 2,
    image: require("../../assets/images/SONY - WH-ULT900N.png"),
  },
  {
    id: 3,
    image: require("../../assets/images/SONY - WF-1000XM5.png"),
    label: "20% OFF",
  },
];

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList<FeaturedCardProps>>(null);
  const screenWidth = Dimensions.get('window').width;

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  const scrollToIndex = (index: number) => {
    flatListRef.current?.scrollToIndex({
      index,
      animated: true,
    });
  };

  const handleScroll = (event: any) => {
    const contentOffset = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffset / (screenWidth - 20));
    if (index !== currentIndex) {
      setCurrentIndex(index);
    }
  };

  if (!fontsLoaded) {
    return null;
  }

  const renderPaginationDots = () => {
    return (
      <View style={styles.paginationDots}>
        {featuredProducts.map((_, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => scrollToIndex(index)}
            style={styles.dotButton}
          >
            <View
              style={[
                styles.dot,
                index === currentIndex ? styles.activeDot : styles.inactiveDot,
              ]}
            />
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const renderFeaturedCard = ({ item }: { item: FeaturedCardProps }) => (
    <View style={{ width: screenWidth - 20 }}>
      <FeaturedCard {...item} />
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="grid-outline" size={24} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="bag-outline" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      <View style={styles.header}>
        <Text style={styles.title}>Let's find{"\n"}Your Gadget!</Text>
      </View>

      <View style={styles.searchContainer}>
        <Searchbar
          placeholder="Search"
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchBar}
          icon={() => <Ionicons name="search" size={24} color="#1a1a1a" />}
        />
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="options-outline" size={22} color="#000" />
        </TouchableOpacity>
      </View>

      <View>
        <FlatList
          ref={flatListRef}
          data={featuredProducts}
          renderItem={renderFeaturedCard}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          snapToInterval={screenWidth - 20}
          decelerationRate={0}
          snapToAlignment="center"
          contentContainerStyle={{ paddingHorizontal: 0 }}
          scrollEventThrottle={16}
        />
        {renderPaginationDots()}
      </View>

      <View style={styles.brandsSection}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Choose Brand</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllButton}>See All</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.brandsList}
        >
          {brands.map((brand) => (
            <BrandItem key={brand.id} brand={brand} />
          ))}
        </ScrollView>
      </View>

      <View style={styles.categoriesSection}>
        <View style={styles.categoryTabs}>
          <Text style={[styles.categoryTab, styles.activeTab]}>Popular</Text>
          <Text style={styles.categoryTab}>Discount</Text>
          <Text style={styles.categoryTab}>Exclusive</Text>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.gadgetsList}
          contentContainerStyle={styles.gadgetsListContent}
        >
          {gadgets.map((gadget) => (
            <Gadget
              key={gadget.id}
              image={gadget.image}
              label={gadget.discount}
            />
          ))}
        </ScrollView>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingHorizontal: 10,
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 10,
  },
  iconButton: {
    width: 40,
    height: 40,
    backgroundColor: "#f8f9fa",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    padding: 20,
    paddingTop: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: "600",
    color: "#1a1a1a",
    fontFamily: "Poppins_600SemiBold",
  },
  searchContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  searchWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  searchBar: {
    flex: 1,
    borderRadius: 20,
    backgroundColor: "#ffffff",
    borderColor: "#000",
    borderWidth: 1,
    fontFamily: "Poppins_400Regular",
  },

  brandsSection: {
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: "Poppins_600SemiBold",
  },
  seeAllButton: {
    color: "#666666",
    fontFamily: "Poppins_400Regular",
  },
  brandsList: {
    paddingLeft: 20,
  },
 
  categoriesSection: {
    marginBottom: 20,
  },
  categoryTabs: {
    flexDirection: "row",
  },
  categoryTab: {
    marginLeft: 20,
    color: "#666666",
    fontSize: 20,
    fontFamily: "Poppins_600SemiBold",
  },
  activeTab: {
    color: "#1a1a1a",
    fontFamily: "Poppins_600SemiBold",
  },
  paginationDots: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dotButton: {
    padding: 8,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 15,
 
  },
  activeDot: {
    backgroundColor: '#242423',
    width: 11,
    height: 11,
    borderRadius: 15,
  },
  inactiveDot: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#242423',
  },
  gadgetsList: {
    marginTop: 20,
  },
  gadgetsListContent: {
    paddingHorizontal: 12,
  },
});
