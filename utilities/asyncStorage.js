import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "@post_ids";

export const initializeStorage = async () => {
  try {
    const existingData = await AsyncStorage.getItem(STORAGE_KEY);
    if (existingData === null) {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify([]));
    }
  } catch (error) {
    console.error("Error initializing storage", error);
  }
};

export const addPostId = async (postId) => {
  try {
    const existingData = await AsyncStorage.getItem(STORAGE_KEY);
    const ids = existingData ? JSON.parse(existingData) : [];
    ids.push(postId);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  } catch (error) {
    console.error("Error adding post ID", error);
  }
};

export const removePostId = async (postId) => {
  try {
    const existingData = await AsyncStorage.getItem(STORAGE_KEY);
    const ids = existingData ? JSON.parse(existingData) : [];
    const newIds = ids.filter((d) => d !== postId);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newIds));
  } catch (error) {
    console.error("Error removing post ID", error);
  }
};

export const getPostIds = async () => {
  try {
    const existingData = await AsyncStorage.getItem(STORAGE_KEY);
    return existingData ? JSON.parse(existingData) : [];
  } catch (error) {
    console.error("Error retrieving post IDs", error);
    return [];
  }
};

export const removeAllPostIds = async () => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    await AsyncStorage.multiRemove(keys);
  } catch (error) {
    console.error(error);
  }
};
