import React, { useState, useEffect } from 'react';
import { Platform, Text, View, StyleSheet,SafeAreaView,Image,TouchableOpacity, TextInput, KeyboardAvoidingView } from 'react-native';
import * as FileSystem from 'expo-file-system';
//import RNFS from 'react-native-fs';
//import { Dirs, FileSystem } from 'react-native-file-access';
//var RNFS = require('react-native-fs');

import * as Location from 'expo-location';
  
  

export default LocationScreen = () =>{
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [locationStatus,setLocationStatus] = useState('');
  const [
    currentLongitude,
    setCurrentLongitude
  ] = useState('...');
  const [
    currentLatitude,
    setCurrentLatitude
  ] = useState('...');
  const [
    locationName,
    setLocationName
  ] = useState('...');
  const [
    Notes,
    setNotes
  ] = useState('...');
  const [fileContent,setFileContent] = useState([]);
  const filePath = FileSystem.documentDirectory + "coordinates.js";

  const makeFile = async (filePath) => {
    console.log(filePath);
    var newContent  = [{latitude: currentLatitude ,longitude:  currentLongitude, Name: locationName , notes: Notes}]
      try {
        // await FileSystem.getInfoAsync(filePath).then(async (response) => {
        //   const { exists } = response;
        //   console.log(exists)
        //   if (exists) {
            const response1 = await FileSystem.readAsStringAsync(filePath)        
            console.log("makefile Response1")
            console.log(JSON.parse(response1))
            var response = JSON.parse(response1)
            if(response1)
            {
              try{
                var result = [];
                for(var i in response){
                  result.push(response[i]);
                }
                const response2 = result.push({latitude: currentLatitude ,longitude:  currentLongitude, Name: locationName , notes: Notes})
                console.log(result)
                await FileSystem.writeAsStringAsync(filePath, JSON.stringify(result), { encoding: FileSystem.EncodingType.UTF8 });
                console.log("written")
              }
              catch (error) {
                console.log(error);
              }
            }
            else {
              try{
                await FileSystem.writeAsStringAsync(filePath, JSON.stringify(newContent), { encoding: FileSystem.EncodingType.UTF8 });
              }
              catch (error) {
                console.log(error);
              }
            }
         // }
          // else{
          //   try{
          //     await FileSystem.writeAsStringAsync(filePath, JSON.stringify(newContent), { encoding: FileSystem.EncodingType.UTF8 });
          //   }
          //   catch (error) {
          //     console.log(error);
          //   }
          // }
      //  });
        console.log('written to file');
      } catch (error) {
        console.log("hi " + error);
        var error1 = String(error)
        console.log("error is " + error1)
        if(error1.includes("No such file or directory")){
            try{
              await FileSystem.writeAsStringAsync(filePath, JSON.stringify(newContent), { encoding: FileSystem.EncodingType.UTF8 });
              console.log("inside write")
            }
            catch (error) {
              console.log(error);
            }
        }
      }
    };

   readFile = async(filePath)=>{
    try {
      const response = await FileSystem.readAsStringAsync( filePath)
      console.log("inside read " + response)
    } catch(error){      
      console.log(error)      
  }
  }

  const getOneTimeLocation = async () => {        
    let { status } = await Location.requestForegroundPermissionsAsync();
    console.log(status)
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      return;
    }
    let location = await Location.getCurrentPositionAsync({
    accuracy: Location.Accuracy.Highest,
    maximumAge: 10000,
    timeout: 5000});
    console.log(location)
    setLocation(location);
    let text = 'Waiting..';
    setFileContent(text);
    if (errorMsg) {
      text = errorMsg;
      setFileContent(text);
    } else if (location) {
        console.log(text)
        JSON.stringify(location.coords.longitude);
        console.log(currentLongitude)

        JSON.stringify(location.coords.latitude);
        console.log(currentLatitude)

        setCurrentLongitude(currentLongitude);
            
        setCurrentLatitude(currentLatitude);      
    }

  const currentLongitude = 
          JSON.stringify(location.coords.longitude);
          console.log(currentLongitude)

  const currentLatitude = 
          JSON.stringify(location.coords.latitude);
          console.log(currentLatitude)

        setCurrentLongitude(currentLongitude);
        
        setCurrentLatitude(currentLatitude);
  }
  return (
    <SafeAreaView style={{flex: 1}}>
     
        <View style={styles.container}>
          <View style={styles.container}>
            <Image
              source={require("../assets/location.png")}
              style={{width: 100, height: 100}}
            />
            <Text style={styles.boldText}>
              {locationStatus}
            </Text>
            <Text
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 16,
              }}>
              Longitude: {currentLongitude}
            </Text>
            <Text
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 16,
              }}>
              Latitude: {currentLatitude}
            </Text>
            <View style={{marginTop: 20, display:'flex',flexDirection:"row", justifyContent: 'space-between'}}>
              <TouchableOpacity style={[styles.button,{marginRight:25}]} onPress={getOneTimeLocation}>
                <Text>Refresh</Text>
              </TouchableOpacity>  
            </View>
            <View style={{marginTop: 20, display:'flex',flexDirection:"row", justifyContent: 'space-between'}}>
              <TextInput  placeholder={"Please Enter Location Name"} style={styles.textinput} onChangeText={text => setLocationName(text.toUpperCase())}/>
            </View>
            <View style={{marginTop: 20, display:'flex',flexDirection:"row", justifyContent: 'space-between'}}>
              <TextInput  placeholder={"write something about the place"} style={styles.textinput} onChangeText={text => setNotes(text)}/>
            </View>
            <View style={{marginTop: 20, display:'flex',flexDirection:"row", justifyContent: 'space-between'}}>
              <TouchableOpacity style={styles.button} onPress={()=>{makeFile(filePath, fileContent)}}>
                <Text>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={()=>{readFile(filePath)}}>
                <Text>Read</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>      
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  boldText: {
    fontSize: 25,
    color: 'red',
    marginVertical: 16,
    textAlign: 'center'
  },
  button:{
    backgroundColor:"orange",
    borderRadius:10,
    padding:10,
    width:100,
    height:50,
    marginRight:25
  },
  textinput:{
    width: "auto",
    height: 50,
    padding: 10,
    borderColor: "#5653D4",
    borderRadius: 10,
    borderWidth: 3,
    fontSize: 18,
    backgroundColor: "#00000",
  }
});

