import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Text } from 'react-native';
import Footer from './hook/Footer';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

const SettingScreen = ({navigation}) => {

  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [file, setFile] = useState("");
  const [profile, setProfile] = useState("");
  const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions();

  useEffect(()=>{
    fetchData();
  }, [])


  const fetchData = async() =>{
    try{
      const fetchId = await AsyncStorage.getItem("id");
      const fetchName = await AsyncStorage.getItem("nickname");
      const fetchProfile = await AsyncStorage.getItem("profile");
      setId(fetchId)
      setName(fetchName)
      setProfile(fetchProfile)
    }catch(error){
      console.log(error);
    }
  }

  const hanldeLogout = async() =>{
    await AsyncStorage.clear();
    navigation.navigate("SplashScreen")
  }

  const handleProfileChange = async(file) => {
    const name = file.uri.split('/').pop();
    const type = file.mimeType || 'image/jpeg';

    const formData = new FormData();

    formData.append("file", {uri:file.uri, name:name, type:type})

    await axios.post("http://43.202.127.16:8080/api/v1/members/profile", formData, {
      headers:{
        'Authorization':id,
        'Content-Type':'multipart/form-data'
      }
    }).then((res)=>{
      console.log(res)
      saveData(res)
    }).catch((error)=>{
      console.log(error)
    })

  }

  const handleProfile = async () => {
    if(!status?.granted){
        const permission = await requestPermission();
        if(!permission.granted){
            return null;
        }
    }

    const response = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        quality: 1,
        aspect: [1,1],
    });
    if(response.canceled){
        console.log("canceled")
        return;
    }else{
      setFile(response.assets[0]);
      handleProfileChange(response.assets[0]);
    }    
  }

  const handleNickname = () =>{
    
  }

  const saveData = async(response) => {
    await AsyncStorage.setItem("id", response.data.id);
    await AsyncStorage.setItem("nickname", response.data.nickname);
    await AsyncStorage.setItem("profile", response.data.profile);
    fetchData();
  }

  return (
    <View style={styles.container}>
      <View style={styles.userContainer}>
        <Image source={{uri:profile}} style={styles.profileImage} />
        <Text style={styles.nameText}>{name}</Text>
      </View>


      <TouchableOpacity style={styles.buttonContainer1} onPress={handleNickname}>
        <Text style={styles.buttonText}>아이디 변경하기</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonContainer2} onPress={handleProfile}>
        <Text style={styles.buttonText}>프로필 사진 변경하기</Text>
      </TouchableOpacity>

      <View style={styles.spacer}></View>

      <TouchableOpacity style={styles.buttonContainer3} onPress={hanldeLogout}>
        <Text style={styles.buttonText}>로그아웃</Text>
      </TouchableOpacity>

      <Footer navigation={navigation}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //marginTop: 5,
    justifyContent: 'space-between', // Ensure space between header/content and footer
    paddingVertical: 10,
  },

  userContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 2,
    marginBottom: 5,
    backgroundColor: '#FFFFBF',
    height: 200, // 원하는 높이 값 (예: 60)
    borderRadius: 5,
  },
  
  buttonContainer1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 5,
    height: 60,
    backgroundColor: '#F6D8CE',
  },
  buttonContainer2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 40,
    height: 60,
    backgroundColor: '#F6D8CE',
  },
  buttonContainer3: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 2,
    height: 60,
    backgroundColor: '#F6D8CE',
  },

  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },

  nameText: {
    color: '#93BBDE',
    fontSize: 30,
    fontWeight: 'bold',
  },
  buttonText: {
    color: '#93BBDE',
    fontSize: 16,
    fontWeight: 'bold',
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

  spacer: {
    flex: 1, // This view will take up the remaining space
  },

  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60, // Make the image circular
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
});

export default SettingScreen;