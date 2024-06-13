import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import Footer from './hook/Footer';
import Header from './hook/Header';
import MasonryList from '@react-native-seoul/masonry-list';
import axios from 'axios';
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FlatList, ActivityIndicator, Text } from 'react-native';

const SocialScreen = ({ navigation }) => {
  
  const [id, setId] = useState("");
  const [post, setPost] = useState([]);
  const isFocused = useIsFocused();

  const [numColumns, setNumColumns] = useState(2);

  const fetchData = async() =>{
    try{
      const fetchId = await AsyncStorage.getItem("id");
      console.log(id)
      setId(fetchId)
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

  const handleRefresh = () => {
    setRefreshing(true);
    fetchData();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} setNumColumns={setNumColumns}/>
        {post.length === 0 && (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>당신 왜 사진을 올리지 않았지?</Text>
          </View>
        )}
        <FlatList
            data={post}
            key={numColumns} 
            keyExtractor={(item) => item.postIdx.toString()}
            numColumns={numColumns}
            renderItem={({ item }) => (
              <View style={styles.photoItem}>
              <TouchableOpacity onPress={() => handlePress(item)}>
                  <Image source={{ uri: item.file }} style={styles.image} />
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
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SocialScreen;
