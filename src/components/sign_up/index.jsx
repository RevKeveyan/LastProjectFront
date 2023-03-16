    import { useForm } from "react-hook-form";
    import { v4 as uuidv4 } from 'uuid';
    import {
        Center,
        FormControl,
        FormLabel,
        Input,
        Button,
        Text,
        Container,
        ButtonGroup
    } from "@chakra-ui/react";
import { useState } from "react";

export const From = () => {
    const [newUser, setNewUser] = useState({})
    const { register,
            handleSubmit, 
            watch, 
            reset, // formy maqrelu hmar 
            formState: { errors } 
            } = useForm({
                mode: "onBlur" // focusi depqum
            });

    const onSubmit = data => {
        setNewUser({
            id: uuidv4(),
            ...data
        });
        console.log(newUser); 

        reset();
    };

    //   console.log(watch("example")); 

    return (
        <Container  maxW="2xl" centerContent>
            <Text fontSize='6xl'>SIGN UP</Text>
            <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl>
                <FormLabel >First Name</FormLabel>
                <Input p={7} {...register("firstName", 
                { 
                    required: "First name is required",
                    minLength: {
                        value: 2,
                        message: "Name is not valid"
                    }
                })} /><br></br>
                <Text color="tomato">{ errors?.firstName && errors?.firstName?.message}</Text><br></br>

                <FormLabel >Last Name</FormLabel>
                <Input p={7} {...register("lastName", 
                
                { 
                    required: "Last name is required",
                    minLength: {
                        value: 3,
                        message: "Last Name is not valid"
                    }
                })} /><br></br>
                
                <Text color="tomato">{ errors?.lastName && errors?.lastName?.message}</Text><br></br>

                <FormLabel >email</FormLabel>
                <Input p={7} {...register("email", 
                {   
                    required: "Email is required",
                    pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, // emaili regexpy
                    message: "Invalid email address", // error massage
                },

                })} /><br></br>
                <Text color="tomato">{ errors?.email && errors?.email?.message}</Text><br></br>

                <FormLabel >Age</FormLabel>
                <Input type="number" p={7} {...register("age", 
                {   
                    required: "Age is required",
                })} /><br></br>       
                <Text color="tomato">{ errors?.age && errors?.age?.message}</Text><br></br> 

                {/* <FormLabel>Select Gender<br></br>
                    <Radio  name="gender" type="radio" value="male"/>Male
                    <Radio  name="gender" type="radio" value="female"/> Female
                </FormLabel>   */}

                <FormLabel >Password</FormLabel>
                <Input p={8} {...register("password", 
                {   
                    required: "Password is required",
                    minLength:{
                        value: 8,
                        message:"Password must be at least 8 characters"
                        }
                })} /><br></br>
                <Text color="tomato">{ errors?.password && errors?.password?.message}</Text><br></br> 

                <FormLabel >Confirm Password</FormLabel>
                <Input p={8} type="password" {
                    ...register('confirmPassword',
                 { 
                    required: "password is required",
                    validate: (value) => value === watch('password') })} 
            /><br></br>
                <Text color="tomato">{ errors?.confirmPassword && "Passwords do not match"}</Text><br></br> 
               
                    <Center> 
                    <ButtonGroup>
                        <Button px={20} py={10} >Login</Button>
                        <Button px={20} py={10} type="submit">SIGN UP</Button>
                    </ButtonGroup>
                    </Center>

            </FormControl>
        </form>
        </Container>
    );
    }