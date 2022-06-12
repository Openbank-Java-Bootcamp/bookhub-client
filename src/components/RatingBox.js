import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth.context";
import axios from "axios";
const API_URL = "http://localhost:5005/api/ratings/";
const API_URL2 = "http://localhost:5005/api/rating/";

function RatingBox(props){
    console.log("Info pasada a ratingBook")
    console.log(props);

    const[numStars, setNumStarts] = useState([]);
    const { storeToken, authenticateUser, user } = useContext(AuthContext);
    const[owner, setOwner] = useState(false);
    const[seeForm, setSeeForm] = useState(false);
    const[comment, setComment] = useState(props.rating.comment);
    const[points, setPoints] = useState(props.rating.points);

    useEffect(() =>{
        starts();
        userIsOwner();
    },[]);

    const starts = () =>{
        var starts = [];
        for (let i = 0; i < points; i++){
            starts.push("");
        }
        setNumStarts(starts);
    }

    const userIsOwner =  () => {;
        if (user.email == props.rating.user.email){
            setOwner(true);
        }
    } 

    const deleteReview = () =>{
        const storedToken = localStorage.getItem("authToken");
        console.log(API_URL+props.rating.id);
        axios.delete(API_URL+props.rating.id,  {
            headers: { Authorization: `Bearer ${storedToken}` },
          })
        .then((response) => {
        })
        .catch((error) => console.log(error));
        props.refresh();
    }

    const showForm = () =>{
        if(seeForm) {
            setSeeForm(false);
        }else{
            setSeeForm(true);
        }
    }

    const editReview = (e) =>{
        e.preventDefault();
        const requestbody = {comment, points}
        const storedToken = localStorage.getItem("authToken");
        axios.patch(API_URL2+props.rating.id, requestbody, {
            headers: { Authorization: `Bearer ${storedToken}` },
          })
        .then((response) => {
        })
        .catch((error) => console.log(error));
        setSeeForm(false);
        props.refresh();
        starts();

    }

    return(
        <div>
            <div className="testimonial-box">
                <div className="box-top">
                    <div className = "profile">
                        <div className = "name-user">
                         <strong>{props.rating.user.name}</strong> 
                         <span>{props.rating.publicationDate}</span>  
                        </div>
                    </div>
                    <div className="reviews">
                        {numStars.map((star) =>{
                            return(
                                <i>⭐</i>
                            );
                        })}
                    </div>
                </div>
               <div className="client-comment">
                   <p>{comment}</p>
                </div> 
                {owner ?
                <div>
                 <div className="buttonReview">
                    <button className="summit-btn4" onClick={deleteReview}>delete</button>
                    <button className="summit-btn5" onClick={showForm}>{seeForm?"hideForm":"edit"}</button>
                    </div>
                    {seeForm?<div className="editReviewForm">
                        <form onSubmit={editReview}>
                        <label className="labelStars">How many ⭐?</label>
                        <input  className="input-field3" type="number" name="points" min="1" max="5" value={points} onChange={(e) => setPoints(e.target.value)} />
                        <label className="labelStars">Your thoughs about the book</label>
                        <input className="input-field3" type="text" name="comment" value={comment} onChange={(e) => setComment(e.target.value)} />
                        <button className="summit-btn6" type="submit">Modify</button>
                        </form>
                    </div> :(<div></div>)}
                    
                </div>
                :( <div></div>
                )}
            </div>
            
        </div>
    )

}

export default RatingBox;