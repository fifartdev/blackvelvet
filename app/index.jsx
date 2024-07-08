import { View, Text, ActivityIndicator, FlatList, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { fetchPosts, stripHtmlAndDecode } from '../api/services'
import { useQuery } from '@tanstack/react-query'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useRouter } from 'expo-router'
import Separator from '../components/Separator'

const Home = () => {

  const router = useRouter()

  const query = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts
  })

    if(query.isFetching){
      return (
        <SafeAreaView>
          <ActivityIndicator size="large" color="#E1057A" />
        </SafeAreaView>
      )
    }
    const navigateToThePost = (id)=>{
      router.push(`/${id}`)
    }
    
    return (
    <View>
      <FlatList 
       data={query.data}
       keyExtractor={(item) => item.id}
       renderItem={({ item }) => (
        <TouchableOpacity onPress={()=>navigateToThePost(item.id)}>
         <View style={styles.post}>
           <Text style={styles.postTitle}>{stripHtmlAndDecode(item.title.rendered)}</Text>
           <Text>{stripHtmlAndDecode(item.excerpt.rendered)}</Text>
         </View>
        </TouchableOpacity>
       )}
       ItemSeparatorComponent={<Separator/>}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  post: {
    marginBottom: 12,
    marginTop: 10,
    padding: 8,
    borderColor: '#ddd'
  },
  postTitle: {
    fontWeight: '900'
  }
})

export default Home