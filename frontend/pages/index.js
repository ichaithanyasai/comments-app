import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {
  AppBar, Toolbar, Typography, Container, TextField, Button, List, Card, CardContent, Box, Paper, CircularProgress, Avatar
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import CommentIcon from '@mui/icons-material/Comment';
import axios from 'axios';
import { io } from 'socket.io-client';

const socket = io('http://localhost:5000');

export default function Home() {
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const username = localStorage.getItem('username');
    if (!username) {
      router.push('/login');
    } else {
      setIsAuthenticated(true);
    }

    const fetchComments = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/comments');
        setComments(response.data);
      } catch (error) {
        console.error('Failed to fetch comments:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchComments();

    socket.on('update-comments', (newComment) => {
      setComments((prev) => [newComment, ...prev]);
    });

    return () => {
      socket.off('update-comments');
    };
  }, [router]);

  const handleSubmit = () => {
    const username = localStorage.getItem('username');
    if (username && comment.trim()) {
      axios.post('http://localhost:5000/api/comments', { username, comment })
        .then(() => setComment(''))
        .catch(error => console.error('Failed to post comment:', error));
    } else {
      alert('Please enter a comment.');
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  if (!isAuthenticated) {
    return (
      <Container maxWidth="sm" style={{ textAlign: 'center', marginTop: '50px' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Please log in to view comments
        </Typography>
        <Button variant="contained" color="primary" onClick={() => router.push('/login')}>
          Login
        </Button>
        <Button variant="outlined" color="secondary" onClick={() => router.push('/register')} style={{ marginTop: '10px' }}>
          Register
        </Button>
      </Container>
    );
  }

  return (
    <div style={{ backgroundColor: '#f9f9f9', minHeight: '100vh' }}>
      <AppBar position="static">
        <Toolbar>
          <CommentIcon style={{ marginRight: '10px' }} />
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Real-Time Comments
          </Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md" style={{ marginTop: '30px' }}>
        <Paper elevation={3} style={{ padding: '30px', borderRadius: '15px' }}>
          <Typography variant="h5" component="h2" gutterBottom>
            Add a Comment
          </Typography>
          <TextField
            label="Comment"
            variant="outlined"
            margin="normal"
            fullWidth
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            multiline
            rows={4}
            style={{ marginBottom: '20px' }}
          />
          <Button 
            variant="contained" 
            color="primary" 
            fullWidth 
            onClick={handleSubmit}
            endIcon={<SendIcon />}
            style={{ padding: '10px 0', fontSize: '1rem' }}
          >
            Submit
          </Button>
        </Paper>
        <Box mt={4}>
          <Typography variant="h5" component="h2" gutterBottom>
            Comments
          </Typography>
          {loading ? (
            <Box textAlign="center" mt={3}>
              <CircularProgress />
            </Box>
          ) : (
            <List>
              {comments.map((comment, index) => (
                <Card key={index} style={{ marginBottom: '15px', borderRadius: '12px', backgroundColor: '#f0f4f8' }} elevation={2}>
                  <CardContent>
                    <Box display="flex" alignItems="center" marginBottom="10px">
                      <Avatar>{comment.username.charAt(0).toUpperCase()}</Avatar>
                      <Typography variant="h6" component="h3" style={{ marginLeft: '10px' }}>
                        {comment.username}
                      </Typography>
                    </Box>
                    <Typography variant="body1" style={{ marginBottom: '10px' }}>
                      {comment.comment}
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                      {formatTimestamp(comment.timestamp)}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </List>
          )}
        </Box>
      </Container>
    </div>
  );
}
