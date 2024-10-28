import { Router } from "express";
import config from "../config.mjs";

const router = Router();

router.get('/', (req, res) => {
  res.render('pages/home');
});

router.get('/validation', (req, res) => {
  const error = req.query.error || null;
  const success = req.query.success || null;
  
  const options = { error, success };

  res.render('pages/validation', options);
});

router.get('/settings', (req, res) => {
  const options = {
    clientId: config.clientId,
    clientSecret: config.clientSecret,
    redirectUri: config.redirectUri,
    port: config.port,
    scope: config.scope
  };

  res.render('pages/settings', options);
});

export default router;