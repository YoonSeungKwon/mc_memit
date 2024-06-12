import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { router } from 'expo-router';

const Header = ({navigation}) => {
  return (
    <View style={styles.Headercontainer}>
      <View style={styles.textContainer}>
        <Text style={styles.headerText}>Personal Page</Text>
      </View>
      <TouchableOpacity 
        style={styles.button}
        onPress={()=>navigation.navigate('SettingScreen')}
      >
        <Text style={styles.buttonText}>☰</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  Headercontainer: {
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center", 
    justifyContent: "space-between", 
    height: 50, 
    display: "flex",
    borderWidth: 1, 
    borderColor: '#86AAED',
  },
  textContainer: {
    flex: 1,
    alignItems: "center",
  },
  headerText: {
    fontSize: 19,  // 원하는 폰트 크기로 설정하세요
    fontFamily: 'Inter',
    color: '#000', // 원하는 폰트 색상으로 설정하세요
  },
  button: {
    width: 40, 
    height: 40, 
    alignItems: "center", 
    justifyContent: "center", 
    borderWidth: 1, 
    borderRadius: 20, 
    borderColor: '#86AAED', 
    backgroundColor: '#fff',
  },
  buttonText: {
    fontSize: 30, 
    color: '#86AAED', 
    height: 35, 
    lineHeight: 35, 
    fontFamily: 'Inter',
  },
});

export default Header;
