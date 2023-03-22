import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    ImageBackground,
    StatusBar,
    SafeAreaView,
    Image,
    Alert,
    Platform
} from 'react-native';

import MapView, { Marker } from 'react-native-maps';

const origin = {latitude: 37.3318456, longitude: -122.0296002};
const destination = {latitude: 37.771707, longitude: -122.4053769};

export default class ViewLocation extends Component {
   
    render(){
        const { params } = this.props.route.params?this.props.route.params:'No value'
        console.log(params.latitude)
        const latitude = params.latitude
        const longitude = params.longitude
        return(
            <View style={styles.container}>
                <View style={styles.mapContainer}>
                    <MapView
                        style={styles.map}
                        region={{
                            latitude: latitude,
                            longitude: longitude,
                            latitudeDelta: 100,
                            longitudeDelta: 100
                        }}

                    >
                        <Marker
                            coordinate={{ latitude: latitude, longitude: longitude }}
                        >
                            <Image source={require('../assets/location.png')} style={{ height: 50, width: 50 }} />
                        </Marker>
                    </MapView>
                </View>

            </View>
        )
    }


}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    mapContainer: {
        flex: 0.7
    },
    map: {
        width: "100%",
        height: "100%"
    },

})