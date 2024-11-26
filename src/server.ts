import app from './app';

// getting-started.js
import mongoose from 'mongoose';
import config from './app/config';

// main().catch(err => console.log(err));
async function main() {
  try {
    await mongoose.connect(config.databaseUrl as string);

    app.listen(config.port, () => {
      console.log(
        `Example app listening on port ${config.port}, DB Connection successful`,
      );
    });
  } catch (error) {
    console.log(error);
  }
}

main();