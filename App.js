import React, { Component } from "react";
import BottomTabNavigator from "./components/BottomTabNavigator";
import * as SplashScreen from 'expo-splash-screen';
import { createAppContainer, createSwitchNavigator} from 'react-navigation'; 
import ViewLocation from "./screens/ViewLocation";
import SearchScreen from "./screens/Search";
import { View } from "react-native";
import Tabnavigation from "./screens/tabnavigation";

export default class App extends Component {
  render() {

    SplashScreen.preventAutoHideAsync();
    setTimeout(SplashScreen.hideAsync,2000)
    //add the return satement for BottomTabNavigator
    return (
     
        
        <AppContainer/>
    
    )
  }
}

var AppNavigator = createSwitchNavigator({
  Tabnavigation:Tabnavigation,
  ViewLocation:ViewLocation,
  SearchScreen:SearchScreen
  

})

const AppContainer = createAppContainer(AppNavigator)