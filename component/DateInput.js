import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import moment from 'moment-timezone';

const DateInput = ({ name, setName, content, setContent, isEditing, setIsEditing }) => {
  const [date, setDate] = useState('');

  useEffect(() => {
    if (!isEditing) {
      const currentTime = moment().tz('Asia/Seoul').format('YYYY.MM.DD a.hh:mm');
      setDate(currentTime);
    }
  }, [isEditing]);

  const handleSave = () => {
    setIsEditing(false);
    console.log('Name:', name);
    console.log('Date:', date);
    console.log('Content:', content);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.nameText}
          value={name}
          onChangeText={setName}
          placeholder="Name"
          editable={isEditing}
        />
        <TextInput
          style={styles.dateText}
          value={date}
          onChangeText={setDate}
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
