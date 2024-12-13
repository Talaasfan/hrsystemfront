import React, { useState, useRef, useEffect } from 'react';
import { FaPaperclip, FaPaperPlane } from 'react-icons/fa';

const ChatInp = ({ isSidebarOpen, onNewChat, messages, setMessages }) => {
    const [text, setText] = useState('');
    const textareaRef = useRef(null);
    const fileInputRef = useRef(null);

    const handleChange = (e) => {
        setText(e.target.value);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const newMessages = [...messages, { user: 'user', text: `Sent a file: ${file.name}` }];
            setMessages(newMessages);
            // Simulate AI response
            setTimeout(() => {
                setMessages(prevMessages => [...prevMessages, { user: 'ai', text: 'This is an AI response.' }]);
            }, 1000);
        }
    };

    const handleAttachmentClick = () => {
        fileInputRef.current.click();
    };

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    }, [text]);

    const handleSend = () => {
        if (text.trim()) {
            const newMessages = [...messages, { user: 'user', text }];
            setMessages(newMessages);
            setText(''); 
            // Simulate AI response
            setTimeout(() => {
                setMessages(prevMessages => [...prevMessages, { user: 'ai', text: 'This is an AI response.' }]);
            }, 1000);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '90vh',
            paddingLeft: isSidebarOpen ? '250px' : '0',
            transition: 'padding-left 0.3s'
        }}>
            {messages.length === 0 && (
                <>
                    <p style={{ margin: '20px', fontSize: '18px', color: '#555' }}>What can I help with?</p>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        borderRadius: '25px',
                        border: '1px solid #ccc',
                        padding: '10px',
                        width: '80%',
                        backgroundColor: 'white'
                    }}>
                        <FaPaperclip onClick={handleAttachmentClick} style={{ marginRight: '10px', cursor: 'pointer' }} />
                        <input
                            type="file"
                            ref={fileInputRef}
                            style={{ display: 'none' }}
                            onChange={handleFileChange}
                        />
                        <textarea
                            ref={textareaRef}
                            value={text}
                            onChange={handleChange}
                            onKeyDown={handleKeyDown}
                            placeholder="Type your message..."
                            style={{
                                flex: 1,
                                border: 'none',
                                outline: 'none',
                                borderRadius: '25px',
                                padding: '10px',
                                resize: 'none',
                                overflow: 'hidden',
                                height: 'auto'
                            }}
                            rows={1}
                        />
                        <FaPaperPlane onClick={handleSend} style={{ marginLeft: '10px', cursor: 'pointer' }} />
                    </div>
                </>
            )}
            {messages.length > 0 && (
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    width: '80%',
                    transition: 'width 0.3s',
                    flexGrow: 1,
                    marginBottom: '20px'
                }}>
                    <div style={{
                        margin: '20px',
                        padding: '10px',
                        border: '1px solid #ccc',
                        borderRadius: '10px',
                        overflowY: 'auto',
                        width: '100%',
                        flexGrow: 1,
                        maxHeight: '70vh' 
                    }}>
                        {messages.map((message, index) => (
                            <div key={index} style={{
                                display: 'flex',
                                alignItems: 'center',
                                marginBottom: '10px'
                            }}>
                                <div style={{
                                    width: '40px',
                                    height: '40px',
                                    borderRadius: '50%',
                                    backgroundColor: message.user === 'user' ? '#007bff' : '#6c757d',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    color: 'white',
                                    marginRight: '10px'
                                }}>
                                    {message.user === 'user' ? 'U' : 'AI'}
                                </div>
                                <div style={{
                                    backgroundColor: message.user === 'user' ? '#e9f5ff' : '#f1f1f1',
                                    padding: '10px',
                                    borderRadius: '10px',
                                    maxWidth: '80%'
                                }}>
                                    {message.text}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        borderRadius: '25px',
                        border: '1px solid #ccc',
                        padding: '10px',
                        width: '100%',
                        backgroundColor: 'white' 
                    }}>
                        <FaPaperclip onClick={handleAttachmentClick} style={{ marginRight: '10px', cursor: 'pointer' }} />
                        <input
                            type="file"
                            ref={fileInputRef}
                            style={{ display: 'none' }}
                            onChange={handleFileChange}
                        />
                        <textarea
                            ref={textareaRef}
                            value={text}
                            onChange={handleChange}
                            onKeyDown={handleKeyDown}
                            placeholder="Type your message..."
                            style={{
                                flex: 1,
                                border: 'none',
                                outline: 'none',
                                borderRadius: '25px',
                                padding: '10px',
                                resize: 'none',
                                overflow: 'hidden',
                                height: 'auto'
                            }}
                            rows={1}
                        />
                        <FaPaperPlane onClick={handleSend} style={{ marginLeft: '10px', cursor: 'pointer' }} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChatInp;
