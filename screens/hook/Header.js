import React, { useState } from 'react';
import { TouchableOpacity, View, Text, StyleSheet, Button, Image } from 'react-native';
import { router } from 'expo-router';
import grid1 from '../../assets/images/grid1.png';
import grid2 from '../../assets/images/grid2.png';
import grid3 from '../../assets/images/grid3.png';


const Header = ({navigation, setNumColumns}) => {

  const [num, setNum] = useState(2);
  const [grid, setGrid] = useState(grid3);

  const handleGrid = () => {
    if(num==1){
      setNum(2);
      setNumColumns(2);
      setGrid(grid3)
    }
    else if(num==2){
      setNum(3);
      setNumColumns(3);
      setGrid(grid1)
    }
    else{
      setNum(1);
      setNumColumns(1);
      setGrid(grid2);
    }
  }

  return (
    <View style={styles.Headercontainer}>
      
      <View style={styles.buttonsContainer}>
        <TouchableOpacity onPress={handleGrid}> 
          <Image source={grid} style={{width:20, height:20, marginLeft:20}}/>
        </TouchableOpacity>
      </View>

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
