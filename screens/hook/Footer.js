import { Button, Pressable, TouchableHighlight, TouchableOpacity, View, Text } from "react-native";
import {router} from 'expo-router';

const Footer = ({navigation}) =>{

    return(
        <View style={{flexDirection:"row",alignItems:"center", justifyContent:"center", height:50, position:"fixed", bottom:0, backgroundColor:"#fff", width:"100%"}}>
            <TouchableOpacity style={{width:120, height:30 , alignItems:"center", justifyContent:"center", borderWidth:1, borderRadius: 20, borderColor:'#86AAED', backgroundColor:'#FBFCBB'}}
                onPress={()=>navigation.navigate('SettingScreen')}
            >
                <Text style={{fontSize:14, color:'#86AAED', height:30, lineHeight:30, fontFamily:'Inter'}}>
                    Personal
                </Text>
            </TouchableOpacity> 
            <TouchableOpacity style={{width:30, height:30, alignItems:"center", justifyContent:"center", borderRadius: 45, marginLeft:15, marginRight:15, backgroundColor:'#86AAED'}}
                onPress={()=>navigation.navigate('WriteScreen')}
            >
                <Text style={{fontSize:20, color:'#ffffff', height:30, lineHeight:30}}>
                    +
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={{width:120, height:30 , alignItems:"center", justifyContent:"center", borderWidth:1, borderRadius: 20, borderColor:'#86AAED', backgroundColor:'#FBFCBB'}}
                onPress={()=>navigation.navigate('SocialScreen')}
            >
                <Text style={{fontSize:14, color:'#86AAED', height:30, lineHeight:30, fontFamily:'Inter'}}>
                    Social  
                </Text>
            </TouchableOpacity>
        </View>
    );

}

export default Footer;