import {
  StyleSheet,
  Text,
  View,
  Linking,
  TouchableOpacity,
  Image,
} from "react-native";
import React from "react";
import * as WebBrowser from "expo-web-browser";

export default function PostItem({ post }) {
  let publishedDate = new Date(post.date).toLocaleDateString();

  return (
    <View>
      <TouchableOpacity
        style={styles.card}
        onPress={async () => await WebBrowser.openBrowserAsync(post.link)}
      >
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: post._embedded["wp:featuredmedia"][0].source_url,
            }}
            style={{
              flex: 1,
              width: 120,
              height: 120,
              backgroundColor: "#0553",
              borderTopLeftRadius: 15,
              borderBottomLeftRadius: 15,
            }}
          />
        </View>
        <View style={styles.titleContainer}>
          <Text
            style={{
              color: "#fff",
              fontSize: 18,
              padding: 5,
              marginHorizontal: 10,
              fontWeight: 700,
            }}
          >
            {post.title.rendered}
          </Text>
          <Text
            style={{
              color: "#fff",
              fontSize: 14,
              padding: 5,
              marginHorizontal: 10,
            }}
          >
            Δημοσιεύτηκε: {publishedDate}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "purple",
    borderRadius: 20,
    padding: 5,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: "#a492c2",
    shadowOffset: 3,
    shadowRadius: 3,
    shadowOpacity: 1,
    elevation: 6,
  },
  imageContainer: {
    flex: 1,
  },
  titleContainer: {
    flex: 2,
  },
});
