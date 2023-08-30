import { CorsOptions } from "cors";

const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    console.log(origin);
    if (origin === `${process.env.CLIENT_DOMAIN}:${process.env.CLIENT_PORT}`) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by cors policy"));
    }
  },
};

export default corsOptions;
