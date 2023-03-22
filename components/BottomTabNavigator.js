import React, { Component } from "react";
import {NavigationContainer} from "@react-navigation/native";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import { createStackNavigator} from '@react-navigation/stack';
import ViewLocation from "../screens/ViewLocation";
import LocationScreen from "../screens/locationscreen";
import SearchScreen from "../screens/Search";

const Tab = createBottomTabNavigator();

const Stack = createStackNavigator();
function ViewLoc() {
  return(
      <Stack.Navigator>
          <Stack.Screen
              name="SearchScreen"
              component={SearchScreen}
          />
          <Stack.Screen
              name="View"
              component={ViewLocation}
          />
      </Stack.Navigator>
  )
}

export default class BottomTabNavigator extends Component {
  render() {
    return (
      //add the code for add navigationcontainer
      <NavigationContainer>
        <Tab.Navigator screenOptions={{
          position:'absolute',
          bottom:25,
          left:20,
          right:20,
          elevation:0,
          tabBarActiveTintColor: '#e91e63',
          headerShown: false
          
        }}>
          <Tab.Screen name="Location" component={LocationScreen}/>
          <Tab.Screen name="Search" component={ViewLoc}/>
        </Tab.Navigator>
      </NavigationContainer>

      
    );
  }
}
