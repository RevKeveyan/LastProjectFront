import { Login } from "./components/sign_in";
import {Routes,Route} from "react-router-dom";
import { Form } from "./components/sign_up";
import { ChakraProvider } from "@chakra-ui/react";
import { AuthProvider } from "./authContext/AuthContext";
import { useEffect, useState } from "react";
import axios from "axios";
import { Profile } from "./components/profile/profile";
function App() {

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
