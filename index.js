const express = require("express");
const bodyparser = require("body-parser");
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");

const createQuizRoute = require("./routes/createQuiz");
const getQuizRoute = require("./routes/getQuiz");
const getIndividualQuizRoute = require("./routes/getIndividualQuiz");
const answerQuiz = require("./routes/answerQuiz");
const deletQuiz = require("./routes/deleteQuiz");
const createUser = require("./routes/createUser");
const getIndividualUser = require("./routes/getIndividualUser");

const connectionString =
  "mongodb+srv://alex123:brazil56@cluster0-cyvmn.mongodb.net/test?retryWrites=true&w=majority";
const PORT = process.env.PORT || 5000;

mongoose
  .connect(connectionString, { useNewUrlParser: true })
  .then(() => console.log("Database connected"))
  .catch(err => console.log(err));

app.use(bodyparser());
app.use(morgan("dev"));
app.use(cors());

app.listen(PORT, () => console.log("Server started"));

app.use("/createQuiz", createQuizRoute);
app.use("/", getQuizRoute);
app.use("/quiz", getIndividualQuizRoute);
app.use("/quiz/answer", answerQuiz);
app.use("/quiz/delete", deletQuiz);
app.use("/createUser", createUser);
app.use("/user", ipMiddleware, getIndividualUser);

const ipMiddleware = function(req, res, next) {
  const clientIp = requestIp.getClientIp(req);
  console.log(clientIp);
  next();
};
