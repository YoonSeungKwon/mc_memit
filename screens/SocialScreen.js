import React, { useState } from 'react';
import { StyleSheet, FlatList, Image, View, SafeAreaView, TouchableOpacity, Text } from 'react-native';
import Footer from './hook/Footer';

const images = [
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

const SocialScreen = ({ navigation }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handlePress = (item) => {
    setSelectedImage(item.id);
    navigation.navigate('DetailScreen', { image: item.source });
  };

  const renderItem = ({ item }) => {
    const isSelected = selectedImage === item.id;
    return (
      <TouchableOpacity onPress={() => handlePress(item)}>
        <View style={styles.imageContainer}>
          <Image source={item.source} style={[styles.image, isSelected && styles.selectedImage]} />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.header}>
        <Text style={styles.headerText}>Page Name</Text>
      </View>


      <View>
        <FlatList
          data={images}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          numColumns={2}
        />
      </View>

      <Footer/>

    </SafeAreaView>
  );
};  

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  header: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eeee22',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  imageContainer: {
    flex: 1,
    margin: 5,
    alignItems: 'center',
  },
  image: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    borderRadius: 10,
  },
  selectedImage: {
    opacity: 0.5,
  },
});

export default SocialScreen;
