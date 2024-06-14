import React, {useState } from 'react';
import { TouchableOpacity, View, Text, StyleSheet, Image } from 'react-native';
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
          <Image source={grid} style={{width:22, height:22, marginLeft:10}}/>
        </TouchableOpacity>
      </View>
      <TouchableOpacity 
        style={styles.PageButtons}
        onPress={()=>navigation.navigate('PersonalScreen')}>
        <Text style={styles.PageText}>MyPage</Text>
      </TouchableOpacity>

      <View style={styles.HeadertextContainer}>
        <Text style={styles.headerText}>MeMit</Text>
      </View>

      <TouchableOpacity 
        style={styles.buttonsContainer}
        onPress={()=>navigation.navigate('SettingScreen')}>
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
    justifyContent: "space-between" ,
    height: 50, 
    display: "flex",
    borderWidth: 1, 
    borderColor: '#f2f1f6',
  },
  buttonsContainer: { // New style for buttons container통일시켰습ㄴ다. 
    flexDirection: 'row',
  },
  PageButtons:{
    marginLeft:15,
    borderWidth:1.5,
    borderRadius:5,
    padding:1,
  },
  PageText: {
    fontSize: 17,  // 원하는 폰트 크기로 설정하세요
    fontFamily: 'Inter',
    color: '#000', // 원하는 폰트 색상으로 설정하세요
  },
  HeadertextContainer: {
    flex: 1,
    marginRight:15,
    marginLeft:90,
    borderRadius:5,
    backgroundColor: '#fec43f',
    alignItems: "flex-end",
    padding:3,
  },
  headerText: {
    alignItems: "flex-end",
    fontSize: 17,  // 원하는 폰트 크기로 설정하세요
    fontFamily: 'Inter',
    color: '#000', // 원하는 폰트 색상으로 설정하세요
    borderRadius:20,
  },

  
  buttonText: {
    fontSize: 30, 
    color: '#000', 
    height: 35, 
    lineHeight: 35, 
    fontFamily: 'Inter',
  },
});
export default Header;
