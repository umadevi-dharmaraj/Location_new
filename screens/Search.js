import React, { Component, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, ScrollView, SafeAreaView } from "react-native";
import { ListItem } from 'react-native-elements'
import * as FileSystem from 'expo-file-system';
import {
  Menu,
  MenuProvider,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  renderers
 } from "react-native-popup-menu";
 const {SlideInMenu, ContextMenu} = renderers;
import { Entypo } from "@expo/vector-icons";
const filePath = FileSystem.documentDirectory + "coordinates.js";
import { createAppContainer, createSwitchNavigator} from 'react-navigation'; 
import ViewLocation from "./ViewLocation";


export default class SearchScreen extends Component {
  constructor(props)
  { 
    super(props); 
    this.state = { 
    isLoading: true,
    data: [],
    displaydata:[],
    searchText:""
  }

  this.navigationWillFocusListener = props.navigation.addListener('willFocus', async ()=> {
      // fetch()
      this.getData()
    });
  }

getResult(res){
  this.setState({
        isLoading: false,
        data: res,
        displaydata:res
  })
}
  
getData = async()=>{
  console.log("inside get data")
  const response =  await FileSystem.readAsStringAsync( filePath)
      console.log(response)
      res = JSON.parse(response)
      //res = response
      console.log(res)
        setTimeout(() => {
      this.setState({  isLoading: false,
        data: res,
        displaydata:res});
    }, 1000);
}
  componentDidMount = async()=> {
    
   // try {
    
      console.log("inside component did mount")
    //   const response =  await FileSystem.readAsStringAsync( filePath)
    //   console.log(response)
    //   res = JSON.parse(response)
    //   console.log(res)
    //     setTimeout(() => {
    //   this.setState({  isLoading: false,
    //     data: res,
    //     displaydata:res});
    // }, 1000);
    this.getData()
    
 }


 

  
  

  FlatListItemSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "#607D8B",
        }}
      />
    );
  }
  
  renderItem = ({ item, i }) => {

    return (
      <View style={{ borderWidth: 1, width:330}}>
       
         <ListItem key={i} bottomDivider subtitleNumberOfLines={0}>
          <ListItem.Content>
          <ListItem.Subtitle>
            <MenuProvider style={styles.menuContainer} >
            <Menu renderer={ContextMenu} onSelect={value => this.selectNumber(value)}>
              <MenuTrigger customStyles={{ triggerWrapper: {top: 5,},}}>
                <Entypo name="dots-three-horizontal" size={20} color="black" />
              </MenuTrigger>
              <MenuOptions>
                <MenuOption onSelect={()=>this.props.navigation.navigate('View', { screen: 'ViewLocation', params: {latitude:item.latitude, longitude:item.longitude}})} text="View" />
                {console.log(item.latitude)}
                <MenuOption onSelect={() => navigation.navigate('Update', {localName:item.location})} text="Update" />
                <MenuOption onSelect={() => navigation.navigate('Delete', {locationId:item.id})} text="Delete" />
              </MenuOptions>
          </Menu>
        </MenuProvider>
        </ListItem.Subtitle>
            <ListItem.Title style={styles.title}>
              {item.Name}
            </ListItem.Title>
            <ListItem.Subtitle style={styles.subtitle}>
              {item.notes}
            </ListItem.Subtitle>
            <View style={styles.lowerLeftContaiiner}>
              <View style={styles.transactionContainer}>
                <Text>
                  lat: {item.latitude}
                </Text>
              </View>
              <Text>long: {item.longitude}</Text>
            </View>
          
          </ListItem.Content>

        </ListItem>
        
      </View>
    );
  };


handleSearch = async text => {
  if(text){
  var enteredText = text.toUpperCase();
  text = text.toUpperCase();
  this.setState({
    displaydata:[]
  })
  for (var names in this.state.data){
    console.log(this.state.data)
    console.log("inside for " + this.state.data[names])
    if(text == this.state.data[names].Name){
      console.log(this.state.data[names])
      var searchResult =[]
      searchResult.push({latitude: this.state.data[names].latitude ,longitude:  this.state.data[names].longitude, Name: this.state.data[names].Name , notes: this.state.data[names].notes})
      this.setState({
        displaydata:searchResult
      })
    }
  }
  }
  if(!text){
    this.setState({
      displaydata:this.state.data
    })
  }
 
}


render() {       
  const {data,displaydata, searchText} = this.state
  console.log(displaydata)
  
  if (this.state.displaydata != undefined) {
    console.log("inside if   " + this.state.displaydata)          
    return (
      <View style={styles.container}>  
          
            <View style={styles.upperContainer}>
                <View style={styles.textinputContainer}>
                    <TextInput
                        style={styles.textInput}
                        onChangeText={text => this.setState({ searchText: text })}
                        placeholder={"Type here"}
                        placeholderTextColor={"#FFFFFF"}
                    />
                    <TouchableOpacity style={styles.scanbutton} onPress={() => this.handleSearch(searchText)}>
                      <Text style={styles.scanbuttonText}>Search</Text>
                    </TouchableOpacity>
                </View>
            </View>
          
               
            <View style={styles.lowerContainer}> 
                           
                <FlatList
                  data={this.state.displaydata}
                  ItemSeparatorComponent = {this.FlatListItemSeparator}
                  renderItem = {this.renderItem }
                  keyExtractor={(item, index) => index.toString()}  
                               
                />
              
            </View> 
            
        
      </View>
    )        
    }
    else{
      return(
        <View>
          <Text>Loading...</Text>
        </View>
      )}               
      }
    }
    
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#5653D4"
  },
  text: {
    color: "#ffff",
    fontSize: 30
  },
  textInput: {
    width: "57%",
    height: 50,
    padding: 10,
    borderColor: "#FFFFFF",
    borderRadius: 10,
    borderWidth: 3,
    fontSize: 18,
    backgroundColor: "#5653D4",
    
    color: "#FFFFFF"
  },
  upperContainer: {
    flex: 0.2,
    justifyContent: "center",
    alignItems: "center"
  },
  textinputContainer: {
    borderWidth: 2,
    borderRadius: 10,
    flexDirection: "row",
    backgroundColor: "#9DFD24",
    borderColor: "#FFFFFF",
    marginBottom:20,
    marginTop:20
  },
  scanbutton: {
    width: 100,
    height: 50,
    backgroundColor: "#9DFD24",
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    justifyContent: "center",
    alignItems: "center"
  },
  scanbuttonText: {
    fontSize: 24,
    color: "#0A0101",
    
  },
  lowerContainer: {
    flex: 1,
    flexGrow :1,
    height: "100%"
    
  },
  title: {
    fontSize: 20,
    color:"black"
    
  },
  subtitle: {
    fontSize: 16,
    
  },
  lowerLeftContaiiner: {
    alignSelf: "flex-end",
    marginTop: -40
  },
  transactionContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center"
  },
  FlatListItemStyle: {
    padding: 10,
    fontSize: 18,
    height: 44,
    color:"#FFFFFF"
  },
  menuContainer: {
    flex: 1,
    backgroundColor: "#ffffff",
    justifyContent: "left",
    alignItems: "left",
    flexDirection: "row",
    //width:200,
    paddingLeft:250,
    height:75,
  },
  
});
