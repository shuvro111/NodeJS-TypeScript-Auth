import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import routes from './hello/hello.routes';

dotenv.config();

const app = express();
app.use(cors());
const port = process.env.NODE_ENV === 'production' ? process.env.API_URL : 3001;

//configure routes
routes(app);

app.listen(port, () => console.log(`App is running on port ${port}`));
