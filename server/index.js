const express = require("express");
const {
  sessionMiddleware,
  wrap,
  corsConfig,
} = require("./controllers/serverController");
const { Server } = require("socket.io");
const app = express();
const helmet = require("helmet");
const cors = require("cors");
const authRouter = require("./routers/authRouter");
const {
  initializeUser,
  addFriend,
  onDisconnect,
  authorizeUser,
  dm,
} = require("./controllers/socketController");
const server = require("http").createServer(app);
const cookieParser = require('cookie-parser');
const logoutRouter = require('./controllers/express/handleLogout');
const constant = require("./constants/port-constants");

const io = new Server(server, {
  cors: corsConfig,
});

app.use(helmet());
app.use(cors(corsConfig));
app.use(express.json());
app.use(sessionMiddleware);
app.use("/auth", authRouter);
app.use(cookieParser());
app.post("/auth/logout", logoutRouter);

io.use(wrap(sessionMiddleware));
io.use(authorizeUser);

io.on("connect", socket => {
  initializeUser(socket);

  socket.on("add_friend", (friendName, cb) => {
    addFriend(socket, friendName, cb);
  });

  socket.on("dm", message => dm(socket, message));

  socket.on("disconnecting", () => onDisconnect(socket));

});

server.listen(constant.SERVER_PORT, () => {
  console.log(`Server listening on port ${constant.SERVER_PORT}`);
});
