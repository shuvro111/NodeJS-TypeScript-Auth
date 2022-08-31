/* eslint-disable no-console */
import 'reflect-metadata';
import { AppDataSource } from './config/ormconfig';
import { createApp } from './utils/createApp';
const port = process.env.NODE_ENV === 'production' ? process.env.API_URL : 3001;

const main = async () => {
  console.log(`Running application in ${process.env.NODE_ENV} mode.`);
  try {
    const app = createApp();
    AppDataSource.initialize()
      .then(async () => {
        app.listen(port, () =>
          console.log(`Express server has started on http://localhost:${port}.`)
        );
      })
      .catch((error: object) => console.log(error));
  } catch (error) {
    console.log(error);
  }
};

main();
