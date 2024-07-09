import axios from "axios";
import { decode } from "html-entities";

const fetchPosts = async () => {
  const postUrl = `${process.env.EXPO_PUBLIC_API_URL}/wp-json/wp/v2/posts`;

  try {
    const res = await axios.get(postUrl, {
      params: {
        categories: process.env.EXPO_PUBLIC_CATEGORY_ID,
        per_page: process.env.EXPO_PUBLIC_ITEMS_PP,
      },
    });
    return res.data;
  } catch (error) {
    console.log("Error on fetchings", error.message);
  }
};

const fetchPost = async (id) => {
  const postUrl = `${process.env.EXPO_PUBLIC_API_URL}/wp-json/wp/v2/posts/${id}`;

  try {
    const res = await axios.get(postUrl, {
      params: {
        categories: 3016,
        per_page: 100,
      },
    });
    return res.data;
  } catch (error) {
    console.log("Error on fetchings", error.message);
  }
};

const stripHtmlAndDecode = (str) => {
  return decode(str.replace(/(<([^>]+)>)/gi, ""));
};

export { fetchPosts, stripHtmlAndDecode, fetchPost };
