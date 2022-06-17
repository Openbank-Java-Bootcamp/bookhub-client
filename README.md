# BOOK-HUB

## Description of the project

Book-hub is an app where the users can rate books. All the books are being provided by Google Books API, so the variety of those is quite extense. In addition, the user can save the book he/she likes under 3 different categories: READ (he has already read it), TBR (is planning on read it on the future) and READING (is currently reading it). When the last category is selected, the user must provided the page he/she is on, sho we can track his/her progress.

## Setup

```
npm start
```

## Technologies Used

The app was develop using react, html, js and css. 

As it was menting previously, to get books data we use: GOOGLE BOOKS API

All the remainding information, is being handle and saved by a backend develop by us (for more info check the repo: bookhub-server)

## Components and Pages structure

The app has the following pages:
1. LOG IN 
```
   /login
```
3. SIGN UP PAGE
```
   /singup
```
4. HOME PAGE

```
   /
```
Main page of the app with the book searcher bar. Inside it has the component BOOK CARD for display each book return in the search.

5. BOOK DETAIL PAGE
```
   /book/:id
```
View display after clicking a book in the previous one. 
It display some information about the book as well as the reviews. Here is also where u can add a book to your collection.
Inside it has 2 componenets:
    - RATING BOOK (to disply all the ratings
    - RATING BOX (to diplay each rating)
6. MY BOOKS PAGE
View where you can see all the books that you have save.
```
   /mybooks
```
Inside it has 3 componenets, for displaying the books on each category:
    - MY TBR 
    - MY READING
    - MY READ
Inside each of them there is the componenet: 
    -My Book (to display each book)
7. MY BOOK INFO PAGE
```
   /book/:id/info
```
Page diplay after clicking in a book on MY BOOK PAGE. It display title, added day, and options to change the status.

All the pages have the following component: 
1. NAVBAR
It has 3 bottons: LOGOUT (to login page), BOOK SEARCHER (to home page) and MY BOOKS (to my books page)
2. INANNON 
3. ISPRIVATE

These two last have security purposes.
## Demo
1. Login/sing up page:
![WhatsApp Image 2022-06-16 at 7 27 18 PM](https://user-images.githubusercontent.com/90968486/174151085-1e4afadc-a940-4583-a046-c4669c41ee23.jpeg)



2. HOME PAGE
![WhatsApp Image 2022-06-16 at 7 27 48 PM](https://user-images.githubusercontent.com/90968486/174151106-c84d6cb3-1511-4d6c-8437-f22175ea08f2.jpeg)



3.BOOK DETAIL (being log as maria)
![image](https://user-images.githubusercontent.com/90968486/174262714-4cfb86fa-bc47-48ad-a024-b1b98962134d.png)



4. My books page
![WhatsApp Image 2022-06-16 at 7 28 34 PM](https://user-images.githubusercontent.com/90968486/174151134-6c8f0c1e-655c-4082-8faa-62e4397a7bbe.jpeg)



5. Book info page
![WhatsApp Image 2022-06-16 at 7 28 51 PM](https://user-images.githubusercontent.com/90968486/174151154-67a492c3-278c-4ce8-9246-c8a92b1c10ea.jpeg)



## Future Work
At the moment, the proyect has all the require functionalities. For the future some great upgrades will be:
  1. Adding extra functionalities for bettering use experice like a searching bar on my books or filtering the reviews.
  2. Improving the desing. For example, on my book reading represent the percentaje of a book read by a loading bar.
## Resources
TRELLO:  https://trello.com/invite/b/gEJ2ohgh/b35d9deae2e779a8b9157d5887937e50/bookhub
