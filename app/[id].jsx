import { View, Text, SafeAreaView, StyleSheet, ActivityIndicator, ScrollView, Image } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'
import { useQuery } from '@tanstack/react-query'
import { fetchPost, stripHtmlAndDecode } from '../api/services'
import {Stack} from 'expo-router'
import Animated, { FadeIn, FadeOut, Easing} from 'react-native-reanimated';


const postId = () => {

  const { id } = useLocalSearchParams()
  const query = useQuery({
    queryKey: ['post'],
    queryFn: ()=>fetchPost(id)
  })

    if(query.isLoading){
      return (
        <SafeAreaView>
          <ActivityIndicator size="large" color="#E1057A" />
        </SafeAreaView>
      )
    }

  return (
      <SafeAreaView>                       
        <Stack.Screen options={{headerTitle: query?.isFetching ? "Περιμένετε..." : query?.data.title.rendered}} />
        <Animated.View entering={FadeIn.duration(800).easing(Easing.ease)} exiting={FadeOut}>
          <ScrollView style={styles.post}>
            <Image style={{flex:1, width:'100%', height: 200, backgroundColor: '#c3c3c3'}} contentFit="cover" transition={1000} source={{uri:query?.data.yoast_head_json.og_image[0].url}}/>
             <Text style={styles.postTitle}>{stripHtmlAndDecode(query?.data.title.rendered)}</Text>
             <Text>{stripHtmlAndDecode(query?.data.content.rendered)}</Text>
           </ScrollView>
          </Animated.View> 
      </SafeAreaView>
    )
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: '#fff',
    },
    post: {
      marginBottom: 16,
      padding: 8,
      borderColor: '#ddd'
    },
    postTitle: {
      fontWeight: '900'
    }
  })

export default postId