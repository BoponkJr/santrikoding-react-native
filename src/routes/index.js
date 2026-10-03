// import React
import React from 'react';

// import React Navigation Native Stack
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// import screens
import HomeScreen from '../screens/home/index.js';
import PostCreate from '../screens/posts/create.js';
import PostEdit from '../screens/posts/edit.js';

// init stack navigator
const Stack = createNativeStackNavigator();

const Routes = () => {
    return (
        <Stack.Navigator
            initialRouteName="HomeScreen"
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#3b82f6',
                },
                headerTintColor: '#ffffff',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            }}
        >
            <Stack.Screen
                name="HomeScreen"
                component={HomeScreen}
                options={{
                    title: 'Daftar Posts',
                }}
            />
            <Stack.Screen
                name="PostCreate"
                component={PostCreate}
                options={{
                    title: 'Tambah Post Baru',
                }}
            />
            <Stack.Screen
                name="PostEdit"
                component={PostEdit}
                options={{
                    title: 'Edit Post',
                }}
            />
        </Stack.Navigator>
    );
};

export default Routes;
