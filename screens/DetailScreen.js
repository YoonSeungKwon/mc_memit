import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, KeyboardAvoidingView, Platform, ScrollView, TouchableWithoutFeedback, Keyboard, Button, TouchableOpacity } from 'react-native';
import DateInput from '../component/DateInput'; // DateInput 컴포넌트를 불러옵니다.
import axios from 'axios';

const DetailScreen = ({ route, navigation }) => {
  const { image } = route.params;
  const [content, setContent] = useState(image.content);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(()=>{
  },[]);

  const handleSave = async () => {
    // Save logic here
    const data = {
      content: content
    }

    axios.put(`http://43.202.127.16:8080/api/v1/posts/${image.postIdx}`, data, {
      headers:{
        'Authorization':'test'
      }
    }).then((res)=>{
      console.log(res.data)
    }).catch((error)=>{
      console.log(error)
    });

    setIsEditing(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleOutsidePress = () => {
    if (isEditing) {
      handleSave();
    }
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 82:0}
    >
      <TouchableWithoutFeedback onPress={handleOutsidePress}>
        <View style={styles.container}>
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.contentContainer}>
              <View style={styles.backButtonContainer}>
                <TouchableOpacity style={styles.button} onPress={() =>  navigation.goBack()}>
                            <Text style={styles.buttonText}>Back</Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.headerText}>{image.writer} image!</Text>
              <Image
                source={{uri:image.file}}
                style={styles.image}
              />
              <View style={styles.textBox}>
                <DateInput 
                  date={image.createAt}
                  name={image.writer} 
                  content={content} 
                  setContent={setContent} 
                  isEditing={isEditing} 
                  setIsEditing={setIsEditing} 
                />
              </View>
              <View style={styles.editButtonContainer}>
              {isEditing ? (
                  <TouchableOpacity style={styles.button} onPress={handleSave}>
                        <Text style={styles.buttonText}>Save</Text>
                  </TouchableOpacity>) 
                  : (<TouchableOpacity style={styles.button} onPress={handleEdit}>
                        <Text style={styles.buttonText}>Edit</Text>
                      </TouchableOpacity>)}</View>
            </View>
          </TouchableWithoutFeedback>
          <StatusBar style="auto" />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.28)',
    //backgroundColor: '#111121',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    color: '#ffff', // 글자 색 변경
    fontSize: 18,
    fontWeight: 'light',
    fontFamily: 'Inter',
  },
  backButtonContainer: {
    alignSelf: 'flex-start',
    //backgroundColor: '#fff',
    marginLeft: 5,
    marginTop: 10,
  },
  editButtonContainer: {
    alignSelf: 'flex-end',
    //backgroundColor: '#fff',
    marginLeft: 5,
    marginTop: 10,
  },
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  image: {
    width: 350,
    height: 350,
    marginTop: 20,
    borderRadius: 10,
  },
  textBox: {
    width: 350,
    padding: 0,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginTop: 10,
    alignItems: 'flex-start',
  },
  buttonText: {
    color: '#0075eb', // 글자 색 변경
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Inter',
},
});

export default DetailScreen;
