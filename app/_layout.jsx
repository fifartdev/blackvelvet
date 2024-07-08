import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { Stack } from "expo-router";

const queryClient = new QueryClient()

export default function rootLayout(){
    return (
        <QueryClientProvider client={queryClient}>
            <Stack screenOptions={{
                headerStyle:{
                backgroundColor: '#000',
            },
            headerTintColor: '#E1057A',
            headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}>
                <Stack.Screen name="index" options={{title:'Black Velvet'}}/>
                <Stack.Screen name="[id]" pathname="/posts/[id]" />
            </Stack>
        </QueryClientProvider>
    )
}