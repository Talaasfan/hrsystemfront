import './Home.css';
import SideBar from '../components/SideBar';
import ChatInp from '../components/ChatInp';
import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [savedChats, setSavedChats] = useState([]);
    const [currentMessages, setCurrentMessages] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    const handleSidebarToggle = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleNewChat = useCallback(() => {
        if (currentMessages.length > 0) {
            const newChat = { messages: currentMessages, date: new Date() };
            setSavedChats([...savedChats, newChat]);
            setCurrentMessages([]);
        }
    }, [currentMessages, savedChats]);

    const handleSelectChat = useCallback((chat) => {
        setCurrentMessages(chat.messages);
    }, []);

    const handleLogout = useCallback(() => {
        console.log('Logout button clicked');
        localStorage.removeItem('user');
        navigate('/'); 
    }, [navigate]);

    return (
        <div className='Home'>
            <section style={{ display: 'flex', justifyContent: 'space-between', padding: '20px' }}>
                <SideBar isOpen={isSidebarOpen} onToggle={handleSidebarToggle} onNewChat={handleNewChat} savedChats={savedChats} onSelectChat={handleSelectChat} onLogout={handleLogout} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            </section>
            <ChatInp isSidebarOpen={isSidebarOpen} onNewChat={handleNewChat} messages={currentMessages} setMessages={setCurrentMessages} />
        </div>
    );
}

export default Home;