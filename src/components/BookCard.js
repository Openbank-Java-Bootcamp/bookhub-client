
//where it is author in a future maybe average mark

import { Link } from "react-router-dom";
import image from "../img/noimage.jpg"

function BookCard(props){

    return(

        <>
        <div className="card">
        <Link to={`/book/${props.book.id}`}>
            {props.book.volumeInfo.hasOwnProperty("imageLinks") ? 
            <div>
            <img src={props.book.volumeInfo.imageLinks.thumbnail} alt="book cover" />
            </div> : (
                <div>
                <img src={image} alt="book cover" />
                </div>
            )}
                <h3 className="title3">{props.book.volumeInfo.title}</h3>
            </Link>
        </div>
        </>
    )
}

export default BookCard;