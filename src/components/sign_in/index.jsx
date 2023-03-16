import { useForm } from "react-hook-form";
import {
    Center,
    FormControl,
    FormLabel,
    Input,
    Button,
    Text,
    Container,
    ButtonGroup,
} from "@chakra-ui/react";
import { useState } from "react";

export const Login = () => {
const { register,
        handleSubmit, 
        reset, // formy maqrelu hmar 
        formState: { errors } 
        } = useForm();


const login = () =>{

}
//   console.log(watch("example")); 

return (

    <Container  maxW="2xl" centerContent>
        <Text fontSize='6xl'>SIGN IN</Text>
        <form onSubmit={handleSubmit(login)}>
        <FormControl>
        
            <FormLabel >Email</FormLabel>
            <Input p={7} {...register("email", 
            {   
                required: "Email is incorrect",
                pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, // emaili regexpy
                message: "Invalid email address", // error massage
            },

            })} /><br></br>
            <Text color="tomato">{ errors?.email && errors?.email?.message}</Text><br></br>


            <FormLabel >Password</FormLabel>
            <Input p={8} {...register("password", 
            {   
                required: "Password is incorrect",
                minLength:{
                    value: 8,
                    message:"Password must be at least 8 characters"
                    }
            })} /><br></br>
            <Text color="tomato">{ errors?.password && errors?.password?.message}</Text><br></br> 

            
                <Center> 
                    <ButtonGroup>
                        <Button px={20} py={10} type="submit">Login</Button>
                        <Button px={20} py={10} >SIGN UP</Button>
                    </ButtonGroup>
                </Center>

        </FormControl>
    </form>

    </Container>

 
);
}