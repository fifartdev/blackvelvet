import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { Stack, useRouter } from "expo-router";
import HomeIcon from "../components/HomeIcon";

const queryClient = new QueryClient()

export default function rootLayout(){

    const router = useRouter()

    

    return (
        <QueryClientProvider client={queryClient}>
            <Stack screenOptions={{
                headerStyle:{
                backgroundColor: '#000',
            },
            headerTintColor: '#E1057A',
            headerTitleStyle: {
                fontWeight: 'bold',
                fontSize: 26
              },
            }}>
                <Stack.Screen name="index" options={{title:'Black Velvet'}}/>
                <Stack.Screen name="[id]" pathname="/[id]" options={{headerTitle:()=><HomeIcon onPress={()=>router.replace('/')}/>}}/>
                <Stack.Screen name="favorites" pathname="/favorites" options={{headerTitle:'Αγαπημένα'}} />    
            </Stack>
        </QueryClientProvider>
    )
}