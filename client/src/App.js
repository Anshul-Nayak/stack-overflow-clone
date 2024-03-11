import './App.css';
import {BrowserRouter as Router } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar';
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import AllRoutes from './AllRoutes'
import { fetchAllQuestions } from "./actions/question";
import { fetchAllUsers } from "./actions/users";
import logo from './assets/logo.png'
import ChatBot from "./components/Chatbot/ChatBot";
import chatbotIcon from './assets/chatbot-icon.png';

function App() {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false)
  const [isVerified, setIsVerified] = useState(false)
  useEffect(() => {
    dispatch(fetchAllQuestions());
    dispatch(fetchAllUsers());
  }, [dispatch]);

  return (
    <div className="App">
      <Router>
        <Navbar />
        <AllRoutes />
        {isOpen ? (
          <ChatBot
          setIsOpen={setIsOpen}
          setIsVerified={setIsVerified}
          isVerified={isVerified}
          />
         ) :
         <button
         className="open-chatbot"
         onClick={() => setIsOpen((prev) => !prev)} 
         >
          <img src={chatbotIcon} width="50" alt="icon" />
         </button>
        }
      </Router>
     
    </div>
  );
}

export default App;
