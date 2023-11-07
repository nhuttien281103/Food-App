/* eslint-disable indent */
// eslint-disable-next-line new-cap
const router = require("express").Router();
const admin = require("firebase-admin");
// eslint-disable-next-line prefer-const
let data = [];

router.get("/", (req, res) => {
  return res.send("Insite the user router");
});

router.get("/jwtVerification", async (req, res) => {
  if (!req.headers.authorization) {
    // eslint-disable-next-line object-curly-spacing
    return res.status(500).send({ message: "Token not found" });
  }
  const token = req.headers.authorization.split(" ")[1];
  try {
    const decodeValue = await admin.auth().verifyIdToken(token);
    if (!decodeValue) {
      return (
        res
          .status(500)
          // eslint-disable-next-line object-curly-spacing
          .send({ success: false, message: "Unathorized access" })
      );
    }
    // eslint-disable-next-line object-curly-spacing
    return res.status(200).send({ success: true, data: decodeValue });
  } catch (error) {
    // eslint-disable-next-line object-curly-spacing
    return res.send({ success: false, message: `Error : ${error.message}` });
  }
});

const listAllUsers = async (nextPageToken) => {
  admin
    .auth()
    .listUsers(1000, nextPageToken)
    .then((listUsersResult) => {
      listUsersResult.users.forEach((userRecord) => {
        data.push(userRecord.toJSON());
      });
      if (listUsersResult.pageToken) {
        listAllUsers(listUsersResult.pageToken);
      }
    })
    .catch((error) => {
      console.log("Error listing users:", error);
    });
};
// Start listing users from the beginning, 1000 at a time.
listAllUsers();

router.get("/all-users", async (req, res) => {
  listAllUsers();
  try {
    // eslint-disable-next-line object-curly-spacing
    return res.status(200).send({ success: true, data: data });
  } catch (error) {
    // eslint-disable-next-line object-curly-spacing
    return res.send({ success: false, message: `Error : ${error.message}` });
  }
});

module.exports = router;
