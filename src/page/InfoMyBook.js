import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import axios from "axios";
const API_URL = "http://localhost:5005/api/bookuser/";
const API_URL2 = "http://localhost:5005/api/bookuser/status/";
const API_URL3 = "http://localhost:5005/api/books/pages/"

function InfoMyBook(props){

    const{id} = useParams();
    const[bookUserDetail, setBookUserDetail] = useState(null);
    const[loading, setLoading] = useState(true);
    const[readDone, setReadDone] = useState(0);
    const[seeForm, setSeeForm] = useState(false);
    const[pages, setPages] = useState(0);
    const[percentaje,setPercentaje] = useState(0);
    const[statusChange, setStatusChage] = useState(false);
    

    useEffect(() =>{
        getBookUserDetail();
    },[]);

    //get userbook
    const getBookUserDetail = () =>{
        const storedToken = localStorage.getItem("authToken");
        axios
        .get(API_URL+id, {
          headers: { Authorization: `Bearer ${storedToken}` },
        })
        .then((response) => {
          setBookUserDetail(response.data);
          setPages(response.data.numPages);
          setLoading(false);
          readpages();
        })
        .catch((error) => console.log(error));
    }

    //calculate percentaje read
    const readpages = () =>{
        if(bookUserDetail.status == "READING"){
          var percentageRead =  Math.trunc((bookUserDetail.numPages / bookUserDetail.book.pages)*100);
          return percentageRead;
        }
    }

    //patch status 
    const changeStatusRead = () =>{
        const storedToken = localStorage.getItem("authToken");
        const requestbody ={ "status": "READ"}
        axios.patch(API_URL2+id, requestbody, {
            headers: { Authorization: `Bearer ${storedToken}` },
          })
        .then((response) => {
            setStatusChage(true);
           
        })
        .catch((error) => console.log(error));
    }

    const changeStatusTBR = () =>{
        const storedToken = localStorage.getItem("authToken");
        const requestbody ={ "status": "TBR"}
        axios.patch(API_URL2+id, requestbody, {
            headers: { Authorization: `Bearer ${storedToken}` },
          })
        .then((response) => {
            setStatusChage(true);
        })
        .catch((error) => console.log(error));
    }

    const changeStatusReading = () =>{
        const storedToken = localStorage.getItem("authToken");
        const requestbody ={ "status": "READING"}
        axios.patch(API_URL2+id, requestbody, {
            headers: { Authorization: `Bearer ${storedToken}` },
          })
        .then((response) => {
            setStatusChage(true);
        })
        .catch((error) => console.log(error));
    }

    //hide and see form for patch pages
    const showForm = ()=>{
        if (seeForm){
            setSeeForm(false);
        }else{
            setSeeForm(true);
        }
    }

    //patch pages book
    const UpdatePages =(e) =>{
        e.preventDefault();
        const storedToken = localStorage.getItem("authToken");
        const requestbody ={ pages}
        axios.patch(API_URL3+id, requestbody, {
            headers: { Authorization: `Bearer ${storedToken}` },
          })
        .then((response) => {
            getBookUserDetail();
        })
        .catch((error) => console.log(error));

    }

    return(
        <div className="back">
        <Navbar />
     <div className="overlay">
        <div className="overlay-inner">
        <Link className="close" to={`/mybooks`}>X</Link>
        {!loading?
            <div className="inner-box">
                 {console.log(bookUserDetail)}
            <h2>{bookUserDetail.book.title}</h2>
            <h3>Was added: {bookUserDetail.dateAdd} </h3>

            {bookUserDetail.status == "READ" && 
            <div>
              <button  className="summit-btn8" onClick={changeStatusReading}>Reading again now 🦾!</button>  
              <button  className="summit-btn8" onClick={changeStatusTBR} >Reading again in the future 🚨!</button> 
               <p>{statusChange && "STATUS CHANGE SUSCESFULLY"}</p>
                </div>}
            {bookUserDetail.status == "TBR" && 
            <div>
              <button  className="summit-btn8" onClick={changeStatusReading} >Start reading it 🦾!</button>  
              <button  className="summit-btn8" onClick={changeStatusRead} >Ow, I read it already 🎉!</button> 
              <p>{statusChange && "STATUS CHANGE SUSCESFULLY"}</p>
                </div>}
            {bookUserDetail.status == "READING" && 
            <div>
                <div>
                    <h4>You have read {readpages()} % of the book so far !</h4>
                    <button  className="summit-btn8" onClick={showForm} >{!seeForm? "Update pages!" : "hide"}</button>
                    {seeForm? <div>
                        <form onSubmit={UpdatePages}>
                        <div className="inputReading">
                        <label className="labelStars">In which page are you?</label>
                        <input className="input-field6" min="1" max={bookUserDetail.book.pages} type="number" name="pagesRead" value={pages} onChange={(e) => setPages(e.target.value)} />
                        </div>
                        <button className="summit-btn6" type="submit">Update it!</button>
                        </form>
                        </div>
                    :(<div></div>)}
                </div>
              <button  className="summit-btn8" onClick={changeStatusTBR}>I stopped reading it 😢</button>  
              <button  className="summit-btn8" onClick={changeStatusRead} >Finish reading it 🎉!</button>
              <p>{statusChange && "STATUS CHANGE SUSCESFULLY"}</p>
                </div>}

            </div>
        :(<div>Loading</div>)}
        </div>
     </div>   
     </div>
    )
    
}

export default InfoMyBook;