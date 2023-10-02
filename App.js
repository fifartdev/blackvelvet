import { StatusBar } from "expo-status-bar";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import React, { useEffect, useState } from "react";
import PostItem from "./PostItem";

export default function App() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(true);

  const fetchPosts = async () => {
    const res = await fetch(
      `https://politicalbank.gr/wp-json/wp/v2/posts?_embed&categories=9&per_page=40`
    );
    const data = await res.json();
    setRefreshing(false);
    setPosts(data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchPosts();
    console.log("RESPONSE IS: ");
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text
        style={{
          alignSelf: "center",
          color: "purple",
          fontSize: 30,
          fontWeight: 700,
        }}
      >
        Black Velvet
      </Text>
      {isLoading || refreshing ? (
        <ActivityIndicator size="large" color={"purple"} />
      ) : (
        <FlatList
          data={posts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <PostItem post={item} />}
          refreshControl={
            <RefreshControl
              tintColor={"#a492c2"}
              refreshing={refreshing}
              onRefresh={fetchPosts}
            />
          }
        />
      )}
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
});
