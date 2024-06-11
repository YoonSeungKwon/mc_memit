import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import moment from 'moment-timezone';

const DateInput = ({ date, name, content, isEditing, setContent, setIsEditing }) => {


  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.nameText}
          value={name}
          placeholder="Name"
          editable={false}
        />
        <TextInput
          style={styles.dateText}
          value={date}
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
    fontWeight: 'bold',
    width: '100%',
    marginBottom: 5,
  },
  dateText: {
    color: 'gray',
    fontSize: 12,
    width: '100%',
    marginBottom: 5,
  },
  contentText: {
    marginTop: 5,
    width: '100%',
  },
});

export default DateInput;
