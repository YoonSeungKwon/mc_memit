import { Image, View } from "react-native";
import logo from "../assets/images/logo2.png";
import { useEffect } from "react";
import { router } from "expo-router";
import SocialScreen from "./SocialScreen";

const SplashScreen = ({navigation}) =>{

    useEffect(() => {
        setTimeout(()=>{    
            navigation.navigate('SocialScreen')
        }, 2000)
    }, []);

    return(
        <View style={{alignItems:'center', justifyContent:'center', flex:1}}>
            <Image source={logo} style={{width:70, height:100}}/>
        </View>
    )


}
export default SplashScreen;