const http = require("http");
//: Importation du package HTTP
const app = require("./app");
//: Utilisation application sur le serveur

//: Configuration du port de connexion
const normalizePort = (val) => {
  //: Fonction normalizePort renvoie port valide
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};

//: Si aucun renvoie de PORT écoute du port 3000
const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

const errorHandler = (error) => {
  if (error.syscall !== "listen") {
    throw error;
  }
  const address = server.address();
  const bind = typeof address === "string" ? "pipe " + address : "port: " + port;
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges.");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use.");
      process.exit(1);
      break;
    default:
      throw error;
  }

};


const server = http.createServer(app);

server.listen(process.env.PORT || 3000);
