import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import Footer from './hook/Footer';
import Header from './hook/Header';
import axios from 'axios';
import { useIsFocused } from '@react-navigation/native';
import { FlatList, ActivityIndicator, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const SocialScreen = ({ navigation }) => {


  const [id, setId] = useState(null);
  const [post, setPost] = useState([]);
  const isFocused = useIsFocused();

  // 점진적 이미지 로딩 - pagination logic
  const [visiblePosts, setVisiblePosts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  // zoom in and out
  const [numColumns, setNumColumns] = useState(2);



  const PAGE_SIZE = 10; // Number of items to load per page

  useEffect(()=>{
    if(isFocused){
      fetchPosts();
    }
  },[isFocused]);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const fetchId = await AsyncStorage.getItem("id");
      setId(fetchId);
      const response = await axios.get("http://43.202.127.16:8080/api/v1/posts");
      setPost(response.data);
      setVisiblePosts(response.data.slice(0, PAGE_SIZE));
      setPage(1);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const loadMorePosts = () => {
    if (!loading) {
      const nextPage = page + 1;
      const newPosts = post.slice(0, nextPage * PAGE_SIZE);
      setVisiblePosts(newPosts);
      setPage(nextPage);
    }
  };

  const handlePress = async (item) => {

    await axios.get(`http://43.202.127.16:8080/api/v1/posts/detail/${item.postIdx}`, {
      headers:{
        "Authorization":id
      }
    }      
    ).then((res)=>{
      console.log(res);
      navigation.navigate('DetailScreen', {image: res.data});
    });
  };

  const handleRefresh = () => {
    setRefreshing(true);
    fetchPosts();
  };


  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} setNumColumns={setNumColumns}/>
      {visiblePosts.length === 0 && !loading && (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No posts available</Text>
        </View>
      )}
        
        <FlatList
          data={visiblePosts}
          key={numColumns} 
          keyExtractor={(item) => item.postIdx.toString()}
          numColumns={numColumns}
          renderItem={({ item }) => (
            <View style={styles.photoItem}>
            <TouchableOpacity onPress={() => handlePress(item)}>
              <Image source={{ uri: item.file }} style={styles.image} />
              <View style={styles.userContainer}>
                  {/* <FontAwesome name="ellipsis-h" size={18} color="#000" /> */}
                  <View style={styles.usertextContainer}>
                    <Text style={styles.usertext}>view ▸ </Text>
                  </View>  
                <Text style={{position:"absolute", bottom:2,right:5, color:"red"}}>{item.like}♥</Text>
              </View>
            </TouchableOpacity>
            </View>
          )}
          ListFooterComponent={loading ? <ActivityIndicator size="large" /> : null}
          onEndReached={loadMorePosts}
          onEndReachedThreshold={0.5}
          refreshing={refreshing}
          onRefresh={handleRefresh}
        />
      <Footer navigation={navigation}/>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    flexDirection: 'column',
  },
  photoItem: {
    backgroundColor: '#f6f6f6',
    flex: 1,
    margin: 3,
    borderRadius: 16,
    overflow: 'hidden',
  },
  emptyText: {
    margin: 3,
    fontSize: 3,
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
  usertext:{
    fontSize: 13,  // 원하는 폰트 크기로 설정하세요
    fontFamily: 'Inter',
    color: '#000', 
    fontWeight:"bold"
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
