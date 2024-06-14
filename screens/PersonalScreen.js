import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import Footer from './hook/Footer';
import Header from './hook/Header';
import MasonryList from '@react-native-seoul/masonry-list';
import axios from 'axios';
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FlatList, ActivityIndicator, Text } from 'react-native';

const PersonalScreen = ({ navigation }) => {
  
  const [id, setId] = useState("");
  const [post, setPost] = useState([]);
  const [profile, setProfile] = useState("");
  const [name, setName] = useState("");
  const isFocused = useIsFocused();

  const [numColumns, setNumColumns] = useState(2);

  const fetchData = async() =>{
    try{
      const fetchId = await AsyncStorage.getItem("id");
      const fetchName = await AsyncStorage.getItem("nickname");
      const fetchProfile = await AsyncStorage.getItem("profile");
      console.log(id)
      setId(fetchId)
      setName(fetchName)
      setProfile(fetchProfile)
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

    await axios.get(`http://43.202.127.16:8080/api/v1/posts/detail/${item.postIdx}`, {
      headers:{
        Authorization:id
      }
    }     
    ).then((res)=>{
      console.log(res);
      navigation.navigate('DetailScreen', {image: res.data});
    });
  };


  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} setNumColumns={setNumColumns}/>
      {post.length === 0 && (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>This is my page</Text>
          </View>
        )}
        <View style={styles.emptyContainer}>
          <Image source={{uri: profile}} style={styles.profileImage} />
          <Text style={styles.nameText}>{name}</Text>
        </View>
        <FlatList
            data={post}
            key={numColumns} 
            keyExtractor={(item) => item.postIdx.toString()}
            numColumns={numColumns}
            renderItem={({ item }) => (
              <View style={styles.photoItem}>
              <TouchableOpacity onPress={() => handlePress(item)}>
                  <Image source={{ uri: item.file }} style={styles.image} />
                  <View style={styles.userContainer}>
                    <Text style={styles.usertext}>view ▸ </Text>
                    <Text style={{position:"absolute", bottom:2,right:5, color:"red"}}>{item.like}♥</Text>
                  </View>
              </TouchableOpacity>
              </View>
            )}
            onEndReachedThreshold={0.5}
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
    backgroundColor: '#fff',
  },
  photoItem: {
    backgroundColor: '#f6f6f6',
    flex: 1,
    margin: 3,
    borderRadius: 16,
    overflow: 'hidden',
  },
  emptyContainer: {
    flex: 1,
    backgroundColor: '#bf1c0d',
    justifyContent: 'center',
    alignItems: 'center',
  },
  userContainer:{
    justifyContent: 'center',
    marginTop: 2,
    height:25,
    margin: 3,
    borderRadius: 10,
  },
  usertextContainer:{
    width:75,
    //borderWidth:0.8,
    //borderRadius:8,
    alignItems: "center",
    padding:1,
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

export default PersonalScreen;
