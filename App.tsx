import React from 'react';
import { LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Routes from './src/routes/index';

// ignore development ref warning from safe-area-context
LogBox.ignoreLogs(['Function components cannot be given refs']);

function App(): React.JSX.Element {
    return (
        <NavigationContainer>
            <Routes />
        </NavigationContainer>
    );
}

export default App;
