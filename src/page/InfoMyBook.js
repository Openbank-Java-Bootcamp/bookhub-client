import { Link, Navigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";

function InfoMyBook(props){

    const{isbn} = useParams();

    const close = () =>{
        console.log("where are inside the close")
        Navigate(`/book/${isbn}`);
    }

    return(
        <>
        <Navbar />
     <div className="overlay">
        <div className="overlay-inner">
        <Link className="close" to={`/mybooks`}>❌</Link>
            <div className="inner-box">
            <button  className="summit-btn8" >Change Status</button>
            <p>WORK IN PROGRESS STILL</p>
            </div>
        </div>
     </div>   
     </>
    )
    
}

export default InfoMyBook;