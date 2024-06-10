import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, KeyboardAvoidingView, Platform, ScrollView, TouchableWithoutFeedback, Keyboard, Button } from 'react-native';
import DateInput from '../component/DateInput'; // DateInput 컴포넌트를 불러옵니다.

const DetailScreen = ({ route, navigation }) => {
  const { image } = route.params;
  const [name, setName] = useState('Name');
  const [content, setContent] = useState('왑!!! 내가 해낸다..\n크크크크\n난우주최강 멋쟁이.');
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    // Save logic here
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
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 80}
    >
      <TouchableWithoutFeedback onPress={handleOutsidePress}>
        <View style={styles.container}>
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.contentContainer}>
              <Text>App is open soohyun 화이팅!</Text>
              <Image
                source={image}
                style={styles.image}
              />
              <View style={styles.textBox}>
                <DateInput 
                  name={name} 
                  setName={setName} 
                  content={content} 
                  setContent={setContent} 
                  isEditing={isEditing} 
                  setIsEditing={setIsEditing} 
                />
              </View>
              <View style={styles.buttonContainer}>
                {isEditing ? 
                  (<Button title="Save" onPress={handleSave} />) 
                  : (<Button title="Edit" onPress={handleEdit} />)}
              </View>
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
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
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginTop: 10,
    alignItems: 'flex-start',
  },
  buttonContainer: {
    position: 'relative',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '100%',
    marginTop: 10,
  },
});

export default DetailScreen;
