import express from 'express';
import config from './src/config.mjs';
import { generateRandomString } from './src/utils/index.mjs';

const app = express();

app.set('view engine', 'pug');
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.render('pages/home');
});

app.get('/validate', (req, res) => {
  const error = req.query.error || null;

  if (error) { res.send(`Error: ${error}`); }
});

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

  if (state === null)
    return res.redirect('/validate?' + new URLSearchParams({ error: 'state_mismatch' }));
  else if (error !== null)
    return res.redirect('/validate?' + new URLSearchParams({ error: 'access_denied' }));
  else if (code === null)
    return res.redirect('/validate?' + new URLSearchParams({ error: 'code_not_found' }));
  
  let authOptions = {
    method: 'POST',
    body: new URLSearchParams({
      code: code,
      redirect_uri: config.redirectUri,
      grant_type: 'authorization_code'
    }),
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + (new Buffer.from(config.clientId + ':' + config.clientSecret).toString('base64'))
    },
    json: true
  };

  const data = await fetch('https://accounts.spotify.com/api/token', authOptions).json();
  if (data.error)
    fetch('/validate?' + new URLSearchParams({ error: data.error }));
  else {
  }
});

app.listen(config.port, '0.0.0.0', () => {
  console.log(`Server running on ( http://localhost:${config.port}/login )`);
});