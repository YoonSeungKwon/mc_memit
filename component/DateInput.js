import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity, Image } from 'react-native';
import moment from 'moment-timezone';
import axios from 'axios';

const DateInput = ({ id, idx, date, name, content, profile, liked, setLiked, isEditing, setContent, setIsEditing }) => {

  const handleLike = () =>{
    if(liked){
      setLiked(false)
      axios.get(`http://43.202.127.16:8080/api/v1/posts/likes/${idx}`, {
        headers:{
          Authorization: id
        }
      })
    }else{
      setLiked(true)
      axios.get(`http://43.202.127.16:8080/api/v1/posts/likes/${idx}`, {
        headers:{
          Authorization: id
        }
      })
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Image style={{width:50, height:50, borderRadius:45, position:'absolute', top: 15}} source={{uri:profile}} />
        <TextInput
          style={styles.nameText}
          value={name}
          editable={false}
        />
        <TouchableOpacity style={{position:'absolute', right:10, top:10}} onPress={handleLike}>
            <Text style={{fontSize:25}}>{liked?'♥':'♡'}</Text>
        </TouchableOpacity>
        <TextInput
          style={styles.dateText}
          value={date.substring(0,10)}
          placeholder="Date"
          editable={false}
        />
        <TextInput
          style={styles.contentText}
          value={content}
          onChangeText={setContent}
          placeholder="Content"
          multiline
          editable={isEditing}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
  },
  inputContainer: {
    width: '90%',
    padding: 10,
    backgroundColor: '#ffff',
    borderRadius: 10,
    marginBottom: 10,
  },
  nameText: {
    marginLeft: 50,
    width: '100%',
    color:'#111',
    fontFamily:'nanum2',
    fontSize: 20
  },
  dateText: {
    color: 'gray',
    marginLeft: 50,
    fontSize: 10,
    width: '100%',
    marginBottom: 5,
    fontFamily:'nanum1'
  },
  contentText: {
    marginTop: 5,
    width: '100%',
    fontFamily:'nanum2',
    color:'#111',
    fontSize:15
  },
});

export default DateInput;
