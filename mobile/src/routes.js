import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Detail from './pages/detail';
import Products from './pages/products';
import Payment from './pages/payment';
import React from 'react';

const AppStack = createStackNavigator();

export default function Routes() {
    return (
        <NavigationContainer>
            <AppStack.Navigator screenOptions={{ headerShown: false }}>
                <AppStack.Screen name="Products" component={Products}/>
                <AppStack.Screen name="Detail" component={Detail}/>
                <AppStack.Screen name="Payment" component={Payment}/>
            </AppStack.Navigator>
        </NavigationContainer>
    );


}