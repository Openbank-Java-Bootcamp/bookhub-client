import { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { AuthContext } from "../context/auth.context";
import axios from "axios";
import MyTBR from "../components/MyTBR";
import MyRead from "../components/MyRead";
import MyReading from "../components/MyReading";
const API_URL2 = "http://localhost:5005/api/books/";

function MyBooks(){
    const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
    const[loading, setLoading] = useState(true);


    return(
        <div>
            <Navbar />
           <div className="columnsbboks">
            <MyRead />
            <MyReading />
            <MyTBR />
            
           </div>
        </div>
    )
}

export default MyBooks;