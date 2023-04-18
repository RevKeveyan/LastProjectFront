import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";

export const UpdatePostModal = ({posts, setPosts, id }) => {
  const [file, setFile] = useState(null);
  const post = posts.filter((elem) => elem._id === id);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: post[0].title,
      description: post[0].description,
    },
  });
  const { isOpen, onOpen, onClose } = useDisclosure();

  const updatePost = async (data) => {
    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append('image', file);
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('updatedAt', Date.now());
    formData.append('id', id);
    const config = {
      headers: { Authentication: token },
    };
    const response = await axios
      .put("http://localhost:3001/user/update-post", formData, config)
      .then((response) => {
        const newPosts = posts.filter((elem) => elem._id !== id);
        setPosts([...newPosts, response.data.updatedPost]);
        onClose();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Button bg="#08BDA9" onClick={onOpen}>
        Update
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirm changes</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmit(updatePost)}>
              <FormControl mt={10} mb={20}>
                <FormLabel textAlign={"center"}>Update Post</FormLabel>
                <Input
                  placeholder="Title"
                  {...register("title", {
                    required: "Title name is required",
                    minLength: {
                      value: 2,
                      message: "Title is not valid",
                    },
                  })}
                />
                <Text color="tomato">
                  {errors?.title && errors?.title?.message}
                </Text>
                <Textarea
                  mt={10}
                  resize="none"
                  placeholder="Here is a sample placeholder"
                  {...register("description", {
                    required: "Description name is required",
                    minLength: {
                      value: 10,
                      message: "Description is not valid",
                    },
                    maxLength: {
                      value: 255,
                      message: "Description is not valid",
                    },
                  })}
                />
                <Text color="tomato">
                  {errors?.description && errors?.description?.message}
                </Text>
                <FormLabel textAlign={"center"}>Upload file</FormLabel>
                <Input onChange={(e)=>setFile(e.target.files[0])} placeholder="File" type="file"/>
                <Text color="tomato">
                  {errors?.file && errors?.file?.message}
                </Text>
                <Flex
                  mt={10}
                  minWidth="max-content"
                  alignItems="center"
                  justifyContent="space-between"
                >
                
                  <Button
                    borderColor="#08BDA9"
                    bg="#08BDA9"
                    px={20}
                    py={5}
                    type="submit"
                  >
                    Save
                  </Button>
                  <Button borderColor="#E53E3E" bg="#E53E3E" px={20} py={5}>
                    Cancel
                  </Button>
                </Flex>
              </FormControl>
            </form>
          </ModalBody>
          {/* <ModalFooter >
        <Flex mt={10}  minWidth='max-content' alignItems='center' justifyContent='space-between'>
            <Button borderColor="#08BDA9" bg="#08BDA9" px={20} py={5}>Ok</Button>
            <Button borderColor="#E53E3E" bg="#E53E3E" px={20} py={5}>Cancel</Button>
        </Flex>
        </ModalFooter> */}
        </ModalContent>
      </Modal>
    </>
  );
};
