import { Button,Flex,Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react";
import axios from "axios";
import { usePost } from "../../../../postContext/postContext";

export const DeletePostModal = ({id})=>{
    const { isOpen, onOpen, onClose } = useDisclosure();
    const {posts, setPosts} = usePost();
    const deletePost = async () => {
        const token = localStorage.getItem('token');
        const config = {
                    headers: { Authentication: token,
                                id}
                    };
        const response = await axios.delete("http://localhost:3001/user/delete-post",config)
                    .then((response)=>{
                        console.log(response);
                        const newPosts =  posts.filter((elem) => elem._id !== id);
                        setPosts([...newPosts]);
                        onClose();
                    })
                    .catch((err)=>{
                        console.log(err);
                    });
    }


    return(
        <>
        <Button bg="#E53E3E" onClick={onOpen}>Delete</Button>
        <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
        <ModalHeader textAlign='center'>Are you sure</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
        <Flex mt={10}  minWidth='max-content' alignItems='center' justifyContent='space-between'>
            <Button borderColor="#08BDA9" bg="#08BDA9" px={20} py={5} onClick={deletePost}>Ok</Button>
            <Button borderColor="#E53E3E" bg="#E53E3E" px={20} py={5} onClick={onClose}>Cancel</Button>
        </Flex>
        </ModalBody>
           
        </ModalContent>
        </Modal>
        </>
    )
}

