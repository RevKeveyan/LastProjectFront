import { Login } from "./components/sign_in";
import {Routes,Route} from "react-router-dom";
import { Form } from "./components/sign_up";
import { ChakraProvider } from "@chakra-ui/react";
import { useAuth } from "./authContext/AuthContext";
import { ProfileUpdate } from "./components/profileUpdate/profileUpdate";
import { Menu } from "./components/menu";
import { Verify } from "./components/verify";
import { Profile } from "./components/profile";
import { Feed } from "./components/feed";
import Chat from "./components/messanger/inde.jsx"
import { useEffect, useState } from "react";
import io from 'socket.io-client';
import axios from "axios";

const URL = 'http://localhost:3001';
const socket = io(URL);


function App() {
  const {user, updateUser} = useAuth();
  const [from, setFrom] = useState([]);
  const [to, setTo] = useState([]);
  const [messages, setMessages] = useState(0)
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    function onConnect() {
      console.log("Connected");
    }

    function onMessage(message) {
      if(user._id === message.to._id)setMessages(count => count + 1);
      console.log("user._id>>",user._id);
      console.log("message.to>>",message.to);
      console.log("new message",message.message);
    }

    socket.on('connect', onConnect);
    socket.on('message', onMessage);
    
    getMessages();
    console.log(selectedUser);
    return () => {
      socket.off('connect', onConnect);
      socket.off('message', onMessage);
    };
  }, []);




 
  const getMessages = async () => {
    const token = localStorage.getItem("token");
    const config = {
      headers: { Authentication: token },
    };
    const data = {
      from: user._id,
      to: selectedUser?._id
    }

   
    const response = await axios
      .post("http://localhost:3001/chat-messages",data, config)
      .then((response) => {
        const getFrom = response.data.result.filter((msg,i)=>{
          return msg.from === selectedUser._id;
        })
        const getTo = response.data.result.filter((msg,i)=>{
          return msg.from === user._id;
        })
        
        setFrom([...getFrom]);
        setTo([...getTo]);
      })
      .catch((err) => {});
  }
  console.log(messages);

  return (
        <ChakraProvider>
          <Menu  messages={messages}/>
          <Routes> 
            <Route path="/sign_in" element={<Login/>}/> 
            <Route path="/sign_up" element={<Form/>}/> 
            <Route path="/verify/:data" element={<Verify/>}/> 
            <Route path="/feeds" element={<Feed/>}/> 
            <Route path="/messenger" element={<Chat to={to} from={from} getMessages={getMessages} setSelectedUser={setSelectedUser} selectedUser={selectedUser} setMessages={setMessages}/>}/>
            {JSON.stringify(user) !== '{}' ? <>
            <Route path="/*" element={<Profile/>}/> 
            <Route path="/profile-update" element={<ProfileUpdate/>}/>
            </> : 
            <Route path="/*" element={<Login/>}/>}
           
          </Routes>
        </ChakraProvider>
  );
}

export default App;
