import { Login } from "./components/sign_in";
import {Routes,Route} from "react-router-dom";
import { Form } from "./components/sign_up";
import { ChakraProvider } from "@chakra-ui/react";
import { AuthProvider } from "./authContext/AuthContext";
import { useEffect, useState } from "react";
import axios from "axios";
import { Profile } from "./components/profile/profile";
function App() {

    useEffect(()=>{
        getUser();
    },[]);

  
    // const {user, setUser} = useGlobalContext();

  const getUser = async () => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: { Authentication: token }
      };
      const response = await axios.get('http://localhost:3001/me', config);
      console.log(response.data);
      // setUser(response.data);
      return response.data;
    } catch (error) {
      throw error;
    }
  };


  return (
    <AuthProvider>
        <ChakraProvider>
          <Routes> 
            <Route path="/sign_in" element={<Login />}/> 
            <Route path="/sign_up" element={<Form />}/> 
            <Route path="/*" element={<Profile />}/> 
          </Routes>
        </ChakraProvider>
    </AuthProvider>
  );
}

export default App;
