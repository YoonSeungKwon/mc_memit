import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Text, Alert, Modal, TextInput, Button } from 'react-native';
import Footer from './hook/Footer';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import FontAwesome from "@expo/vector-icons/FontAwesome"

const SettingScreen = ({navigation}) => {

  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [newName, setNewName] = useState(name);
  const [file, setFile] = useState("");
  const [profile, setProfile] = useState("");
  const [modalVisible, setModalVisible] = useState(false); 
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
      setNewName(fetchName)
      setProfile(fetchProfile)
    }catch(error){
      console.log(error);
    }
  }

  const hanldeLogout = async() =>{
    Alert.alert(
      "",
      "탈퇴하시겠습니까?",
      [
        {
          text: "취소",
          onPress: () => console.log("취소 클릭됨"),
          style: "cancel"
        },
        {
          text: "확인",
          onPress: async () => {
            await AsyncStorage.clear();
            navigation.navigate("SplashScreen");
          }
        }
      ],
      { cancelable: false }
    );
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
    axios.post(`http://43.202.127.16:8080/api/v1/members/nickname-check/${newName}`)
        .then((res)=>{
            console.log(res.data)
            if(res.data){
                Alert.alert('nickname already exist')
                setNewName(name);
            }else{
                const data = {
                    nickname: newName,
                }
                axios.patch('http://43.202.127.16:8080/api/v1/members/update', data ,{
                  headers:{
                    Authorization:id
                  }
                })
                .then(async (response)=>{
                    setName(newName);
                    await AsyncStorage.setItem("nickname", newName);
                    setModalVisible(false);
                });
            }
        });
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
      
      <TouchableOpacity style={styles.Edit_buttonContainer} onPress={()=>setModalVisible(true)}>
        <Text style={styles.buttonText}>이름 변경하기</Text>
        <FontAwesome name="angle-right" size={27} color="#000" />
      </TouchableOpacity>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
        style={styles.modal}
      >
        <View style={styles.modalBack}>
          <View style={styles.modal}>
            <Text style={{fontSize:20}}>new name</Text>
            <TextInput
              style={{height:40, borderRadius: 25, borderColor: '#111', borderWidth: 1, width:'70%', margin:10, padding:10}}
              value={newName}
              onChangeText={setNewName}
            />
            <View style={{flexDirection:'row'}}>
              <TouchableOpacity onPress={() => setModalVisible(false)} style={{}}>
                <Text>취소</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleNickname} style={{marginLeft:100}}>
                <Text>확인</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <TouchableOpacity style={styles.Edit_buttonContainer} onPress={handleProfile}>
        <Text style={styles.buttonText}>프로필 사진 변경하기</Text>
        <FontAwesome name="angle-right" size={27} color="#000" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.Edit_buttonContainer} onPress={hanldeLogout}>
        <Text style={styles.buttonText}>탈퇴하기</Text>
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

  modalBack:{
    flex:1,
    backgroundColor:"rgba(0,0,0,0.5)",
    justifyContent:'center',
    alignItems:'center'
  },

  modal:{
    width:"70%",
    height:150,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:"#fff"
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
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
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