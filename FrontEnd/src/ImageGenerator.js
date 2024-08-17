import React, { useState } from 'react';
import axios from 'axios';
import { Container, TextField, Button, Grid, Typography, Box } from '@mui/material';

const ImageGenerator = () => {
  const [prompt, setPrompt] = useState('');
  const [name, setName] = useState('');
  const [rgbImage, setRgbImage] = useState(null);
  const [depthImage, setDepthImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('http://127.0.0.1:8000/generate', { prompt, name });
      setRgbImage(`data:image/jpeg;base64,${response.data.rgb_image}`);
      setDepthImage(`data:image/png;base64,${response.data.depth_image}`);
    } catch (error) {
      console.error('Error generating images:', error);
    }
    setLoading(false);
  };

  return (
    <Container maxWidth="md" sx={{ py: 5 }}>
      <Typography variant="h3" align="center" gutterBottom>
        AI Image (with Depth Map) Generator
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Prompt"
              variant="outlined"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Name"
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Box textAlign="center">
              <Button variant="contained" color="primary" type="submit" disabled={loading}>
                {loading ? 'Generating...' : 'Generate'}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
      {rgbImage && depthImage && (
        <Grid container spacing={2} justifyContent="center" sx={{ mt: 4 }}>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6" align="center">
              RGB Image
            </Typography>
            <Box display="flex" justifyContent="center">
              <img src={rgbImage} alt="RGB" style={{ width: '100%', maxWidth: '400px' }} />
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6" align="center">
              Depth Image
            </Typography>
            <Box display="flex" justifyContent="center">
              <img src={depthImage} alt="Depth" style={{ width: '100%', maxWidth: '400px' }} />
            </Box>
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default ImageGenerator;
