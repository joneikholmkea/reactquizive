import Slider from "react-native-slide-to-unlock";
import { Text, StyleSheet, View } from "react-native";

export default function SlideToReveal({ onEndReached }) {
  return (
    <Slider
      childrenContainer={{ backgroundColor: "transparent" }}
      onEndReached={() => {
        onEndReached();
      }}
      containerStyle={styles.container}
      sliderElement={<View style={styles.sliderButton} />}
    >
      <Text style={styles.text}>Slide to reveal answer →</Text>
    </Slider>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 8,
    backgroundColor: "#f5f5f5",
    borderRadius: 25,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    width: "95%",
    height: 60,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sliderButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    margin: 4,
    backgroundColor: "#d3d3d3",
  },
  text: {
    fontSize: 16,
    color: "#333",
    fontWeight: "500",
  },
});