import { View, Text, SafeAreaView, StyleSheet, ActivityIndicator, ScrollView, Image, Share, Alert } from 'react-native'
import React, { useEffect } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { fetchPost, stripHtmlAndDecode } from '../api/services'
import {Stack} from 'expo-router'
import Animated, { FadeIn, FadeOut, Easing} from 'react-native-reanimated';
import ShareIcon from '../components/ShareIcon'
import HomeIcon from '../components/HomeIcon'
import { initializeStorage, addPostId, getPostIds, removePostId } from '../utilities/asyncStorage'
import HeartIcon from '../components/HeartIcon'
import HeartOutlinedIcon from '../components/HeartOutlinedIcon'



const postId = () => {

  const router = useRouter()
  const { id } = useLocalSearchParams()
  const query = useQuery({
    queryKey: ['post'],
    queryFn: ()=>fetchPost(id)
  })
// HERE STARTS THE CODE FOR THE ADD TO FAVORITES
  const queryClient = useQueryClient()
  useEffect(()=>{
    initializeStorage()
  },[])

  const postIds = useQuery({
    queryKey: ['postIds'],
    queryFn: getPostIds
  })

  const addPostIdMutation = useMutation(
    {
      mutationFn:addPostId,
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(['postIds'])
      },
    }
  );

  const removePostIdMutation = useMutation(
    {
      mutationFn:removePostId,
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(['postIds'])
      },
    }
  );

  const handleAddPostId = async (id) => {
    const newPostId = id
    await addPostIdMutation.mutateAsync(newPostId);
  };

  const handleRemovePostId = async (id) => {
    const newPostId = id
    await removePostIdMutation.mutateAsync(newPostId);
  }
// HERE ENDS THE CODE FOR THE ADD TO FAVORITES
  
// HERE STARTS THE SHARE ON SOCIAL 
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
// HERE ENDS THE SHARE ON SOCIAL

   // console.log('uri id is: ', id);
   // console.log(postIds);

    if(query.isLoading){
      return (
        <SafeAreaView>
          <ActivityIndicator size="large" color="#E1057A" />
        </SafeAreaView>
      )
    }

    if(query.isError){
      return (
        <SafeAreaView>
          <Text>Σφάλμα. Δεν υπάρχουν αποτελέσματα.</Text>
        </SafeAreaView>
      );
    }

  return (
      <SafeAreaView>                       
        <Stack.Screen options={{headerRight:() =>  <ShareIcon onPress={()=> shareURL(query?.data.link)}/>, headerBackTitle: 'Πίσω' }} />
        <Animated.View entering={FadeIn.duration(800).easing(Easing.ease)} exiting={FadeOut}>
          <ScrollView style={styles.post}>
            <Image style={{flex:1, width:'100%', height: 200, backgroundColor: '#c3c3c3'}} contentFit="cover" transition={1000} source={{uri:query?.data.yoast_head_json.og_image[0].url}}/>
             { postIds.data.includes(id) ? <HeartIcon onPress={()=>handleRemovePostId(id)}/> : <HeartOutlinedIcon onPress={()=>handleAddPostId(id)} /> } 
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