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
      <View style={styles.userContainer}>
        <Image style={{left:0 ,width:35, height:35, borderRadius:45}} source={{uri:profile}}/>
        <TextInput
          style={styles.nameText}
          value={name}
          placeholder="Name"
          editable={false}
        />
        <TouchableOpacity style={{position:'absolute', right:0,top:18}} onPress={handleLike}>
            <Text style={{fontSize:27, bottom:2,right:5, color:"red"}}>{liked?'♥':'♡'}</Text>
        </TouchableOpacity>

        <TextInput
          style={styles.dateText}
          value={date.substring(0,10)}
          placeholder="Date"
          editable={false}
        />

        </View>

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
    //backgroundColor: '#fff',

  },
  inputContainer: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 10,
    //marginTop: 10,
    marginBottom: 20,
    //padding:20,
    alignItems: "center", 
    justifyContent: "space-around" ,
  },
  userContainer:{
    width: '100%',
    flexDirection: "row",
    backgroundColor: '#fff',
    alignItems: "center", 
    justifyContent: "space-between" ,

  },
  nameText: {
    fontWeight: 'bold',
    marginTop: 0,
    marginLeft: 10,
    width: '100%',
  },
  dateText: {
    color: 'gray',
    marginLeft: 50,
    fontSize: 10,
    width: '100%',
    marginBottom: 50,
    
  },
  contentText: {
    //marginTop:5,
    marginLeft:5,
    width: '100%',
  },
});

export default DateInput;
