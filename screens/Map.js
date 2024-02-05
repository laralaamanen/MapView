import { useEffect, useState } from 'react';
import { Button, StyleSheet, View } from 'react-native';
import MapView from 'react-native-maps';
import * as Location from 'expo-location';

export default function Map() {

  const [location, setLocation] = useState({
    latitude: 65.0033,
    longitude: 25.4684,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
  });

  const getUserPosition = async () => {
    let {status} = await Location.requestBackgroundPermissionsAsync();

    try {
      if (status !== 'granted') {
        console.log('Geolocation failed')
        return
      }
      const position = await Location.getCurrentPositionAsync({accuracy: Location.Accuracy.High})
      setLocation({...location, "latitude": position.coords.latitude, "longitude": position.coords.longitude})
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    (async() => {
      getUserPosition()
    })()
  }, [])

  return (
    <MapView
      style={styles.map}
      region={location}
    />
  );
}

const styles = StyleSheet.create({
  map: {
    height: '100%',
    width: '100%'
  }
});