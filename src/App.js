import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import IsAnon from './components/IsAnnon';
import SignupPage from './page/SingupPage';
import LoginPage from './page/LoginPage';
import HomePage from './page/HomePage';
import Navbar from './components/Navbar';
import BookDetail from './page/BookDetail';
import IsPrivate from './components/IsPrivate';
import MyBooks from './page/MyBooks';
import InfoMyBook from './page/InfoMyBook';

function App() {
  return (
    <div className="App">
       <Routes>
       <Route path="/" element={
          <IsPrivate>
       <HomePage />
       </IsPrivate>} />
        <Route
          path="/signup"
          element={
            <IsAnon>
              <SignupPage />
            </IsAnon>
          }
        />
        <Route
          path="/login"
          element={
            <IsAnon>
              <LoginPage />
            </IsAnon>
          }
        />
        <Route
          path="/book/:id"
          element={
            <IsPrivate>
              <BookDetail />
            </IsPrivate>
          }
        />
         <Route
          path="/mybooks"
          element={
            <IsPrivate>
              <MyBooks />
            </IsPrivate>
          }
        />
         <Route
          path="/book/:isbn/info"
          element={
            <IsPrivate>
              <InfoMyBook />
            </IsPrivate>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
