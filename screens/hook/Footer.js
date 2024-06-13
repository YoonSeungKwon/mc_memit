import {TouchableOpacity, View, Image, StyleSheet } from "react-native";
import Ai from "../../assets/images/ai-icon.png";
import FontAwesome from "@expo/vector-icons/FontAwesome";

const Footer = ({navigation}) =>{

    return(
        <View style={{flexDirection:"row",alignItems:"center", justifyContent:"space-evenly", height:50, position:"fixed", bottom:0, backgroundColor:"#fff", width:"100%"}}>
            
            <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate('SocialScreen')}>
                    <FontAwesome name="globe" size={27} color="#000" />
            </TouchableOpacity> 
           
            <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate('WriteScreen')}>
                    <FontAwesome name="plus-square" size={27} color="#000" />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate('SocialScreen')}>
                    <Image source={Ai} style={{width:45, height:45}}/>
            </TouchableOpacity>

        </View>
    );

}

const styles = StyleSheet.create({
    image: {
        width: 27, // 아이콘 크기와 맞추기 위해 이미지 크기를 조정하세요.
        height: 27,
        resizeMode: 'contain',
    },

    button: {
      width: 40,
      height: 40,
      alignItems: "center",
      justifyContent: "center",
  
    },
    buttonText: {
      fontSize: 35,
      color: '#86AAED',
      height: 35,
      lineHeight: 35,
      fontFamily: 'Inter',
    },
});

export default Footer;