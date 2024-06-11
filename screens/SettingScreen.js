import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Text } from 'react-native';

const SettingScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.userContainer}>
        <Image source={require('../assets/images/image01.jpg')} style={styles.profileImage} />
        <Text style={styles.nameText}>Nickname  </Text>
      </View>


      <TouchableOpacity style={styles.buttonContainer1}>
        <Text style={styles.buttonText}>       아이디 변경하기</Text>
        <Text style={styles.buttonText}>+      </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonContainer2}>
        <Text style={styles.buttonText}>       프로필 사진 변경하기</Text>
        <Text style={styles.buttonText}>+      </Text>
      </TouchableOpacity>

      <View style={styles.spacer} /> {/* Add this view as a flexible spacer */}

      <TouchableOpacity style={styles.buttonContainer3}>
        <Text style={styles.buttonText}>       로그아웃</Text>
        <Text style={styles.buttonText}>+       </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //marginTop: 5,
    justifyContent: 'space-between', // Ensure space between header/content and footer
    paddingVertical: 10,
  },

  userContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 2,
    marginBottom: 5,
    backgroundColor: '#FFFFBF',
    height: 200, // 원하는 높이 값 (예: 60)
    borderRadius: 5,
  },
  
  buttonContainer1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 5,
    height: 60,
    backgroundColor: '#F6D8CE',
  },
  buttonContainer2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 40,
    height: 60,
    backgroundColor: '#F6D8CE',
  },
  buttonContainer3: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 2,
    height: 60,
    backgroundColor: '#F6D8CE',
  },

  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },

  nameText: {
    color: '#93BBDE',
    fontSize: 30,
    fontWeight: 'bold',
  },
  buttonText: {
    color: '#93BBDE',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonText1: {
    color: '#93BBDE',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonText2: {
    color: '#FFFFBF',
    fontSize: 16,
    fontWeight: 'bold',
  },

  button1: {
    backgroundColor: '#FFFFBF',
    paddingVertical: 12,
    paddingHorizontal: 60,
    borderRadius: 15,
    borderWidth: 1, // 테두리의 두께
    borderColor: '#93BBDE', // 테두리의 색상
  },
  button2: { //배경블루
    backgroundColor: '#93BBDE',
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 50,
    borderWidth: 1, // 테두리의 두께
    borderColor: '#FFFFBF', // 테두리의 색상
  },

  spacer: {
    flex: 1, // This view will take up the remaining space
  },

  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60, // Make the image circular
  },
  photoItem: {
    flex: 1,
    margin: 3,
    borderRadius: 18,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: undefined,
    aspectRatio: 1,
    resizeMode: 'cover',
    borderRadius: 10,//사진 모서리 둥글게
  },
});

export default SettingScreen;