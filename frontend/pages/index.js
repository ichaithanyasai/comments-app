import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { AppBar, Toolbar, Typography, Container, TextField, Button, List, ListItem, ListItemText, Paper, Card, CardContent, CardActions, Box } from '@mui/material';
import axios from 'axios';
import { io } from 'socket.io-client';

const socket = io('http://localhost:5000');

export default function Home() {
  const [username, setUsername] = useState('');
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
    } else {
      setIsAuthenticated(true);
    }

    axios.get('http://localhost:5000/api/comments').then(response => setComments(response.data));

    socket.on('update-comments', newComment => {
      setComments(prev => [newComment, ...prev]);
    });

    return () => socket.off('update-comments');
  }, []);

  if (!isAuthenticated) {
    return (
      <Container maxWidth="sm">
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
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
            Real-Time Comments
          </Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md" style={{ marginTop: '20px' }}>
        <Paper style={{ padding: '20px' }}>
          <Typography variant="h5" component="h2" gutterBottom>
            Add a Comment
          </Typography>
          <TextField
            label="Username"
            variant="outlined"
            margin="normal"
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            label="Comment"
            variant="outlined"
            margin="normal"
            fullWidth
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <Button variant="contained" color="primary" fullWidth onClick={() => {
            axios.post('http://localhost:5000/api/comments', { username, comment });
            setComment('');
          }}>
            Submit
          </Button>
        </Paper>
        <Box mt={4}>
          <Typography variant="h5" component="h2" gutterBottom>
            Comments
          </Typography>
          <List>
            {comments.map((comment, index) => (
              <Card key={index} style={{ marginBottom: '10px' }}>
                <CardContent>
                  <Typography variant="h6" component="h3">
                    {comment.username}
                  </Typography> 
                  <Typography variant="body2" color="textSecondary">
                    {comment.comment}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </List>
        </Box>
      </Container>
    </div>
  );
}