import {createContext, useContext, useEffect, useState} from "react";
import axios  from 'axios';
const AuthContext = createContext();

const usePost = () => {
    return useContext(AuthContext);
}



const PostProvider = ({children}) =>{
    const [posts, setPosts] = useState([]);

    useEffect(()=>{
        getPosts();
    },[]);

    const getPosts = async () =>{
        const token = localStorage.getItem('token');
        const config = {
                    headers: { Authentication: token ,
                                }
                    };
        const response = await axios.get("http://localhost:3001/user/posts",config)
                    .then((response)=>{
                        console.log(response);
                        setPosts([...response.data.result]);
                    })
                    .catch((err)=>{
                        console.log(err);
                    });
    };

    return (
        <AuthContext.Provider value={{posts, setPosts}}>
            {children}
        </AuthContext.Provider>
    )
}

export {PostProvider , usePost}