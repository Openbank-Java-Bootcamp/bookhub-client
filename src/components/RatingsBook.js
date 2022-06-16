import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import RatingBox from "./RatingBox";
const API_URL = "http://localhost:5005/api/ratings/";

function RatingBook(props) {

    const [bookId, setBookId] = useState(props.bookId);
    const[ratings, setRatings] = useState([]);
    const[loading, setLoading] = useState(true);
    const[points, setPoints] = useState(0);
    const[comment, setComment] = useState("");
    const[owner, setOwner] = useState(false);
    const[filter, setFilter] = useState("");
    const[check, setCheck] = useState(false);


    useEffect(() =>{
        getReviews();
    },[]);

    const getReviews = () =>{
        console.log("does get inside?");
        const storedToken = localStorage.getItem("authToken");
        axios.get(API_URL+bookId,  {
            headers: { Authorization: `Bearer ${storedToken}` },
          })
        .then((response) => {
            setRatings(response.data);
            setLoading(false);
        })
        .catch((error) => console.log(error));
    }

    const handlepoints = (e) => setPoints(e.target.value);
    const handleComment = (e) => setComment(e.target.value);

    const handleRevewSumit = (e) =>{
        e.preventDefault();
        var imagen = props.book.volumeInfo.imageLinks.smallThumbnail;
        var title = props.book.volumeInfo.title;
        var pages = props.book.volumeInfo.pageCount
        const requestBody = {bookId,points, comment, imagen, title, pages }
        const storedToken = localStorage.getItem("authToken");
        console.log(requestBody);
        // Send the token through the request "Authorization" Headers
        axios
          .post(API_URL, requestBody, {
            headers: { Authorization: `Bearer ${storedToken}` },
          })
          .then((response) => {
            // Reset the state
            setPoints(0);
            setComment("");
            getReviews();
          })
          .catch((error) => console.log(error));
    }

    const handleFilterChange = (e) =>{
        e.preventDefault();
        if(check){
        const ratingSort = ratings.slice().sort((a,b) => a.points - b.points);
        setRatings(ratingSort);
        }else{
            test();
        }
    }

    const test = () =>{
        getReviews();
    }

    return(
        <div className="rating-back">
            {loading ? <div>loading </div>
                :(
            <div>
                <label>
                ORDER BY POINTS: 
                <input type="checkbox" id="orderPoints" name="OrderPoints" value="OrderPoint" onChange={handleFilterChange} />
                </label>
            <div className="testimonial-box-container" >
            {ratings.map((rating) =>{
                return ( <RatingBox key={rating.id} rating={rating} refresh={test} />
                );
            })}
                </div>
                <div>
                    <h3 className="subtitle1">LEAVE YOUR REVEW! </h3>
                </div>
                <div className="YourRevew">
                <form onSubmit={handleRevewSumit}>
                    <label className="labelStars">How many ⭐?</label>
                    <input className="input-field2" type="number" name="points" min="1" max="5" value={points} onChange={handlepoints} />
                    <input placeholder="What are your thoughs about the book?" className="input-field2" type="text" name="comment" value={comment} onChange={handleComment} />
                    <button className="summit-btn2" type="submit">Leave My Review</button>
                    </form>
                </div>

            </div>
            )}
        </div>
    )
}

export default RatingBook;