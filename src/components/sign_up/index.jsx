    import { useForm } from "react-hook-form";
    import { useNavigate } from "react-router-dom";
    import axios from "axios";
    import {
        Center,
        FormControl,
        FormLabel,
        Input,
        Button,
        Text,
        Container,
        ButtonGroup,
        Grid,
        GridItem,
        useToast
    } from "@chakra-ui/react";
import { Link } from "react-router-dom";
export const Form = () => {
    const nawigate = useNavigate();
    const { register,
            handleSubmit, 
            watch, 
            reset, // formy maqrelu hmar 
            formState: { errors } 
            } = useForm({
                mode: "onBlur" // focusi depqum
            });

const toast = useToast();
const successToast =()=>{
   return toast({
        title: 'Account created.',
        description: "We've created your account for you.",
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
};
const errorToast =()=>{
    return toast({
         title: 'Sorry.',
         description: "This email already exists",
         status: 'error',
         duration: 3000,
         isClosable: true,
       });
 };
const onSignUp = async (data) => {

await axios.post("http://localhost:3001/sign_up", 
        {
            ...data
        })
        .then(function (response) {
            console.log(response);
            console.log('Sign up successful!');
            successToast();
            nawigate('/sign_in');
            reset();
          })
        .catch(function (error) {
            console.log('Email already exists ');
            errorToast();
        });
        
    };

    return (
        <Container  maxW="2xl" centerContent>
            <Text fontSize='6xl' mb="10">SIGN UP</Text>
            <form onSubmit={handleSubmit(onSignUp)}>
            <FormControl>
            <Grid w="360px" templateColumns='repeat(2, 1fr)' gap={6}>
                <GridItem>
                    <FormLabel >First Name</FormLabel>
                    <Input  w="200px"  placeholder="First Name"
                            p={7} 
                            {...register("firstName", 
                    { 
                        required: "First name is required",
                        minLength: {
                            value: 2,
                            message: "Name is not valid"
                        }
                    })} />
                    <Text color="tomato">{ errors?.firstName && errors?.firstName?.message}</Text>
                </GridItem>
                <GridItem w="100%"> 
                <FormLabel >Last Name</FormLabel>
                <Input w="200px" placeholder="Last Name"
                        p={7} 
                        {...register("lastName", 
                
                { 
                    required: "Last name is required",
                    minLength: {
                        value: 3,
                        message: "Last Name is not valid"
                    }
                })} />
                <Text color="tomato">{ errors?.lastName && errors?.lastName?.message}</Text>
                </GridItem>
                
                </Grid>
                <FormLabel >Email</FormLabel>
                <Input placeholder="Email"
                        w="100%" 
                        p={7} 
                        {...register("email", 
                {   
                    required: "Email is required",
                    pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, // emaili regexpy
                    message: "Invalid email address", // error massage
                },

                })} /><br></br>
                <Text color="tomato">{ errors?.email && errors?.email?.message}</Text><br></br>

                <FormLabel >Age</FormLabel>
                <Input placeholder="Age"
                        w="100%" 
                        type="number" 
                        p={7} {...register("age", 
                {   
                    required: "Age is required",
                })} /><br></br>       
                <Text color="tomato">{ errors?.age && errors?.age?.message}</Text><br></br> 


                <FormLabel >Password</FormLabel>
                <Input placeholder="Password"
                        w="100%" 
                        p={8} 
                        {...register("password", 
                {   
                    required: "Password is required",
                    minLength:{
                        value: 8,
                        message:"Password must be at least 8 characters"
                        }
                })} /><br></br>
                <Text color="tomato">{ errors?.password && errors?.password?.message}</Text><br></br> 

                <FormLabel >Confirm Password</FormLabel>
                <Input placeholder="Confirm Password" 
                        w="100%" 
                        p={8} 
                        type="password" {
                    ...register('confirmPassword',
                 { 
                    required: "password is required",
                    validate: (value) => value === watch('password') })} 
            /><br></br>
                <Text color="tomato">{ errors?.confirmPassword && "Passwords do not match"}</Text><br></br> 
               
                    <Center> 
                    <ButtonGroup>
                        <Button borderColor="#08BDA9" bg="#08BDA9" px={20} py={5} ><Link to="/sign_in">LOGIN</Link></Button>
                        <Button borderColor="#08BDA9" bg="#08BDA9" px={20} py={5} type="submit">SIGN UP</Button>
                    </ButtonGroup>
                    </Center>

            </FormControl>
        </form>
        </Container>
    );
    }