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
    const[loading, setLoading] = useState(false);

    
  useEffect(() =>{
    setLoading(true);
    axios.get(`https://www.googleapis.com/books/v1/volumes?q=intitle:paula&printType=books&orderBy=newest&maxResults=12&key=AIzaSyBTeJJInkrzrYGIkCEwOoXpEb8yAg6mln4`)
    .then((response) => 
    {setBooks(response.data.items)
      console.log(response.data.items);
      console.log("booke start here")
      console.log(books);
      setLoading(false);
    })
    .catch((error) => console.log(error));
  },[]);



    const handleSubmit =(e)=>{
        e.preventDefault();
        setBooks([]);
        setLoading(true);
        console.log(`https://www.googleapis.com/books/v1/volumes?q=intitle:"+${search}+"&printType=books&orderBy=newest&maxResults=40&key=AIzaSyBTeJJInkrzrYGIkCEwOoXpEb8yAg6mln4`);
        axios.get(`https://www.googleapis.com/books/v1/volumes?q=intitle:${search}&printType=books&orderBy=newest&maxResults=12&key=AIzaSyBTeJJInkrzrYGIkCEwOoXpEb8yAg6mln4`)
        .then((response) => 
        {setBooks(response.data.items)
          console.log(response.data.items);
          console.log("booke start here")
          console.log(books);
          setLoading(false);
        })
        .catch((error) => console.log(error));
    }

    return (
      <div className="HomePage">
          <Navbar/>
          <div className="header">
            <h2 className="TITLE2">Looking for a book?</h2>
            <div >
            <form  onSubmit={handleSubmit}>
                <input className="search" name="search" type="text" placeholder="✨title✨"
                value={search} onChange={e => setSearch(e.target.value)} />
                <button className="search1" type="summit">🔍</button>
            </form>
            </div>
            </div>
              {loading? <div>loading</div>
              : <div className="container">
            {books.map((book) => (
                  <div>
                 <BookCard key={book.id} book={book} />
                 </div>
            ))}
            </div>
          }
      </div>
    );
  }
  
  export default HomePage;