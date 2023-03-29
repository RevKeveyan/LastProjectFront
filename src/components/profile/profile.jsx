import {
    FormControl,
    FormLabel,
    Input,
    Button,
    Text,
    Container,
    Grid,
    GridItem,
    useToast,
    ModalBody,
    ModalCloseButton,
    ModalContent, 
    ModalHeader, 
    ModalOverlay, 
    useDisclosure,
    Modal,
    ModalFooter,
    ListItem,
    List,
    ButtonGroup,
    Center,
} from "@chakra-ui/react";

import { useForm } from "react-hook-form";
import axios from "axios";
import { useAuth } from "../../authContext/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export const Profile = () =>{
    const navigate = useNavigate();
    const {user, updateUser} = useAuth();
    const { register,
        handleSubmit, 
        watch, 
        reset, 
        formState: { errors },
        } = useForm({
            mode: "onBlur",
            defaultValues:{
                firstName: user.firstName,
                lastName: user.lastName,
                age: user.age
            }
        });
    const toast = useToast();
    const successToast =()=>{
        return toast({
                title: 'Account created.',
                description: "We've update your account.",
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
        };
    const errorToast =(message)=>{
        return toast({
            title: 'Sorry.',
            description: message,
            status: 'error',
            duration: 3000,
            isClosable: true,
        });
    };


    const userUpdate = async (data) => {
        if(data.firstName !== user.firstName || data.lastName !== user.lastName || +data.age !== user.age){
            const token = localStorage.getItem('token');
            const config = {
                        headers: { Authentication: token }
                      };
        const response = await axios.put("http://localhost:3001/update-user", {...data, email:user.email}, config)
          .then((response) => {
            console.log(response);
            localStorage.setItem('token', response.data.token);
            successToast();
            updateUser(response.data.user);
            reset();
          })
        .catch((error) => {
          errorToast(error.response.data.message);
        });
        }else{
            errorToast();
        }
      };
    
          
      const logOut = () =>{
        localStorage.removeItem('token');
        localStorage.removeItem('user');

        const request = axios.get("http://localhost:3001/logout");
        navigate('/sign_in');
        
    }

    return (
    <>
    <Container mt={10}>
    <Grid templateColumns='200px 420px' gap={6}>
    <GridItem>
    <List m={10}>
        <ListItem>{user.firstName +' '+ user.lastName}</ListItem>
        <ListItem>{user.age}</ListItem>
        <ListItem>{user.email}</ListItem>
    </List>
    </GridItem>
    <GridItem>
    <form onSubmit={handleSubmit(userUpdate)}>
        <FormControl>
            <Grid w="360px" templateColumns='repeat(2, 1fr)' gap={6}>
                <GridItem>
                <FormLabel >First Name</FormLabel>
                <Input border='1px' 
                        borderColor='black'  
                        w="200px"  
                        placeholder="First Name"
                        p={7} 
                        {...register("firstName", 
                {   
                    minLength: {
                        value: 2,
                        message: "Name is not valid"
                    }
                })} />
                <Text color="tomato">{ errors?.firstName && errors?.firstName?.message}</Text>
                </GridItem>
                <GridItem w="100%"> 
                <FormLabel >Last Name</FormLabel>
                <Input border='1px' 
                        borderColor='black' 
                        w="200px" 
                        placeholder="Last Name"
                        p={7} 
                        {...register("lastName", 
                
                {   
                    minLength: {
                        value: 3,
                        message: "Last Name is not valid"
                    }
                })} />
                <Text color="tomato">{ errors?.lastName && errors?.lastName?.message}</Text>
                </GridItem>
                
                </Grid>
                <FormLabel >Age</FormLabel>
                <Input border='1px' 
                        borderColor='black' 
                        placeholder="Age"
                        w="100%" 
                        type="number" 
                        p={7} {...register("age", 
                {   

                    min: {
                        value: 10,
                        message:'Age must be over 18'
                    },
                })} /><br></br>       
                <Text color="tomato">{ errors?.age && errors?.age?.message}</Text><br></br> 
                <Center> 
                    <Button borderColor="#08BDA9" bg="#08BDA9" px={10} py={5} type="submit">Save</Button>
                </Center>
        </FormControl>
    </form>
    <Center mt={5}> 
    <PasswordChangeModal user={user} successToast={successToast} errorToast={errorToast}/>
    <Button borderColor="#08BDA9" bg="#08BDA9" px={10} py={5} onClick={logOut}>Log out</Button>
    </Center> 
    </GridItem>
    </Grid>

    </Container>
    </>
    )
}

const PasswordChangeModal = ({user, successToast, errorToast})=>{
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { register,
        handleSubmit, 
        watch, 
        reset, 
        formState: { errors },
        } = useForm({
            mode: "onBlur"
        });
    const [validCode, setValidCode] = useState(false);

    

    const changePassword = async (data) => {
        if(validCode){
            setValidCode(false);
            const response = await axios.put("http://localhost:3001/change-user-password", {...data, email:user.email})
            .then((response) => {
            console.log(response);
            localStorage.setItem('token', response.data);
            successToast();
            reset();
            })
        .catch((error) => {
            console.error(error);
            errorToast(error.response.data.message);
            });
            
        }else{
            setValidCode(true);
            const response = await axios.put("http://localhost:3001/send-verify-code", {...data, email:user.email})
            .then((response) => {
            console.log(response);
            successToast();
            reset();

        })
        .catch((error) => { 
            console.error(error);
            errorToast(error.response.data.message);
            setValidCode(false);
        });
            

        }

    }




    return(
        <>
        <Button colorScheme='green' onClick={onOpen}>Cange Password</Button>
        <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
        <ModalHeader>Modal Title</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
        <form onSubmit={handleSubmit(changePassword)}>
        <FormControl>
        <FormLabel >Old Password</FormLabel>
            <Input placeholder="Old Password"
                    type="text"
                    w="100%" 
                    p={8} 
                    {...register("oldPassword", 
            {   
                required: "Old Password is required",
            })} /><br></br>
            <Text color="tomato">{ errors?.oldPassword && errors?.oldPassword?.message}</Text><br></br> 

            <FormLabel >Password</FormLabel>
            <Input placeholder="Password"
                    type="text"
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
            <FormLabel >Confirm Password</FormLabel>
            { validCode ?
            <><Input placeholder="Verify Code" 
                    w="100%" 
                    p={8} 
                    type="number" {
                ...register('verifyCode',
                {
                    required: "Verify code is required",
                    minLength:{
                            value: 4,
                            message: "Verify code is not valid"
                        }
                    })} 
            /><br></br>
            <Text color="tomato">{ errors?.confirmPassword && "Passwords do not match"}</Text><br></br></> : null }
            
            <ModalFooter>
                <Button colorScheme='red' mr={3} onClick={()=>{
                    onClose();
                    setValidCode(false);
                    }}>
                    Close
                </Button>
                <Button colorScheme='green' type="submit">Save changes</Button>
            </ModalFooter>
        </FormControl>
        </form>
        </ModalBody>
           
        </ModalContent>
        </Modal>
        </>
    )
}


// const VerifyCode = () =>{
//     const { isOpen, onOpen, onClose } = useDisclosure();
//     const { register,
//         handleSubmit, 
//         watch, 
//         reset, 
//         formState: { errors },
//         } = useForm({
//             mode: "onBlur"
//         });

//     return(
//         <>
//         <Button colorScheme='green' onClick={onOpen}>Save changes</Button>
//         <Modal isOpen={isOpen} onClose={onClose}>
//         <ModalOverlay />
//         <ModalContent>
//         <ModalHeader>Modal Title</ModalHeader>
//         <ModalCloseButton />
//         <ModalBody>
//         <form>
//         <FormControl>
//         <FormLabel >Old Password</FormLabel>
//             <Input placeholder="verifyCode"
//                     type="number"
//                     w="100%" 
//                     p={8} 
//                     {...register("verifyCode", 
//             {   
//                 required: "Code is required",
//                 minLength: {
//                             value: 4,
//                             message: "Verify code is not valid"
//                         }
//             })} /><br></br>
//             <ModalFooter>
//                 <Button colorScheme='red' mr={3} onClick={onClose}>
//                     Close
//                 </Button>
//                 <Button colorScheme='green' type="submit">Save changes</Button>
//             </ModalFooter>
//         </FormControl>
//         </form>
//         </ModalBody>
           
//         </ModalContent>
//         </Modal>
//         </>
//     );
// }