import express from 'express';
import { request } from 'express';
import config from './src/config.mjs';
import { generateRandomString } from './src/utils/index.mjs';

const app = express();

app.get('/validation', (req, res) => {
  const error = req.query.error || null;

  if (error === null){
    res.status(200).send('Data stored successfully');
  }
  
  if (error === 'state_mismatch') {
    res.status(400).send('State mismatch error');
  }
  else if (error === 'access_denied') {
    res.status(403).send('Access denied error');
  }
  else {
    res.status(400).send('Unknown error');
  }
})

app.get('/login', (req, res) => {
  const state = generateRandomString(16);
  const scope = config.scope;

  res.redirect('https://accounts.spotify.com/authorize?' +
    new URLSearchParams({
      response_type: 'code',
      client_id: config.clientId,
      scope,
      redirect_uri: config.redirectUri,
      state
    })
  );
});

app.get('/callback', async (req, res) => {
  const code = req.query.code || null;
  const state = req.query.state || null;
  const error = req.query.error || null;

  if (state === null) {
    res.redirect('/validation?' +
      new URLSearchParams({
        error: 'state_mismatch'
      })
    );
  }
  else if (error !== null) {
    res.redirect('/validation?' +
      new URLSearchParams({
        error: 'access_denied'
      })
    );
  }
  else {
    let authOptions = {
      form: {
        code: code,
        redirect_uri: config.redirectUri,
        grant_type: 'authorization_code'
      },
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + (new Buffer.from(config.clientId + ':' + config.clientSecret).toString('base64'))
      },
      json: true
    };

    await fetch('https://accounts.spotify.com/api/token', authOptions)
      .then(response => {
        console.log(response)
        return response.json()
      })
      .then(data => {
        res.status(200).send(data);
      })
      .catch(err => {
        res.status(400).send(err);
      });
  }
});

app.listen(config.port, '0.0.0.0', () => {
  console.log(`Server running on ( http://localhost:${config.port} | http://127.0.0.1:${config.port} )`);
});