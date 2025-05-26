import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Image,
  ImageSourcePropType,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Card } from "react-native-paper";

interface FeaturedCardProps {
  id: number;
  name: string;
  description: string;
  image: ImageSourcePropType;
  price: number;
  rating: number;
  reviews: number;
  features: string[];
}

export default function FeaturedCard(featuredProduct: FeaturedCardProps) {
  const [modalVisible, setModalVisible] = useState(false);

  const handleShopNow = () => {
    setModalVisible(true);
  };

  return (
    <>
      <Card style={styles.featuredCard} mode="contained">
        <Card.Content style={styles.featuredContent}>
          <View style={styles.featuredTextContent}>
            <Text style={styles.featuredTitle}>{featuredProduct.name}</Text>
            <Text style={styles.featuredDescription}>
              {featuredProduct.description}
            </Text>
            <TouchableOpacity
              style={styles.shopNowButton}
              onPress={handleShopNow}
            >
              <Text style={styles.shopNowText}>Shop Now</Text>
            </TouchableOpacity>
          </View>
          <Image source={featuredProduct.image} style={styles.featuredImage} />
        </Card.Content>
      </Card>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={styles.closeButton}
              >
                <Ionicons name="close" size={24} color="#000" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.cartButton}>
                <Ionicons name="cart-outline" size={24} color="#000" />
              </TouchableOpacity>
            </View>

            <ScrollView>
              <Text style={styles.modalProductName}>
                {featuredProduct.name}
              </Text>

              <View style={styles.modalImageContainer}>
                <Image
                  source={featuredProduct.image}
                  style={styles.modalProductImage}
                  resizeMode="contain"
                />
              </View>

              <TouchableOpacity style={styles.arCheckoutButton}>
                <Ionicons name="cube-outline" size={24} color="#000" />
                <Text style={styles.arCheckoutText}>AR Checkout</Text>
                <Ionicons name="chevron-forward" size={24} color="#000" />
              </TouchableOpacity>

              {featuredProduct.rating && (
                <View style={styles.ratingContainer}>
                  <View style={styles.stars}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Ionicons
                        key={star}
                        name={
                          star <= Math.floor(featuredProduct.rating || 0)
                            ? "star"
                            : "star-outline"
                        }
                        size={20}
                        color="#FFD700"
                      />
                    ))}
                    <Text style={styles.ratingText}>
                      ({featuredProduct.reviews})
                    </Text>
                  </View>
                </View>
              )}

              {featuredProduct.features && (
                <View style={styles.featuresContainer}>
                  {featuredProduct.features.map((feature, index) => (
                    <Text key={index} style={styles.featureText}>
                      • {feature}
                    </Text>
                  ))}
                </View>
              )}
            </ScrollView>

            <View style={styles.bottomContainer}>
              <View style={styles.priceContainer}>
                <Text style={styles.priceLabel}>Price:</Text>
                <Text style={styles.price}>${featuredProduct.price}</Text>
              </View>
              <TouchableOpacity style={styles.addToCartButton}>
                <Ionicons name="bag-add-outline" size={24} color="#242423" />
                <Text style={styles.addToCartText}>Add to cart</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  featuredCard: {
    marginHorizontal: 20,
    marginBottom: 20,
    marginTop: 20,
    borderRadius: 30,
    backgroundColor: "#fbcf6a",
    position: "relative",
    overflow: "visible",
  },
  featuredContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    overflow: "visible",
  },
  featuredTextContent: {
    flex: 1,
    marginRight: 16,
    padding: 15,
  },
  featuredTitle: {
    color: "#242423",
    fontSize: 20,
    fontFamily: "Poppins_700Bold",
  },
  featuredDescription: {
    fontSize: 15,
    color: "#4b4b49",
    marginBottom: 16,
    fontFamily: "Poppins_600SemiBold",
  },
  featuredImage: {
    width: 220,
    height: 220,
    position: "absolute",
    right: -10,
    top: -30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    zIndex: 2,
  },
  shopNowButton: {
    backgroundColor: "#242423",
    paddingHorizontal: 25,
    paddingVertical: 10,
    borderRadius: 16,
    alignSelf: "flex-start",
  },
  shopNowText: {
    color: "#ffffff",
    fontFamily: "Poppins_500Medium",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#FFF",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    height: "90%",
    paddingTop: 20,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  closeButton: {
    padding: 8,
  },
  cartButton: {
    padding: 8,
  },
  modalProductName: {
    fontSize: 24,
    fontWeight: "600",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  modalImageContainer: {
    height: 400,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F8F9FA",
    marginBottom: 20,
  },
  modalProductImage: {
    width: 300,
    height: 300,
  },
  arCheckoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#F8F9FA",
    marginHorizontal: 20,
    padding: 15,
    borderRadius: 12,
    marginBottom: 20,
  },
  arCheckoutText: {
    fontSize: 16,
    fontWeight: "500",
  },
  ratingContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  stars: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingText: {
    marginLeft: 8,
    color: "#666",
  },
  featuresContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  featureText: {
    fontSize: 16,
    color: "#666",
    fontFamily: "Poppins_600SemiBold",
    marginBottom: 8,
  },
  bottomContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: "#242424",
  },
  priceContainer: {
    flex: 1,
  },
  priceLabel: {
    fontSize: 14,
    color: "#fbcf6a",
  },
  price: {
    fontSize: 24,
    fontWeight: "600",
    color: "#fff",
  },
  addToCartButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fbcf6a",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    gap: 8,
  },
  addToCartText: {
    color: "#242423",
    fontSize: 16,
    fontWeight: "500",
  },
});

export { FeaturedCardProps };
