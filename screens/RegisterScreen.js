import { useEffect, useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage"
import axios from "axios";

const RegisterScreen = ({navigation}) =>{

    const [name, setName] = useState("");

    const onSubmitHandler = () =>{
        axios.post(`http://43.202.127.16:8080/api/v1/members/nickname-check/${name}`)
        .then((res)=>{
            console.log(res.data)
            if(res.data){
                Alert.alert('nickname already exist')
                setName("");
            }else{
                const data = {
                    nickname: name,
                }
                axios.post('http://43.202.127.16:8080/api/v1/members/register', data )
                .then((response)=>{
                    saveData(response);
                });
            }
        });
    }

    const saveData = async(response) => {
        await AsyncStorage.setItem("id", response.data.id);
        await AsyncStorage.setItem("nickname", response.data.nickname);
        await AsyncStorage.setItem("profile", response.data.profile);
        navigation.navigate("SettingScreen");
    }


    return(
        <View style={{alignItems:"center", justifyContent:"center", flex:1}}>
            <Text>Please enter the nickname</Text>
            <TextInput
                value={name}
                onChangeText={setName}
                style={{borderColor:'black', borderWidth:1, width:"50%", padding:5, borderRadius: 20, margin:20}}
            />
            <TouchableOpacity
                onPress={onSubmitHandler}
            >
                <Text>Start</Text>
            </TouchableOpacity>
        </View>
    );

}

export default RegisterScreen;