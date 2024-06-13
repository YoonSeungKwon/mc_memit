import React, { useState, useRef } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Image, ScrollView } from 'react-native';
import axios from 'axios';



const ChatScreen = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [apeState, setApeState] = useState('idle'); // idle, talking, eating
  const [apeMessage, setApeMessage] = useState('');

  const scrollViewRef = useRef();

  const API_KEY = process.env.EXPO_PUBLIC_OPENAI_KEY; // Replace with your OpenAI API key

  const PROMPT = "너는 사람들을 동기부여하는 앱에 갇힌 영혼이야. 싸가지 없게 사람들을 동기부여해줘. 짧게 대답해줘.";

  const sendMessage = async () => {
    if (!input.trim()) return;

    setMessages([...messages, { sender: 'user', text: input }]);
    scrollViewRef.current?.scrollToEnd({ animated: true });
    setInput('');
    setApeState('thinking');

    // Extract the last 5 messages from the history (excluding the new input message)
    const lastMessages = messages.slice(-5).map(msg => ({
      role: msg.sender === 'user' ? 'user' : 'assistant',
      content: msg.text
    }));

    const apiMessages = [
      { role: 'system', content: PROMPT },
      ...lastMessages,
      { role: 'user', content: input }
    ];
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-4o',
          messages: apiMessages,
        },
        {
          headers: {
            'Authorization': `Bearer ${API_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const reply = response.data.choices[0].message.content;
      setApeState('talking');
      simulateStreamedResponse(reply);
    //   setApeMessage(reply);
    //   setApeState('talking');
    //   setMessages((prevMessages) => [...prevMessages, { sender: 'bot', text: reply }]);
    } catch (error) {
      console.error(error);
      setApeMessage('Error: Unable to get a response.');
    } finally {
      // setApeState('idle');
    }
  };

  const simulateStreamedResponse = (reply) => {
    const chunks = reply.split(' '); // Split the reply into words for a more realistic streaming effect
    let currentMessage = '';
    setMessages((prevMessages) => [...prevMessages, { sender: 'bot', text: '' }]);
    
    chunks.forEach((chunk, index) => {
      setTimeout(() => {
        currentMessage += `${chunk} `;
        setApeMessage(currentMessage);
        setMessages((prevMessages) => [...prevMessages.slice(0, -1), { sender: 'bot', text: currentMessage }]);
        scrollViewRef.current?.scrollToEnd({ animated: true });

        if (index === chunks.length - 1) {
          setApeState('idle');
        }
      }, index * 150); // Adjust the delay as needed for a more realistic effect
    });
  };

  const handleFeed = () => {
    setApeState('eating');
    setApeMessage('Yummy! Thanks for the food!');
    setTimeout(() => setApeState('idle'), 5000); // Simulate eating duration
  };

  return (
    <View style={styles.container}>
      <View style={styles.apeContainer}>
        <Image
          source={
            apeState === 'idle'
              ? require('../assets/images/idle_monk.gif') // exchange with ape pics
              : apeState === 'talking'
              ? require('../assets/images/angry_talking_monk.gif')
              : apeState === 'thinking'
              ? require('../assets/images/thinking_monk.jpg')
              : require('../assets/images/eating_monk.gif')
          }
          style={styles.apeImage}
        />
      </View>
      <ScrollView style={styles.messagesContainer} ref={scrollViewRef}>
        {messages.map((msg, index) => (
          <Text key={index} style={msg.sender === 'user' ? styles.userMessage : styles.botMessage}>
            {msg.text}
          </Text>
        ))}
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          placeholder="Type a message..."
        />
        <Button title="Send" onPress={sendMessage} />
      </View>
      <Button title="Feed the Ape" onPress={handleFeed} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  apeContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  apeImage: {
    width: 150,
    height: 150,
  },
  speechBubble: {
    position: 'absolute',
    top: 10,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 5,
    borderWidth: 1,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  input: {
    flex: 1,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
  },
  messagesContainer: {
    flex: 1,
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#DCF8C6',
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
  },
  botMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#ECECEC',
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
  },
});

export default ChatScreen;
