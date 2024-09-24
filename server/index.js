const express = require("express");
const dotenv = require("dotenv");
const employerRoute = require("./router/employerRouter");
const jobseekerRoute = require("./router/jobseekerRouter");
const connectDatabase = require("./config/database");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();
const { isAuthenticatedJobSeeker } = require("./middleware/auth");

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

const corsOptions = {
  origin: "http://localhost:3000", // Allow only requests from your frontend
  optionsSuccessStatus: 200,
  credentials: true, // For legacy browser support
};
app.use(cookieParser());
app.use(cors(corsOptions));

dotenv.config();

app.use(express.json());

app.use("/api", jobseekerRoute);
app.use("/api", employerRoute);


connectDatabase();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`app listening on port ${PORT}`);
});
