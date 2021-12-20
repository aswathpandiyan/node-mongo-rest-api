const polka = require("polka");
const cors = require("cors");
const cluster = require("@polka/cluster");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const compression = require("compression");
//import environment variables
dotenv.config();
//import helpers
const send = require("./helper/response");
const log = require("./helper/logger");
const authenticateToken = require("./helper/autheticate");
const shouldCompress = require("./helper/compression");

//import models
const products = require("./controller/products");
const users = require("./controller/users");
const file = require("./controller/file");
//initialize app
const app = polka({
  onError: function (err, req, res, next) {
    log.error(err);
    send.error(res, err);
  },
});
//initialize database
require("./initDb")();
//initialize midlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(compression({ filter: shouldCompress, threshold: 102400 }));
//initialize routes
app.all("/test", (req, res) => {
  send.json(res, req.body);
});
app.get("/products", authenticateToken, products.getAll);
app.post("/products", products.create);
app.get("/products/:id", products.findById);
app.delete("/products/:id", products.deleteById);
app.patch("/products/:id", products.updateById);

app.post("/register", users.create);
app.post("/login", users.login);

app.post("/refresh-token", users.refreshToken);

app.post("/file-upload", file.uploadOne);

const PORT = process.env.PORT || 3000;

if (process.env.CLUSTER_MODE === true) {
  cluster(app).listen(PORT, (err) => {
    if (err) throw err;
    log.info(`-> Running on Cluster: ${PORT}`);
  });
} else {
  app.listen(PORT, (err) => {
    if (err) throw err;
    log.info(`-> Running on localhost: ${PORT}`);
  });
}
