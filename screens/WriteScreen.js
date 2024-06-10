import { useState } from "react";
import { Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";

const WriteScreen = ({navigation}) => {

    const formData = new FormData();
    const [message, setMessage] = useState(""); 
    const [file, setFile] = useState(null);
    const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions();


    const postHandler = async() =>{
        const data = {
            'content':message
        }

        const blob = base64ToBlob(file.base64);
        const image = new File([blob], 'image.jpg', { type: 'image/jpeg' });

        formData.append("file", image);
        formData.append("dto", new Blob([JSON.stringify(data)], {type:"application/json"}))

        axios.post("http://43.202.127.16:8080/api/v1/posts", formData, {
            headers:{
                'Content-Type': 'multipart/form-data; boundary=<calculated when request is sent>',
                'Authorization':"test",
            }
        }).then((res)=>{
            console.log(res);
            alert("글을 등록하였습니다.")
            navigation.navigate("SocialScreen");
        }).catch((error)=>{
            console.log(error)
        })

    }

    const base64ToBlob = (base64) => {
        const byteCharacters = atob(base64);
        const byteArray = new Uint8Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteArray[i] = byteCharacters.charCodeAt(i);
        }
        return new Blob([byteArray], { type: 'image/jpeg' });
      };

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
            base64:true
        });
        if(response.canceled){
            console.log("canceled")
            return;
        }
        setFile(response.assets[0]);
    }

    return(
        <SafeAreaView style={styles.container}>
            {/*Header*/}
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
                        onChange={(e)=>setMessage(e.target.value)}
                        multiline={true}
                        rows={5}
                        placeholder={"내용을 입력하세요."}
                    />
                </View>

            </View>

            {/*Util*/}
            <View style={styles.utilBox}>
                <TouchableOpacity style={styles.button} onPress={()=>{postHandler()}}>
                    <Text>쓰기</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate('SocialScreen')}>
                    <Text>취소</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>     
    )

}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
    },
    header:{
        flex:1,
        justifyContent:'center'
    },
    contentBox:{
        flex:7,
    },
    utilBox:{
        flex:2,
        flexDirection:'row'
    },
    button:{
        width: 200,
        alignItems:'center',
        justifyContent: 'center'
    },
    imageText:{
        color:'#aaa',
        fontSize:14,
    },
    imageBox:{
        flex:1,
        width: 300,
        borderWidth: 1,
        borderColor: '#888',
        borderRadius: 20,
        marginBottom:10,
        alignItems:'center',
        justifyContent:'center'
    },  
    textBox:{
        width: 300,
        borderWidth: 1,
        borderColor: '#888',
        borderRadius: 20,
        padding:5
    },
});

export default WriteScreen;