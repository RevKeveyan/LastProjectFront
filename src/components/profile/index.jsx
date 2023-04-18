import { Avatar, Box,
        Button, Center,
        Container, Flex,
        FormControl, FormLabel,
        Heading, IconButton, 
        Input,Menu,
        MenuButton,
        MenuList,
        MenuItem,
        MenuItemOption,
        MenuGroup,
        MenuOptionGroup,
        MenuDivider, Spacer, Text,    
        Textarea, useToast, GridItem, Grid, Image } from '@chakra-ui/react';
import Av from '../../assets/img/av.jpg';
import { useForm } from "react-hook-form";
import { useAuth } from '../../authContext/AuthContext';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { DeletePostModal } from './modal/deleteModal';
import { UpdatePostModal } from './modal/updateModal';


export const Profile = () => {
    const avatar = JSON.parse(localStorage.getItem("user")).avatarUrl;
    const [file, setFile] = useState(null);
    const [posts, setPosts] = useState([]);
    const {user} = useAuth();
    const [showFrom, setShowForm] = useState(false);
    const {
        register,
        handleSubmit, 
        reset,
        formState: { errors } 
        } = useForm({
        });


    const toast = useToast();
    const successToast = () =>{
        return toast({
                title: 'Post created.',
                status: 'success',
                duration: 2000,
                isClosable: true,
            });
        };

    const errorToast =(message = 'Error')=>{
        return toast({
            title: 'Sorry.',
            description: message,
            status: 'error',
            duration: 3000,
            isClosable: true,
        });
    };

    const newPost = async (data) => {
        const token = localStorage.getItem('token');
        const formData = new FormData();
        formData.append('image', file);
        formData.append('title', data.title);
        formData.append('description', data.description);
        formData.append('createdAt', Date.now());
        const config = {
                    headers: { Authentication: token }
                    };
        const response = await axios.post("http://localhost:3001/user/new-post",formData,config)
        .then((response)=>{
            localStorage.setItem('Post', JSON.stringify(response.data.post));
            console.log(response);
            setPosts([...posts, response.data.post]);
            successToast();
            cancel();
            console.log(posts);
        })
        .catch((err)=>{
            errorToast(err.response.data.message);
        })
    }

    const cancel = () =>{
        setShowForm(false);
        reset();
    }

    useEffect(() => {

        getByIdPosts();

      }, []);
    
      const getByIdPosts = async () => {
        const token = localStorage.getItem("token");
        const config = {
          headers: { Authentication: token },
        };
        const response = await axios
          .get("http://localhost:3001/user/posts", config)
          .then((response) => {
            setPosts([...response.data.result]);
          })
          .catch((err) => {
          });
      };

    

    return (
        <Container >
        <Flex borderBottom ='1px' borderColor='black' mt={20} pb={2}>
            <Avatar src={`http://localhost:3001/${avatar}`} />
            <Box ml='4'>
                <Text fontWeight='bold'>
                    {`${user.firstName} ${user.lastName}`}
                </Text>
            <Text fontSize='sm'>{user.email}</Text>
            </Box>
            
        </Flex>
            <form onSubmit={handleSubmit(newPost)}>
                <FormControl  mt={10} mb={20} >
                    <FormLabel textAlign={'center'}>New Post</FormLabel>
                    <Input onClick={()=>{setShowForm(true)}}   placeholder="Title"
                         
                            {...register("title", 
                    { 
                        required: "Title name is required",
                        minLength: {
                            value: 2,
                            message: "Title is not valid"
                        }
                    })} />
                    <Text color="tomato">{ errors?.title && errors?.title?.message}</Text>
                    {showFrom ? <>
                    <Textarea mt={10} resize='none' placeholder='Here is a sample placeholder' 
                         {...register("description", 
                    { 
                        required: "Description name is required",
                        minLength: {
                            value: 10,
                            message: "Description is not valid"
                        },
                        maxLength: {
                            value: 255,
                            message: "Description is not valid"
                        }
                    })}
                    />
                     <Text color="tomato">{ errors?.description && errors?.description?.message}</Text>
                     <FormLabel textAlign={"center"}>Upload file</FormLabel>
                    <Input onChange={(e)=>setFile(e.target.files[0])} placeholder="File" type="file"/>
                    <Text color="tomato">
                    {errors?.file && errors?.file?.message}
                    </Text>
                    <Flex mt={10}  minWidth='max-content' alignItems='center' justifyContent='space-between'>
                        <Button borderColor="#08BDA9" bg="#08BDA9" px={20} py={5} type="submit">Post</Button>
                        <Button borderColor="#E53E3E" bg="#E53E3E" px={20} py={5} onClick={cancel}>Cancel</Button>
                    </Flex>
                    </>: null}
                </FormControl>
            </form>
            {posts.map(elem=>{
                return <Box pos='relative' mt={10} border='1px solid black' textAlign='center'key={elem._id} >
                    
                
                 
                    <Text color="tomato" height='50px' fontSize='2xl' borderBottom='1px solid black'>{elem.title}</Text>
                   
                    <Box pos="absolute"  top="0" right="0"> 
                    <Menu >
                    <MenuButton as={Button}>
                    ...
                    </MenuButton>
                    <MenuList>
                    <Flex maxWidth='100%' alignItems='center' flexDirection='column' justifyContent='space-between'>
                        <DeletePostModal setPosts={setPosts} posts={posts} id={elem._id}/>
                        <UpdatePostModal setPosts={setPosts} posts={posts} id={elem._id}/>
                    </Flex>
                   

                    </MenuList>
                    </Menu>
                    
                    </Box>  
                    <Image boxSize='200px' width='100%' objectFit='cover' src={`http://localhost:3001/${elem.imageUrl}`} alt='Post Image' />
                    <Text fontSize='3xl' height='auto' > {elem.description}</Text>
               
                </Box>
            })}
        </Container>
    );
}

