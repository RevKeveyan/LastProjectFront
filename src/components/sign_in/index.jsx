import { useForm } from "react-hook-form";
import { useNavigate, Link} from "react-router-dom";
import {
    Center,
    FormControl,
    FormLabel,
    Input,
    Button,
    Text,
    Container,
    ButtonGroup,
    useToast,
} from "@chakra-ui/react";
import axios from "axios";

export const Login = () => {
    const toast = useToast();

    const successToast =()=>{
    return toast({
            title: 'Success.',
            status: 'success',
            duration: 3000,
            isClosable: true,
        });
    };
    const errorToast =()=>{
        return toast({
            title: 'Sorry.',
            description: "Email or password is incorrect",
            status: 'error',
            duration: 3000,
            isClosable: true,
        });
    };
    const navigate = useNavigate();
    const { register,
        handleSubmit, 
        reset, // formy maqrelu hmar 
        formState: { errors } 
        } = useForm();


    const signIn = async (data) => {
    await axios.post("http://localhost:3001/sign_in", data) 
            .then((response) => {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('user', JSON.stringify(response.data.user));
                successToast();
                reset();
              })
            .catch((error) =>{
                console.log(error);
                errorToast();
            });
        };
        
        // const getUser = async () => {
        //     try {
        //       const token = localStorage.getItem('token');
        //       const config = {
        //         headers: { Authentication: token }
        //       };
        //       const response = await axios.get('http://localhost:3001/me', config);
        //       console.log(response.data);
        //       return response.data;
        //     } catch (error) {
        //       throw error;
        //     }
        //   };
       
    return (
    <Container  maxW="2xl" centerContent>
        <Text fontSize='6xl'>SIGN IN</Text>
        <form onSubmit={handleSubmit(signIn)}>
        <FormControl>
        
            <FormLabel >Email</FormLabel>
            <Input placeholder="email" p={7} {...register("email", 
            {   
                required: "Email is incorrect",
                pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, // emaili regexpy
                message: "Invalid email address", // error massage
            },

            })} /><br></br>
            <Text color="tomato">{ errors?.email && errors?.email?.message}</Text><br></br>


            <FormLabel >Password</FormLabel>
            <Input placeholder="password" p={8} {...register("password", 
            {   
                required: "Password is incorrect",
                minLength:{
                    value: 8,
                    message:"Password must be at least 8 characters"
                    }
            })} /><br></br>
            <Text color="tomato">{ errors?.password && errors?.password?.message}</Text><br></br> 
                <Center> 
                    <ButtonGroup >
                        <Button borderColor="#08BDA9" bg="#08BDA9" px={20} py={5} type="submit">LOGIN</Button>
                        <Button borderColor="#08BDA9" bg="#08BDA9" px={20} py={5} ><Link to="/sign_up">SIGN UP</Link></Button>
                    </ButtonGroup>
                </Center>

        </FormControl>
    </form>

    </Container>

 
);
}