import express from 'express';
import cors from 'cors';
import routes from './routes/index';
import './database/index';

const app = express();
const port = 3333 || process.env.PORT;
app.use(cors());
app.use(express.json());

app.use(routes);

app.get("/",(request, response) => {
  return response.send('iniciando backend');
})

app.listen(port, async () =>{
  console.log(`🏡 Backend started on ${port}!`);
});
