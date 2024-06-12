import { Image, View } from "react-native";
import logo from "../assets/images/logo2.png";
import { useEffect, useState } from "react";
import { router } from "expo-router";
import SocialScreen from "./SocialScreen";
import { useIsFocused } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SplashScreen = ({navigation}) =>{

    const isFocused = useIsFocused();
    const [id, setId] = useState(null);

    useEffect(() => {
        if(isFocused){
            getId();
        }
    }, [isFocused]);

    const getId = async() =>{
        const key = await AsyncStorage.getItem("id")
        setId(key)
        if(key == null){
            setTimeout(()=>{
                navigation.navigate("RegisterScreen")
            }, 2000)
        }else{
            setTimeout(()=>{
                navigation.navigate("SocialScreen")
            }, 2000)
        }
    }

    return(
        <View style={{alignItems:'center', justifyContent:'center', flex:1}}>
            <Image source={logo} style={{width:70, height:100}}/>
        </View>
    )


}
export default SplashScreen;