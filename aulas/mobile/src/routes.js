import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
// Ele sempre vem em volta das nossas rotas.
import { createStackNavigator } from '@react-navigation/stack';

const AppStack = createStackNavigator();

import Incidents from './pages/Incidents';
import Detail from './pages/Detail';

export default function Routes() {
    return (
        <NavigationContainer>

            <AppStack.Navigator screenOptions={{ headerShown: false }}>
                <AppStack.Screen name="Incidents" component={Incidents} />
                <AppStack.Screen name="Detail" component={Detail} />
            </AppStack.Navigator>

        </NavigationContainer>
    );
}

// <AppStack.Screen /> nós vamos precisar dele para cada rota 
// screenOptions={{ headerShown: false }} E para desabilitar o cabeçario 
