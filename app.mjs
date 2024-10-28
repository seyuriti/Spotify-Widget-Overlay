import express from 'express';
import config from './src/config.mjs';
import appRouter from './src/routes/app.mjs';
import webRouter from './src/routes/web.mjs';

const app = express();

app.set('view engine', 'pug');
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(webRouter);
app.use(appRouter);

app.listen(config.port, '0.0.0.0', () => {
  console.log(`Server running on http://localhost:${config.port}`);
});