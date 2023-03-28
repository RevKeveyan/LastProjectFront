import { Center, Text } from "@chakra-ui/react";
import axios from "axios";
import { useEffect } from "react";
import { useParams } from 'react-router-dom';

export const Verify = () =>{
    const { data } = useParams();

    useEffect(() => {
        verifyUser();
    }, []);

    const verifyUser = async() =>{
        await axios.put(`http://localhost:3001/verify/${data}`) 
        .then((response) => {
                console.log(response);
          })
        .catch((error) =>{
            console.log(error);
        });
    }
    return (
        <>
            <Center mt={10}><Text fontSize='4xl'>Ur Account Verify</Text></Center>
        </>
    );
}