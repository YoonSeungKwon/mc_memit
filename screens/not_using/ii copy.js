import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Text } from 'react-native';
import MasonryList from '@react-native-seoul/masonry-list';

const photos = [
  { id: 1, uri: require('./assets/photo1.jpg') },
  { id: 2, uri: require('./assets/photo2.jpg') },
  { id: 3, uri: require('./assets/photo3.jpg') },
  { id: 4, uri: require('./assets/photo4.jpg') },
  { id: 5, uri: require('./assets/photo5.jpg') },
  { id: 6, uri: require('./assets/photo6.jpg') },
  { id: 7, uri: require('./assets/photo7.jpg') },
  { id: 8, uri: require('./assets/photo8.jpg') },
  { id: 9, uri: require('./assets/photo9.jpg') },
  { id: 10, uri: require('./assets/photo10.jpg') },
  { id: 11, uri: require('./assets/photo11.jpg') },
  { id: 12, uri: require('./assets/photo12.jpg') },
  { id: 13, uri: require('./assets/photo13.jpg') },
  { id: 14, uri: require('./assets/photo14.jpg') },
  { id: 15, uri: require('./assets/photo15.jpg') },
  { id: 16, uri: require('./assets/photo16.jpg') },
  // Add more photos as needed
];

const App = () => {
  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Text style={styles.buttonText4}>                              My Page</Text>
        <TouchableOpacity style={styles.button4}>
          {/* <Text style={styles.buttonText1}>=</Text> */}
        </TouchableOpacity>
      </View>

      <View style={styles.buttonContainer1}>
        <TouchableOpacity style={styles.button3}>
          <Text style={styles.buttonText3}>인물 사진</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button3}>
          <Text style={styles.buttonText3}>응원 글귀</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button3}>
          <Text style={styles.buttonText3}>동물 사진</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button3}>
          <Text style={styles.buttonText3}>웃긴사진</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button3}>
          <Text style={styles.buttonText3}>그 외</Text>
        </TouchableOpacity>
      </View>
      <MasonryList
        data={photos}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        renderItem={({ item }) => (
          <View style={styles.photoItem}>
            <Image source={item.uri} style={styles.image} />
          </View>
        )}
      />
      <View style={styles.buttonContainer2}>
        <TouchableOpacity style={styles.button1}>
          <Text style={styles.buttonText1}>Personal</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button2}>
          <Text style={styles.buttonText2}>+</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button1}>
          <Text style={styles.buttonText1}>Social</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 5,
    marginBottom: 5,
  },
  photoItem: {
    flex: 1,
    margin: 3,
    borderRadius: 18,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: undefined,
    aspectRatio: 1,
    resizeMode: 'cover',
    borderRadius: 10,//사진 모서리 둥글게
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 2,
    marginBottom: 2,
    backgroundColor: '#FFFFBF',
    paddingVertical: 8,
    borderRadius: 5,
  },
  buttonContainer1: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 5,
  },
  buttonContainer2: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 2,
  },
  button1: {
    backgroundColor: '#FFFFBF',
    paddingVertical: 12,
    paddingHorizontal: 60,
    borderRadius: 15,
    borderWidth: 1, // 테두리의 두께
    borderColor: '#93BBDE', // 테두리의 색상
  },
  button2: { //배경블루
    backgroundColor: '#93BBDE',
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 50,
    borderWidth: 1, // 테두리의 두께
    borderColor: '#FFFFBF', // 테두리의 색상
  },
  button3: { //배경블루
    backgroundColor: '#93BBDE',
    paddingVertical: 10,
    paddingHorizontal: 43,
    borderRadius: 30,
    //borderWidth: 1, // 테두리의 두께
    //borderColor: '#FFFFBF', // 테두리의 색상
  },
  button4: {
    backgroundColor: '#93BBDE',
    paddingVertical: 25,
    paddingHorizontal: 25,
    borderRadius: 0,
    //borderWidth: 1, // 테두리의 두께
    //borderColor: '#93BBDE', // 테두리의 색상
  },
  buttonText1: {
    color: '#93BBDE',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonText2: {
    color: '#FFFFBF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonText3: {
    color: '#FFFFBF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonText4: {
    color: '#93BBDE',
    fontSize: 30,
    fontWeight: 'bold',
  },
});

export default App;