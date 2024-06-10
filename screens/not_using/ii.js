import React from 'react';
import { View, Image, StyleSheet,SafeAreaView, TouchableOpacity, Text } from 'react-native';
import Footer from './hook/Footer';
import Header from './hook/Header';

import MasonryList from '@react-native-seoul/masonry-list';

const photos = [
  { id: '1', source: require('../assets/images/image01.jpg') },
  { id: '2', source: require('../assets/images/image02.jpg') },
  { id: '3', source: require('../assets/images/image03.jpg') },
  { id: '4', source: require('../assets/images/image04.jpg')},
  { id: '5', source: require('../assets/images/image05.jpg') },
  { id: '6', source: require('../assets/images/image06.jpg') },
  { id: '7', source: require('../assets/images/image07.jpg')},
  { id: '8', source: require('../assets/images/image08.jpg') },
  { id: '9', source: require('../assets/images/image09.jpg') },
  { id: '10', source: require('../assets/images/image10.jpg') },
  { id: '11', source: require('../assets/images/image11.jpg') },
  { id: '12', source: require('../assets/images/image12.jpg') },
  { id: '13', source: require('../assets/images/image13.jpg') },
  { id: '14', source: require('../assets/images/image14.jpg') },
  { id: '15', source: require('../assets/images/image15.jpg') },
  { id: '16', source: require('../assets/images/image16.jpg') },
];


const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Header/>

      <MasonryList
        data={photos}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        renderItem={({ item }) => (
          <View style={styles.photoItem}>
            <Image source={item.source} style={styles.image} />
          </View>
        )}
      />
      <Footer/>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 5,
    marginBottom: 5,
  },
  photoItem: {
    backgroundColor: '#ff3c00',
    flex: 1,
    margin: 3,
    borderRadius: 18,
    overflow: 'hidden',
  },
  image: {
    backgroundColor: '#ff3c00',
    width: '100%',
    height: undefined,
    aspectRatio: 1,
    resizeMode: 'cover',
    borderRadius: 10,//사진 모서리 둥글게
  },
});

export default App;