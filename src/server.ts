import app from './app';

// getting-started.js
import mongoose from 'mongoose';
// import config from './app/config';
// eslint-disable-next-line @typescript-eslint/no-require-imports
require('dotenv').config();

// main().catch(err => console.log(err));
async function main() {
  try {
    await mongoose.connect(process.env.DB_URI as string);

    app.listen(process.env.PORT, () => {
      console.log(
        `Example app listening on port ${process.env.PORT}, DB Connection successful`,
      );
    });
  } catch (error) {
    console.log(error);
  }
}

main();