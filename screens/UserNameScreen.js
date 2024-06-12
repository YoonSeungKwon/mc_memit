import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserNameScreen = ({ navigation }) => {
  const [name, setName] = useState('');

  const handleSave = async () => {
    try {
      await AsyncStorage.setItem('userName', name);
      navigation.navigate('Personal');
    } catch (error) {
      console.error('Failed to save user name:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Enter your name:</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
      />
      <Button title="Save" onPress={handleSave} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    padding: 8,
    marginBottom: 16,
  },
});

export default UserNameScreen;
