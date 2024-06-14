import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Text } from 'react-native';
import Footer from './hook/Footer';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import FontAwesome from "@expo/vector-icons/FontAwesome"

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
            <View style={styles.textContainer}>
              <Text style={styles.headerText}>MeMit</Text>
             </View>

      <View style={styles.contentContainer}>
        <View style={styles.userContainer}>
          <Image source={{uri:profile}} style={styles.profileImage} />
          <Text style={styles.nameText}>{name}</Text>
          
        </View>
      
      <TouchableOpacity style={styles.Edit_buttonContainer} onPress={handleNickname}>
        <Text style={styles.buttonText}>아이디 변경하기</Text>
        <FontAwesome name="angle-right" size={27} color="#000" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.Edit_buttonContainer} onPress={handleProfile}>
        <Text style={styles.buttonText}>프로필 사진 변경하기</Text>
        <FontAwesome name="angle-right" size={27} color="#000" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.Edit_buttonContainer} onPress={hanldeLogout}>
        <Text style={styles.buttonText}>로그아웃</Text>
        <FontAwesome name="sign-out" size={27} color="#000" />
      </TouchableOpacity>
      
      <View style={styles.spacer}></View>

      <Footer navigation={navigation}/>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  /* all container */
  container: {
    backgroundColor: '#fec43f',
    flex: 1,
    alignItems: 'center',
    //marginTop: 5,
    justifyContent: 'space-between', // Ensure space between header/content and footer
  },

    /* header container */
  textContainer:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: 90,
    marginBottom: 20,

  },
  headerText:{
    color: '#000',
    fontSize: 22,
    fontWeight: 'bold',
  },

      /* user container */
  contentContainer:{

    marginTop: 20,
    paddingVertical: 20,
    flex:1,
    width: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
    borderRadius: 40,
  },

  userContainer: {
    width: '90%',
    padding: 10,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 30,
  },

  profileImage: {
    width: 45,
    height: 45,
    borderRadius: 60, // Make the image circular
  },

  nameText: {
    color: '#000',
    fontSize: 23,
    fontWeight: 'bold',
    paddingLeft:20,
  },

      /* button container */
  Edit_buttonContainer: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 10, // Added padding
    paddingLeft: 10, 
    marginTop: 2,
    //marginBottom: 2,
    height: 55,
    borderRadius: 15,
    borderWidth: 0.8,
    borderColor:'#f2f1f6',
  },

  buttonText: {
    color: '#000',
    fontFamily: 'Inter',
    fontSize: 16,
    fontWeight: '400',

  },

  spacer: {
    flex: 1, // This view will take up the remaining space
  },

});
export default SettingScreen;