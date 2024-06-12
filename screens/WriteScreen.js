import { useEffect, useState } from "react";
import { Image, KeyboardAvoidingView, Platform, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import Modal from 'react-native-modal'; // Import Modal
import { StatusBar } from 'expo-status-bar';
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const WriteScreen = ({navigation}) => {

    const [id, setId] = useState(null)
    const [name, setName] = useState(null)
    const [profile, setProfile] = useState(null)

    const [message, setMessage] = useState(""); 
    const [file, setFile] = useState(null);
    const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions();
    const [isModalVisible, setModalVisible] = useState(false);
    
    useEffect(()=>{
        fetchData();
    },[])

    const postHandler = async() =>{
        setModalVisible(true);
        const data = {
            "content": message,
        }
        
        const formData = new FormData();
        const name = file.uri.split('/').pop();
        const type = file.mimeType || 'image/jpeg';

    
        formData.append("dto", {"string":JSON.stringify(data), type: "application/json"});
        formData.append("file", {uri: file.uri, name: name, type: type})

        axios.post("http://43.202.127.16:8080/api/v1/posts", formData, {
            headers:{
                'Content-Type': 'multipart/form-data',
                'Authorization':id,
            },
        }).then((res)=>{
            console.log(res);
            alert("글을 등록하였습니다.")
            setModalVisible(false);
            navigation.navigate("SocialScreen");
        }).catch((error)=>{
            console.log(error)
        })

    }

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


    const uploadImage = async () => {
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
        }

        setFile(response.assets[0]);
    }

    return(
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
        >
            {/*Header*/}
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View style={{ flex: 1, alignItems: 'center', width: '100%' }}>
                    <View style={styles.header}>
                        <Text>글쓰기</Text>
                    </View>

                    {/*Content*/}
                    <View style={styles.contentBox}>

                    {/*ㄴImage*/}
                        <View style={{flex:4}}>
                            {file === null ? 
                                <TouchableOpacity style={styles.imageBox} onPress={uploadImage}>
                                    <Text style={styles.imageText}>
                                        이미지 불러오기
                                    </Text>
                                </TouchableOpacity>
                                :
                                <Image source={{uri:file.uri}} style={styles.imageBox}/>
                            }
                        </View>

                    {/*ㄴText*/}
                        <View style={{flex:1}}>
                            <TextInput
                                style={styles.textBox}
                                value={message}
                                onChangeText={setMessage}
                                multiline={true}
                                rows={5}
                                placeholder={"내용을 입력하세요."}
                            />
                        </View>

                    </View>
                    <StatusBar style="auto" />
                    
                    {/*Util*/}
                    <View style={styles.utilBox}>
                        <TouchableOpacity style={styles.button} onPress={()=>{postHandler()}}>
                            <Text>쓰기</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate('SocialScreen')}>
                            <Text>취소</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableWithoutFeedback>

            <Modal isVisible={isModalVisible}>
                <View style={styles.modalContent}>
                    <Text>Uploading...</Text>
                </View>
            </Modal>
        </KeyboardAvoidingView>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0)',
        //backgroundColor: '#1f203b',
        alignItems: 'center',
    },
    header: {
        flex: 1,
        justifyContent: 'center'
    },
    contentBox: {
        flex: 3,
        alignItems: 'center',
        justifyContent: 'center'
    },
    utilBox: {

        flex: 1.2,
        flexDirection: 'row-reverse'
    },
    button: {
        width: 200,
        alignItems: 'center',
        padding: 30,
    },
    buttonText: {
        color: '#0075eb', // 글자 색 변경
        fontSize: 18,
        fontWeight: 'bold',
        fontFamily: 'Inter',
    },
    imageText: {
        color: '#aaa',
        fontSize: 14,
    },
    imageBox: {
        flex: 1,
        width: 300,
        borderWidth: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        borderRadius: 20,
        marginBottom: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 20,
    },
    textBoxContainer: {
        backgroundColor: 'white',
        width: 300,
        padding: 0,
        borderRadius: 10,
        marginTop: 10,
        borderRadius: 10,
        marginBottom: 10,
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
});

export default WriteScreen;