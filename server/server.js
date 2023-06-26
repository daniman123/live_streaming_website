const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { authenticateToken } = require("./middlewares/auth-middleware");

const PORT = 8000;

const routes = [
  { path: "/", router: require("./routes/generalRoutes") },
  { path: "/", router: require("./routes/authRoutes") },
  { path: "/", router: require("./routes/refreshRoutes") },
  { path: "/", router: require("./routes/userDataRoutes") },
];
// { path: "/", router: require("./routes/userDataRoutes"), middleware: authenticateToken },

function setupServer() {
  const app = express();
  app.use(express.json());
  app.use(
    cors({
      origin: "http://localhost:3000", // Replace with the origin of your Next.js app
      credentials: true, // Enable CORS with credentials
    })
  );
  app.use(cookieParser());

  console.log("🚀 Server started.");

  routes.forEach((route) => {
    if (route.middleware) {
      app.use(route.path, route.middleware, route.router);
    } else {
      app.use(route.path, route.router);
    }
  });

  app.listen(PORT, () => {
    console.log("LISTENING ON PORT:", PORT);
  });
}

setupServer();
