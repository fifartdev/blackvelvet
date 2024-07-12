import { StyleSheet, Text, View, SafeAreaView, ActivityIndicator, FlatList, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect } from 'react'
import { getPostIds, initializeStorage, removeAllPostIds } from '../utilities/asyncStorage'
import { useQueries, useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Stack, useRouter } from 'expo-router'
import { fetchPost, stripHtmlAndDecode } from '../api/services'
import Separator from '../components/Separator'
import TrashIcon from '../components/TrashIcon'

export default function favorites() {
  const date = (d) => { return new Date(d).toLocaleDateString()}
  const router = useRouter()
    
  const query = useQuery({
    queryKey: ['postIds'],
    queryFn: getPostIds
  })

  const postIds = query?.data
  const integerPostIds = postIds?.map(str => parseInt(str, 10)) || [];
  
const postQueries = useQueries({
    queries:integerPostIds.map((id) => {
        return {
          queryKey: ['post', id],
          queryFn: () => fetchPost(id),
        };
      })
} 
    
  );
  const navigateToThePost = (id)=>{
    router.replace(`/${id}`)
  }

// HERE STARTS THE REMOVE FAV MUTATION
const queryClient = useQueryClient()
useEffect(()=>{
    initializeStorage()
},[])
const removeAllPostIdMutation = useMutation(
    {
      mutationFn: removeAllPostIds,
      onSuccess: () => {
        console.log('Mutation successful, invalidating queries...');
        queryClient.invalidateQueries(['postIds']);
      },
      onError: (error) => {
        console.error('Mutation failed', error);
      },
    }
  );
const handleRemoveAllPostIds= async () => {
    console.log(`Removing all post IDs`);
    try {
      await removeAllPostIdMutation.mutateAsync();
      console.log('Post IDs removed successfully');
    } catch (error) {
      console.error('Error removing post IDs', error);
    }
  }

  const alertOnRemove = () =>
    Alert.alert('Είστε σίγουροι;', 'Όλα τα αγαπημένα θα διαγραφούν!', [
      {
        text: 'Ακύρωση',
        onPress: () => console.log('Ακυρώθηκε'),
        style: 'cancel',
      },
      {text: 'OK', onPress: () => {
        handleRemoveAllPostIds()
        router.back()
    }},
    ]);
// HERE END THE REMOVE FAV MUTATION

  console.log(integerPostIds);

  if (postQueries.some((query) => query.isLoading)) {
    return (
      <SafeAreaView>
        <ActivityIndicator size="large" color="#E1057A" />
      </SafeAreaView>
    );
  }

  if (postQueries.some((query) => query.isError)) {
    return (
      <SafeAreaView>
        <Text>Σφάλμα. Δεν υπάρχουν αποτελέσματα.</Text>
      </SafeAreaView>
    );
  }

  return (
    <View>
      <Stack.Screen options={{headerTitle:'Αγαπημένα', headerRight:()=><TrashIcon onPress={()=>alertOnRemove()}/>}} />
      <FlatList 
        data={postQueries}
        keyExtractor={(item) => item.data?.id?.toString() || Math.random().toString()}
        renderItem={({ item }) => (
          item.data ? (
            <TouchableOpacity style={styles.card} onPress={() => navigateToThePost(item.data.id)}>
              <View style={styles.post}>
                <Text style={styles.postTitle}>{stripHtmlAndDecode(item.data.title.rendered)}</Text>
                <View style={styles.metaContainer}>
                <View style={styles.dateContainer}>
                  <Text style={styles.date}>Στις: {date(item.data.date)}</Text> 
                </View>
                </View>
              </View>
            </TouchableOpacity>
          ) : null
        )}
        ItemSeparatorComponent={<Separator />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
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
    
});