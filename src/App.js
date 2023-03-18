import { Login } from "./components/sign_in";
import {Routes,Route} from "react-router-dom";
import { Form } from "./components/sign_up";
import { ChakraProvider } from "@chakra-ui/react";

function App() {
  return (<>
      <ChakraProvider>
        <Routes> 
          <Route path="/sign_in" element={<Login />}/> 
          <Route path="/sign_up" element={<Form />}/> 
          <Route path="/*" element={<Login />}/> 
        </Routes>
      </ChakraProvider>
  </>
  );
}

export default App;
