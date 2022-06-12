// src/pages/HomePage.js

import { useEffect, useState } from "react";
import BookCard from "../components/BookCard";
import Navbar from "../components/Navbar";
import axios from "axios";
import RatingBook from "../components/RatingsBook";
import book from "../samplebooks.json"


function HomePage() {
    const[search, setSearch] = useState("");
    //const[books, setBooks] = useState([]);
    const[books, setBooks] = useState([]);

  useEffect(() =>{
      setBooks(book.items);
      console.log(books);
  },[]);


    const handleSubmit =(e)=>{
        e.preventDefault();
        console.log("https://www.googleapis.com/books/v1/volumes?q="+{search}+"+&printType=books&orderBy=newest&maxResults=40&key=AIzaSyBTeJJInkrzrYGIkCEwOoXpEb8yAg6mln4");
        axios.get("https://www.googleapis.com/books/v1/volumes?q="+{search}+"+&printType=books&orderBy=newest&maxResults=40&key=AIzaSyBTeJJInkrzrYGIkCEwOoXpEb8yAg6mln4")
        .then((response) => setBooks(response.data.items))
        .catch((error) => console.log(error));
    }

    console.log(books);

    return (
      <div className="HomePage">
          <Navbar/>
          <div className="header">
            <h2>Looking for a book?</h2>
            <div className="search">
            <form  onSubmit={handleSubmit}>
                <input name="search" type="text" placeholder="Name of the book here"
                value={search} onChange={e => setSearch(e.target.value)} />
                <button type="summit">🔍</button>
            </form>
            </div>
            <hr className="division" />
            </div>
            <div className="container">
            {books.map((book) => (
                 <BookCard key={book.id} book={book} />
            ))}
            </div>
      </div>
    );
  }
  
  export default HomePage;