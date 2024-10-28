import { Router } from "express";
import config from "../config.mjs";
import { generateRandomString } from "../utils/index.mjs";

const router = Router();

router.get('/login', (req, res) => {
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

router.get('/callback', async (req, res) => {
  const code = req.query.code || null;
  const state = req.query.state || null;
  const error = req.query.error || null;

  let err = null;
  if (state === null) err = 'state_mismatch';
  else if (error !== null) err = 'access_denied';
  else if (code === null) err = 'no_code';
  if (err !== null)
    return res.redirect('/validation?' + new URLSearchParams({ error: err }));

  let authOptions = {
    method: 'POST',
    body: new URLSearchParams({
      code,
      redirect_uri: config.redirectUri,
      grant_type: 'authorization_code'
    }),
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + (new Buffer.from(config.clientId + ':' + config.clientSecret).toString('base64'))
    },
    json: true
  };

  try {
    const response = await fetch('https://accounts.spotify.com/api/token', authOptions);
    const data = await response.json();

    if (data.error)
      return res.redirect('/validation?' + new URLSearchParams({ error: data.error }));
    config.auth = data;
    res.redirect('/validation?' + new URLSearchParams({ success: 'true' }));
  }
  catch (e) {
    console.error(e);
    res.redirect('/validation?' + new URLSearchParams({ error: 'invalid_token' }));
  }
});


export default router;