import { useState } from 'react';
import { Input } from '../src/ui/input';
import { Button } from '../src/ui/button';
import { Card, CardContent } from '../src/ui/card';

export default function ChatboxWidget() {
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const sendQuery = async () => {
    if (!query) return;
    setLoading(true);
    setMessages([...messages, { role: 'user', text: query }]);
    try {
      //const res = await fetch('https://diyasmartchatbot.onrender.com', {
      const res = await fetch('http://localhost:8000/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: query }),
      });
      const data = await res.json();
      setMessages(prev => [...prev, { role: 'bot', text: data.answer }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'bot', text: 'Error connecting to chatbot.' }]);
    }
    setQuery('');
    setLoading(false);
  };

  return (
    <div style={styles.widget}>
      <div style={styles.header}>Ask DIYA</div>
      <div style={styles.chatArea}>
        {messages.map((msg, i) => (
          <div key={i} style={msg.role === 'user' ? styles.userMsg : styles.botMsg}>
            {msg.text}
          </div>
        ))}
      </div>
      <div style={styles.inputArea}>
        <input
          style={styles.input}
          placeholder="Type your question..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendQuery()}
          disabled={loading}
        />
        <button style={styles.button} onClick={sendQuery} disabled={loading}>
          Send
        </button>
      </div>
    </div>
  );
}

const styles = {
  widget: {
    position: 'fixed',
    bottom: '16px',
    right: '16px',
    width: '300px',
    border: '1px solid #ccc',
    borderRadius: '12px',
    backgroundColor: 'white',
    boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
    fontFamily: 'sans-serif',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    zIndex: 9999
  },
  header: {
    backgroundColor: '#1e40af',
    color: 'white',
    padding: '10px',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  chatArea: {
    padding: '10px',
    maxHeight: '200px',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
    fontSize: '14px',
  },
  userMsg: {
    alignSelf: 'flex-end',
    backgroundColor: '#dbeafe',
    padding: '6px 10px',
    borderRadius: '8px',
  },
  botMsg: {
    alignSelf: 'flex-start',
    backgroundColor: '#f3f4f6',
    padding: '6px 10px',
    borderRadius: '8px',
  },
  inputArea: {
    display: 'flex',
    borderTop: '1px solid #eee',
  },
  input: {
    flex: 1,
    border: 'none',
    padding: '10px',
    fontSize: '14px',
    outline: 'none',
  },
  button: {
    border: 'none',
    backgroundColor: '#1e40af',
    color: 'white',
    padding: '10px 12px',
    cursor: 'pointer',
  },
};
