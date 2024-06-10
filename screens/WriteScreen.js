import { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView, TextInput } from "react-native-web";
import SocialScreen from "./SocialScreen";

const WriteScreen = ({navigation}) => {

    const [message, setMessage] = useState(""); 
    const [file, setFile] = useState(null);

    const postHandler = () =>{
        
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
                        <TouchableOpacity style={styles.imageBox}>
                            <Text style={styles.imageText}>
                                이미지 불러오기
                            </Text>
                        </TouchableOpacity>
                        :
                        <Image source={file} style={styles.imageBox}>
                        </Image>
                    }
                </View>

            {/*ㄴText*/}
                <View style={{flex:1}}>
                    <TextInput
                        style={styles.textarea}
                        value={message}
                        onChange={(e)=>setMessage(e.target.value)}
                        multiline={true}
                        numberOfLines={5}
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
        fontSize:'14',
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
    textarea:{
        width: 300,
        borderWidth: 1,
        borderColor: '#888',
        borderRadius: 20,
        padding:5
    },
});

export default WriteScreen;