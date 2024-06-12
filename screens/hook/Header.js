import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet, Button } from 'react-native';
import { router } from 'expo-router';

const Header = ({navigation, setNumColumns}) => {
  return (
    <View style={styles.Headercontainer}>
      
      <View style={styles.buttonsContainer}> 
        <Button title="1" onPress={() => setNumColumns(1)} />
        <Button title="2" onPress={() => setNumColumns(2)} />
        <Button title="3" onPress={() => setNumColumns(3)} />
      </View>

      <TouchableOpacity 
        style={styles.button}
        onPress={() => navigation.navigate('ChatScreen')}
      >
        <Text style={styles.buttonText}>침</Text>
      </TouchableOpacity>

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
  buttonsContainer: { // New style for buttons container
    flexDirection: 'row',
    justifyContent: 'flex-start',
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
