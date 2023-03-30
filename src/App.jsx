import { Login } from "./components/sign_in";
import {Routes,Route} from "react-router-dom";
import { Form } from "./components/sign_up";
import { ChakraProvider } from "@chakra-ui/react";
import { useAuth } from "./authContext/AuthContext";
import { ProfileUpdate } from "./components/profileUpdate/profileUpdate";
import { Menu } from "./components/menu";
import { Verify } from "./components/verify";
import { Profile } from "./components/profile";
function App() {

  const {user, updateUser} = useAuth();
  return (
        <ChakraProvider>
          <Menu/>
          <Routes> 
            <Route path="/sign_in" element={<Login/>}/> 
            <Route path="/sign_up" element={<Form/>}/> 
            <Route path="/verify/:data" element={<Verify/>}/> 
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
