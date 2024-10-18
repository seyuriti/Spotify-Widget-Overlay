import express from 'express';
import config from './src/config.mjs';
import { generateRandomString } from './src/utils/index.mjs';

const app = express();

app.get('/login', () => {
  const state = generateRandomString(16);
  
});

app.post('/callback', (req, res) => {

});

app.listen(config.port, '0.0.0.0', () => {
  console.log(`Server running on ( http://localhost:${config.port} | http://127.0.0.1:${config.port} )`);
});