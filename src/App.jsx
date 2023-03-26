import { Login } from "./components/sign_in";
import {Routes,Route} from "react-router-dom";
import { Form } from "./components/sign_up";
import { ChakraProvider } from "@chakra-ui/react";
import { useAuth } from "./authContext/AuthContext";
import { Profile } from "./components/profile/profile";
import { Menu } from "./components/menu";
import { Verify } from "./components/verify";
function App() {

  const {user, updateUser} = useAuth();
  console.log(user);
  return (
        <ChakraProvider>
          <Menu/>
          <Routes> 
            <Route path="/sign_in" element={<Login/>}/> 
            <Route path="/sign_up" element={<Form/>}/> 
            <Route path="/verify/:email" element={<Verify/>}/> 
            {JSON.stringify(user) !== '{}' ? <><Route path="/*" element={<Profile/>}/> 
            <Route path="/profile" element={<Profile/>}/></> : <Route path="/*" element={<Login/>}/>}
          </Routes>
        </ChakraProvider>
  );
}

export default App;
