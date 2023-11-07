/* eslint-disable prefer-const */
/* eslint-disable object-curly-spacing */
/* eslint-disable indent */
// eslint-disable-next-line new-cap
const router = require("express").Router();
const admin = require("firebase-admin");
const db = admin.firestore();
db.settings({ ignoreUndefinedProperties: true });
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

router.get("/", (req, res) => {
  return res.send("Insite the product router");
});

// ! add new product
router.post("/add-product", async (req, res) => {
  try {
    const id = Date.now();

    const data = {
      product_id: id,
      product_name: req.body.product_name,
      product_price: req.body.product_price,
      product_category: req.body.product_category,
      imageURL: req.body.imageURL,
    };

    const dataResponse = await db
      .collection("products")
      .doc(`/${id}/`)
      .set(data);
    return res.status(200).send({ success: true, data: dataResponse });
  } catch (error) {
    return res
      .status(500)
      .send({ success: false, error: `Error : ${error.message}` });
  }
});

// ! get all products
router.get("/all-products", async (req, res) => {
  (async () => {
    try {
      // query from collection in firebase
      const query = db.collection("products");
      const response = [];

      await query.get().then((querysnap) => {
        const docs = querysnap.docs;
        docs.map((doc) => {
          response.push({ ...doc.data() });
        });
        return response;
      });
      return res.status(200).send({ success: true, data: response });
    } catch (error) {
      return res
        .status(500)
        .send({ success: false, error: `Error : ${error.message}` });
    }
  })();
});

// ! delete product
router.delete("/delete-product/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const query = db.collection("products");
    await query
      .doc(`/${id}/`)
      .delete()
      .then((result) => {
        return res.status(200).send({ success: true, data: result });
      });
  } catch (error) {
    return res
      .status(500)
      .send({ success: false, error: `Error : ${error.message}` });
  }
});

// ! update product is not completed
router.post("/update-product/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const data = {
      product_name: req.body.product_name,
      product_price: req.body.product_price,
      product_category: req.body.product_category,
      imageURL: req.body.imageURL,
    };

    const query = db.collection("products");
    const updatedProduct = await query.doc(`/${id}/`).update(data);
    return res.status(200).send({ success: true, data: updatedProduct });
  } catch (error) {
    return res
      .status(500)
      .send({ success: false, error: `Error : ${error.message}` });
  }
});

// ! add to cart
router.post("/add-to-cart/:userId", async (req, res) => {
  const userId = req.params.userId;
  const productId = req.body.product_id;

  try {
    const doc = await db
      .collection("cartItems")
      .doc(`/${userId}/`)
      .collection("items")
      .doc(`/${productId}`)
      .get();

    if (doc.data()) {
      const quantity = doc.data().product_quantity + 1;
      const updatedItem = await db
        .collection("cartItems")
        .doc(`/${userId}/`)
        .collection("items")
        .doc(`/${productId}`)
        .update({ product_quantity: quantity });
      return res.status(200).send({ success: true, data: updatedItem });
    } else {
      const data = {
        product_id: req.body.product_id,
        product_name: req.body.product_name,
        product_price: req.body.product_price,
        product_category: req.body.product_category,
        imageURL: req.body.imageURL,
        product_quantity: 1,
      };
      const addItem = await db
        .collection("cartItems")
        .doc(`/${userId}/`)
        .collection("items")
        .doc(`/${productId}`)
        .set(data);
      return res.status(200).send({ success: true, data: addItem });
    }
  } catch (error) {
    return res
      .status(500)
      .send({ success: false, error: `Error : ${error.message}` });
  }
});

// ! get all cart
router.get("/get-all-cart/:userId", async (req, res) => {
  const userId = req.params.userId;
  (async () => {
    try {
      let query = db
        .collection("cartItems")
        .doc(`/${userId}/`)
        .collection("items");

      let response = [];

      await query.get().then((querySnap) => {
        let docs = querySnap.docs;
        docs.map((doc) => {
          response.push({ ...doc.data() });
        });
        return response;
      });

      return res.status(200).send({ success: true, data: response });
    } catch (error) {
      return res
        .status(500)
        .send({ success: false, error: `Error : ${error.message}` });
    }
  })();
});

// ! update cart
router.post("/update-cart/:userId", async (req, res) => {
  const userId = req.params.userId;
  const productId = req.query.productId;
  const type = req.query.type;

  try {
    const doc = await db
      .collection("cartItems")
      .doc(`/${userId}/`)
      .collection("items")
      .doc(`/${productId}`)
      .get();
    if (doc.data()) {
      if (type === "increment") {
        const quantity = doc.data().product_quantity + 1;
        const updatedItem = await db
          .collection("cartItems")
          .doc(`/${userId}/`)
          .collection("items")
          .doc(`/${productId}`)
          .update({ product_quantity: quantity });
        return res.status(200).send({ success: true, data: updatedItem });
      } else {
        if (doc.data().product_quantity === 1) {
          await db
            .collection("cartItems")
            .doc(`/${userId}/`)
            .collection("items")
            .doc(`/${productId}`)
            .delete()
            .then((result) => {
              return res.status(200).send({ success: true, data: result });
            });
        } else {
          const quantity = doc.data().product_quantity - 1;
          const updatedItem = await db
            .collection("cartItems")
            .doc(`/${userId}/`)
            .collection("items")
            .doc(`/${productId}`)
            .update({ product_quantity: quantity });
          return res.status(200).send({ success: true, data: updatedItem });
        }
      }
    }
  } catch (error) {
    return res
      .status(500)
      .send({ success: false, error: `Error : ${error.message}` });
  }
});

// ! checkout with stripe
router.post("/create-checkout-session", async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: "T-shirt",
          },
          unit_amount: 2000,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${process.env.CLIENT_URL}/checkout-success`,
    cancel_url: `${process.env.CLIENT_URL}/checkout-cancel`,
  });

  res.send({ url: session.url });
});

module.exports = router;
