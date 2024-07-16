import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { Stack, useRouter } from "expo-router";
import HomeIcon from "../components/HomeIcon";
// import { LogLevel, OneSignal } from 'react-native-onesignal';
// import Constants from "expo-constants";

// OneSignal.Debug.setLogLevel(LogLevel.Verbose);
// OneSignal.initialize(Constants.expoConfig.extra.oneSignalAppId);

// // Also need enable notifications to complete OneSignal setup
// OneSignal.Notifications.requestPermission(true);


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
              headerTitleAlign:'center'
            }}>
                <Stack.Screen name="index" options={{title:'Black Velvet'}}/>
                <Stack.Screen name="[id]" pathname="/[id]" options={{headerTitle:()=><HomeIcon onPress={()=>router.replace('/')}/>}}/>
                <Stack.Screen name="favorites" pathname="/favorites" options={{headerTitle:'Αγαπημένα'}} />    
            </Stack>
        </QueryClientProvider>
    )
}