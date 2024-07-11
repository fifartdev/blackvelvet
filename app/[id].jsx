import { View, Text, SafeAreaView, StyleSheet, ActivityIndicator, ScrollView, Image, Share, Alert } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'
import { useQuery } from '@tanstack/react-query'
import { fetchPost, stripHtmlAndDecode } from '../api/services'
import {Stack} from 'expo-router'
import Animated, { FadeIn, FadeOut, Easing} from 'react-native-reanimated';
import ShareIcon from '../components/ShareIcon'


const postId = () => {

  const { id } = useLocalSearchParams()
  const query = useQuery({
    queryKey: ['post'],
    queryFn: ()=>fetchPost(id)
  })

  const shareURL = async (message) => {
    try {
      const result = await Share.share({
        message: message,
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          
        } else {
          
        }
      } else if (result.action === Share.dismissedAction) {
        
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  };

    //console.log('uri id is: ', id);

    if(query.isLoading){
      return (
        <SafeAreaView>
          <ActivityIndicator size="large" color="#E1057A" />
        </SafeAreaView>
      )
    }

  return (
      <SafeAreaView>                       
        <Stack.Screen options={{headerTitle: query?.isFetching ? "Περιμένετε..." : query?.data.title.rendered, headerRight:() => <ShareIcon onPress={()=> shareURL(query?.data.link)}/>, headerBackTitle: 'Πίσω' }} />
        <Animated.View entering={FadeIn.duration(800).easing(Easing.ease)} exiting={FadeOut}>
          <ScrollView style={styles.post}>
            <Image style={{flex:1, width:'100%', height: 200, backgroundColor: '#c3c3c3'}} contentFit="cover" transition={1000} source={{uri:query?.data.yoast_head_json.og_image[0].url}}/>
             <Text style={styles.postTitle}>{stripHtmlAndDecode(query?.data.title.rendered)}</Text>
             <Text style={styles.postContent}>{stripHtmlAndDecode(query?.data.content.rendered)}</Text>
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
      padding: 10,
      borderColor: '#ddd',
    },
    postTitle: {
      fontWeight: '900',
      marginVertical: 8,
      fontSize: 28
    },
    postContent: {
      fontSize: 20
    }
  })

export default postId