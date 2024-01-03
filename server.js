import mongoose from 'mongoose';
import app from './app.js';

const DB_HOST =
  'mongodb+srv://ArtemSa:t75rWRG2hlq0NkVO@cluster0.5zypk6j.mongodb.net/db-contacts?retryWrites=true&w=majority';

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(3000, () => {
      console.log('Database connection successful');
    });
  })
  .catch(error => {
    console.log(error.message);
    process.exit(1);
  });
