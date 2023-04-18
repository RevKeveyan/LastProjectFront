import {
  Avatar,
  Box,
  Button,
  Container,
  Flex,
  Grid,
  Image,
  Menu,
  MenuButton,
  MenuList,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../../authContext/AuthContext";
// import { DeletePostModal } from "../profile/modal/deleteModal";
// import { UpdatePostModal } from "../profile/modal/updateModal";

export const Feed = () => {
  const [feeds, setFeeds] = useState([]);
  const [likes, setLikes] = useState([]);
  const { user, updateUser } = useAuth();

  useEffect(() => {
    getFeeds();
  }, []);

  const getFeeds = async () => {
    const token = localStorage.getItem("token");
    const config = {
      headers: { Authentication: token },
    };
    const response = await axios
      .get("http://localhost:3001/feeds", config)
      .then((response) => {
        setFeeds([...response.data.result]);
      })
      .catch((err) => {});
  };

  const likePost = (postId) => {
    const index = feeds.findIndex((elem) => elem._id === postId);
    const feed = feeds.find((elem) => elem._id === postId);
    if (!feed.likes.includes(user._id)) {
      const newFeed = {
        ...feed,
        likes: [...likes, user._id],
      };
      feeds.splice(index, 1, newFeed);
      setFeeds([...feeds]);
    } else {
      const newFeed = {
        ...feed,
        likes: likes.filter((elem) => elem !== user._id),
      };
      feeds.splice(index, 1, newFeed);
      setFeeds([...feeds]);
    }

    const token = localStorage.getItem("token");
    const config = {
      headers: { Authentication: token },
    };

    const response = axios
      .put("http://localhost:3001/post/like", { postId }, config)
      .then((result) => {})
      .catch((err) => {
        const feed = feeds.find((elem) => elem._id === postId);
        if (feed.likes.includes(user._id)) {
          const newFeed = {
            ...feed,
            likes: [...likes, user._id],
          };
          feeds.splice(index, 1, newFeed);
          setFeeds([...feeds]);
        } else {
          const newFeed = {
            ...feed,
            likes: likes.filter((elem) => elem !== user._id),
          };
          feeds.splice(index, 1, newFeed);
          setFeeds([...feeds]);
        }
      });
  };

  return (
    <Container>
      {feeds.map((elem, i) => {
        return (
          <Box
            key={elem._id}
            pos="relative"
            mt={10}
            border="1px solid black"
            textAlign="center"
            key={elem._id}
          >
            <Flex borderBottom="1px" borderColor="black" pb={2}>
              <Avatar src={`http://localhost:3001/${elem.userImg}`} />
              <Box ml="4">
                <Text fontWeight="bold">
                  {`${elem.userName} ${elem.userLastName}`}
                </Text>
              </Box>
            </Flex>
            <Text
              color="tomato"
              height="50px"
              fontSize="2xl"
              borderBottom="1px solid black"
            >
              {elem.title}
            </Text>

            {/* <Box pos="absolute" top="0" right="0">

            </Box> */}
            {elem.imageUrl ? (
              <Image
                boxSize="200px"
                width="100%"
                objectFit="cover"
                src={`http://localhost:3001/${elem.imageUrl}`}
                alt="Post Image"
              />
            ) : null}
            <Text fontSize="3xl" height="auto">
              {elem.description}
            </Text>
            <Flex alignItems="center">
              <Image
                cursor="pointer"
                onClick={() => likePost(elem._id)}
                boxSize="30px"
                m={1}
                src={`http://localhost:3001/${
                  elem.likes.length > 0
                    ? "images\\liked.png"
                    : "images\\like.png"
                } `}
                alt="Post Image"
              />
              <Text> {elem.likes.length > 0 ? elem.likes.length : null}</Text>
            </Flex>
          </Box>
        );
      })}
    </Container>
  );
};
