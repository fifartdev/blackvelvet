import { View, Text, ActivityIndicator, FlatList, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { fetchPosts, stripHtmlAndDecode } from '../api/services'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useRouter, Stack } from 'expo-router'
import Separator from '../components/Separator'
import HeartIcon from '../components/HeartIcon'
import RefreshIcon from '../components/RefreshIcon'

const Home = () => {

  const date = (d) => { return new Date(d).toLocaleDateString()}

  const router = useRouter()
  const queryClient = useQueryClient()
  

  const query = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts
  })

  const fetchAllPosts = useMutation({
    mutationFn: fetchPosts,
    onSuccess: () => {
      //console.log('Mutation run succesfully!');
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    },
    onError: (error) => {
      console.error(error.message)
    }
  })

    if(query.isFetching){
      return (
        <SafeAreaView>
          <ActivityIndicator size="large" color="#E1057A" />
        </SafeAreaView>
      )
    }
    if(query.isError){
      return (
        <SafeAreaView>
                  <Text>Σφάλμα. Δεν υπάρχουν αποτελέσματα.Ίσως βρίσκεστε εκτός σύνδεσης</Text>
        </SafeAreaView>
      )
    }
    const navigateToThePost = (id)=>{
      router.push(`/${id}`)
    }
    
    return (
    <View>
      <Stack.Screen options={{ headerLeft:()=><RefreshIcon onPress={()=>fetchAllPosts.mutateAsync()}/>, headerRight:() =>  <HeartIcon onPress={()=> router.push('/favorites')}/> }} />
      <FlatList 
       data={query.data}
       keyExtractor={(item) => item.id}
       renderItem={({ item }) => (
        <TouchableOpacity onPress={()=>navigateToThePost(item.id)}>
         <View style={styles.post}>
           <Text style={styles.postTitle}>{stripHtmlAndDecode(item.title.rendered)}</Text>
           <View style={styles.metaContainer}><View style={styles.dateContainer}><Text style={styles.date}>Στις: {date(item.date)}</Text></View><View style={styles.authorContainer}><Text style={styles.author}> Από: {item.yoast_head_json.author} </Text></View></View>
           <Text style={styles.postContent}>{stripHtmlAndDecode(item.excerpt.rendered)}</Text>
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
    fontWeight: '900',
    fontSize: 22
  },
  postContent: {
    fontSize: 18
  },
  date: {
    fontSize: 15,
    fontWeight: 'bold',
    paddingVertical: 6,
    color: '#fff',
    paddingVertical: 5,
  },
  dateContainer: {
    backgroundColor: '#E1057A',
    borderRadius: 15,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5,
    maxWidth: '34%'
  },
  author: {
    fontSize: 15,
    fontWeight: 'bold',
    paddingVertical: 6,
    color: '#fff',
    paddingVertical: 5,    
  },
  authorContainer:{
    backgroundColor: '#000',
    borderRadius: 15,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    maxWidth: '50%'
  },
  metaContainer:{
    flex: 1,
    flexDirection: 'row',
    marginVertical: 4,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderBottomColor: '#ccc',
    borderTopColor: '#ccc',
    padding: 6

  }
})

export default Home