import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { Stack } from "expo-router";

const queryClient = new QueryClient()

export default function rootLayout(){
    return (
        <QueryClientProvider client={queryClient}>
            <Stack>
                <Stack.Screen name="index" options={{title:'Black Velvet'}}/>
                <Stack.Screen name="[id]" pathname="/posts/[id]" />
            </Stack>
        </QueryClientProvider>
    )
}