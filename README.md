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

```http
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
![image](https://user-images.githubusercontent.com/90968486/174052379-8899802f-a7ae-4341-83a7-2cc43a8f16f8.png)


2. HOME PAGE
![image](https://user-images.githubusercontent.com/90968486/174052504-df2cc8dd-ce4c-4d08-96d6-355907b03b55.png)


3.BOOK DETAIL (being log as maria)
![image](https://user-images.githubusercontent.com/90968486/174052822-d440a8e0-8861-4a40-b980-cf5d1f9b3fd6.png)


4. My books page
![image](https://user-images.githubusercontent.com/90968486/174053012-2b2fa6b1-8340-4746-b8b8-f166170b750d.png)


5. Book info page
![image](https://user-images.githubusercontent.com/90968486/174053052-6539b8be-48fd-4a08-902f-c7cbe19a0d39.png)



## Future Work
At the moment, the proyect has all the require functionalities. For the future some great upgrades will be:
  1. Adding extra functionalities for bettering use experice like a searching bar on my books.
  2. Improving the desing, for example, on my book reading represent the amount of a book read by a loeading bar.
## Resources
