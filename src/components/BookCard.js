
//where it is author in a future maybe average mark

import { Link } from "react-router-dom";

function BookCard(props){

    return(
        <>
        <Link to={`/book/${props.book.id}`}>
        <div className="card">
            <img src={props.book.volumeInfo.imageLinks.smallThumbnail} alt="book cover" />
            <div className="button">
                <h3 className="title">{props.book.volumeInfo.title}</h3>
            </div>
        </div>
        </Link>
        </>
    )
}

export default BookCard;