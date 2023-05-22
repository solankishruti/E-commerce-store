const { authJwt } = require("../middlewares");
const controller = require("../controllers/cart.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/cart", [authJwt.verifyToken], controller.addToCart);
  app.get("/api/cart/:userId", [authJwt.verifyToken], controller.getCartDetails);
  app.put("/api/cart/:itemId", [authJwt.verifyToken], controller.updateCartDetails);
  app.delete("/api/cart/:itemId", [authJwt.verifyToken], controller.removeFromCart);

};