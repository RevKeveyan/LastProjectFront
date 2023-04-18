import { Avatar, Box, Button, Container, Flex, FormControl, Input, Text } from '@chakra-ui/react';
import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';

const URL = 'http://localhost:3001';
const socket = io(URL);

const Chat = ({selectedUser, setSelectedUser, to, from, setMessages}) => {

  const [input, setInput] = useState('');
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  useEffect(() => {
    getUsers();
  }, [selectedUser]);

  const getUsers = async () => {
    const token = localStorage.getItem("token");
    const config = {
      headers: { Authentication: token },
  };
  const response = await axios
    .get("http://localhost:3001/users?page=1", config)
    .then((response) => {
      console.log(response);
      setUsers([...response.data.users]);
    })
    .catch((err) => {});
  }

 


  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const handleUserClick = (user) => {
    setSelectedUser(user);
    setMessages(0);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (input.trim() !== '') {
      socket.emit('message', { to: {...selectedUser,createdAt:Date.now()},from:user._id, message: input });
      setInput('');
    }
  }
  return (
    <Container border='1px solid black'> 
      <Box position='fixed' top='0' left='10%' padding={20}>
        <ul>
          {users.map((user, i) => (
            <Flex key={i} borderBottom ='1px' borderColor='black' pb={2} mb={3} onClick={() => handleUserClick(user)}>
              <Avatar src={`http://localhost:3001/${user.avatarUrl}`} />
              <Box ml='4'>
                <Text fontWeight='bold'>
                  {`${user.firstName} ${user.lastName}`}
                </Text>
              </Box>
            </Flex>
          ))}
        </ul>
      </Box>
      {selectedUser && (
        <Box>
          <Text fontWeight='bold'>Chatting with {`${selectedUser.firstName} ${selectedUser.lastName}`}</Text>
          <Flex ml={20} justifyContent='space-between'>
            <Box >
              {from.map((message, index) => (
                <Text key={index}>{message.message}</Text>
              ))}
            </Box>
            <Box >
              {to.map((message, index) => (
                <Text key={index}>{message.message}</Text>
              ))}
            </Box>
          </Flex>
          <form onSubmit={handleFormSubmit}>
            <FormControl display='flex'>
              <Input type="text" value={input} onChange={handleInputChange} />
              <Button type="submit">Send</Button>
            </FormControl>
          </form>
        </Box>
      )}
    </Container>
  );
};

export default Chat;
