import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import Footer from './hook/Footer';
import Header from './hook/Header';
import MasonryList from '@react-native-seoul/masonry-list';
import axios from 'axios';
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SocialScreen = ({ navigation }) => {
  
  const [id, setId] = useState("");
  const [post, setPost] = useState([]);
  const isFocused = useIsFocused();

  const fetchData = async() =>{
    try{
      const fetchId = await AsyncStorage.getItem("id");
      console.log(id)
      await axios.get("http://43.202.127.16:8080/api/v1/posts/my",{
        headers:{
          'Authorization': fetchId
        }
      }
      ).then((res)=>{
        console.log(res);
        setPost(res.data);
      }).catch((error)=>{
        console.log(error);
      })
    }catch(error){
      console.log(error);
    }
  }


  useEffect(()=>{
    if(isFocused){
      fetchData();
    }
  },[isFocused]);

  const handlePress = async (item) => {

    await axios.get(`http://43.202.127.16:8080/api/v1/posts/detail/${item.postIdx}`      
    ).then((res)=>{
      console.log(res);
      navigation.navigate('DetailScreen', {image: res.data});
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation}/>
      <MasonryList
        data={post}
        keyExtractor={(item) => item.postIdx.toString()}
        numColumns={2}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handlePress(item)}>
            <View style={styles.photoItem}>
              <Image source={{uri:item.file}} style={styles.image} />
            </View>
          </TouchableOpacity>
        )}
      />
      <Footer navigation={navigation}/>
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
    //backgroundColor: '#ff3c00',
    flex: 1,
    margin: 3,
    borderRadius: 18,
    overflow: 'hidden',
  },
  image: {
    //backgroundColor: '#ff3c00',
    width: '100%',
    height: undefined,
    aspectRatio: 1,
    resizeMode: 'cover',
    borderRadius: 10, // 사진 모서리 둥글게
  },
});

export default SocialScreen;
