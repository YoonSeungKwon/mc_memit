import { Image, View } from "react-native";
import logo from "../assets/images/logo2.png";
import { useEffect } from "react";
import { router } from "expo-router";
import SocialScreen from "./SocialScreen";
import { useIsFocused } from "@react-navigation/native";

const SplashScreen = ({navigation}) =>{

    const isFocused = useIsFocused();

    useEffect(() => {
        if(isFocused){
            setTimeout(()=>{    
                navigation.navigate('SocialScreen')
            }, 2000)
        }
    }, [isFocused]);

    return(
        <View style={{alignItems:'center', justifyContent:'center', flex:1}}>
            <Image source={logo} style={{width:70, height:100}}/>
        </View>
    )


}
export default SplashScreen;