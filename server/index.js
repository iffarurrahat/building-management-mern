const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const jwt = require("jsonwebtoken");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const port = process.env.PORT || 5000;

// middleware
const corsOptions = {
  origin: [
    "https://sparkly-haupia-877131.netlify.app",
    "https://building-management-2241.surge.sh",
    // "http://localhost:5173",
    // "http://localhost:5174",
  ],
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// Verify Token Middleware
const verifyToken = async (req, res, next) => {
  const token = req.cookies?.token;
  // console.log(token);
  if (!token) {
    return res.status(401).send({ message: "unauthorized access" });
  }
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      // console.log(err);
      return res.status(401).send({ message: "unauthorized access" });
    }
    req.user = decoded;
    next();
  });
};

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.9u7odmy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();

    const db = client.db("buildingDB");
    const roomsCollection = db.collection("rooms");
    const usersCollection = db.collection("users");
    const noticesCollection = db.collection("notices");
    const bookingsCollection = db.collection("bookings");
    const couponsCollection = db.collection("coupons");
    const paymentsCollection = db.collection("payments");

    //verify admin middleware
    const verifyAdmin = async (req, res, next) => {
      const user = req.user;
      const query = { email: user?.email };
      const result = await usersCollection.findOne(query);

      if (!result || result?.role !== "admin")
        return res.status(401).send({ message: "unauthorized access!!" });

      next();
    };

    //verify member middleware
    const verifyMember = async (req, res, next) => {
      const user = req.user;
      const query = { email: user?.email };
      const result = await usersCollection.findOne(query);
      if (!result || result?.role !== "member")
        return res.status(401).send({ message: "unauthorized access!!" });

      next();
    };

    // auth related api
    app.post("/jwt", async (req, res) => {
      const user = req.body;
      const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "365d",
      });
      res
        .cookie("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        })
        .send({ success: true });
    });

    // Logout
    app.get("/logout", async (req, res) => {
      try {
        res
          .clearCookie("token", {
            maxAge: 0,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
          })
          .send({ success: true });
        // console.log("Logout successful");
      } catch (err) {
        res.status(500).send(err);
      }
    });

    //create-payment-intent
    app.post("/create-payment-intent", verifyToken, async (req, res) => {
      const price = req.body.rent;
      const priceInCent = parseFloat(price) * 100;

      if (!price || priceInCent < 1) return;

      // generate clientSecret
      const { client_secret } = await stripe.paymentIntents.create({
        amount: priceInCent,
        currency: "usd",
        // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
        automatic_payment_methods: {
          enabled: true,
        },
      });
      // send client secret as response
      res.send({ clientSecret: client_secret });
    });

    //save a user data in db
    app.put("/user", async (req, res) => {
      const user = req.body;
      const query = { email: user?.email };

      // check if user already exists in db
      const isExits = await usersCollection.findOne(query);

      if (isExits) {
        if (user.status === "Requested") {
          //if existing user tyr to change his role
          const result = await usersCollection.updateOne(query, {
            $set: { status: user?.user },
          });
          return res.send(result);
        } else {
          //if existing user login again
          return res.send(isExits);
        }
      }

      const options = { upsert: true };

      const updateDoc = {
        $set: {
          ...user,
          timestamp: Date.now(),
        },
      };

      const result = await usersCollection.updateOne(query, updateDoc, options);
      res.send(result);
    });

    // get a user info by email from db
    app.get("/user/:email", async (req, res) => {
      const email = req.params.email;
      const result = await usersCollection.findOne({ email });
      res.send(result);
    });

    // get all users data from db
    // app.get("/users", verifyToken, verifyAdmin, async (req, res) => {
    app.get("/users", async (req, res) => {
      const result = await usersCollection.find().toArray();
      res.send(result);
    });

    // delete a user data from db
    app.delete("/users/:id", verifyToken, verifyAdmin, async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await usersCollection.deleteOne(query);
      res.send(result);
    });

    //update a user role
    app.patch("/users/update/:email", async (req, res) => {
      const { email } = req.params;

      const filter = { email };
      const updateDoc = {
        $set: { role: req.body.role, status: req.body.status },
      };

      const result = await usersCollection.updateOne(filter, updateDoc);
      res.send(result);
    });

    // Get all rooms data from db for pagination
    app.get("/rooms", async (req, res) => {
      const size = parseInt(req.query.size);
      const page = parseInt(req.query.page) - 1;

      const result = await roomsCollection
        .find()
        .skip(page * size)
        .limit(size)
        .toArray();
      res.send(result);
    });

    // Get all rooms data count from db
    app.get("/rooms-count", async (req, res) => {
      const count = await roomsCollection.countDocuments();
      res.send({ count });
    });

    // Get all announcement data from db
    app.get("/notice", async (req, res) => {
      const result = await noticesCollection.find().toArray();
      res.send(result);
    });

    // announcement data post in db
    app.post("/notice", verifyToken, verifyAdmin, async (req, res) => {
      const notice = req.body;
      const result = await noticesCollection.insertOne(notice);
      res.send(result);
    });

    //booking all
    app.get("/booking", async (req, res) => {
      const result = await bookingsCollection.find().toArray();
      res.send(result);
    });

    // Get all bookings data query by email from db
    app.get("/booking/:email", async (req, res) => {
      const email = req.params.email;
      const query = { "bookingUser.email": email };
      const result = await bookingsCollection.find(query).toArray();
      res.send(result);
    });

    // booking a data post, and update user status from db
    app.post("/booking", async (req, res) => {
      const booking = req.body;
      const bookingEmail = booking.bookingUser.email;
      const status = booking.status;

      // Check if the user has any existing bookings
      const existingBookings = await bookingsCollection.findOne({
        "bookingUser.email": bookingEmail,
      });

      if (existingBookings) {
        return res
          .status(400)
          .send({ message: "You have already booked an apartment." });
      }

      const bookingResult = await bookingsCollection.insertOne(booking);

      const query = { email: bookingEmail };
      const updateDoc = {
        $set: { status: status },
      };
      const updateStatus = await usersCollection.updateOne(query, updateDoc);
      res.send({
        bookingResult,
        updateStatus,
      });
    });

    // Get all coupons data in db
    app.get("/coupons", async (req, res) => {
      const result = await couponsCollection.find().toArray();
      res.send(result);
    });

    //Get last post coupons data in db
    app.get("/coupons/latest", async (req, res) => {
      const result = await couponsCollection
        .find()
        .sort({ _id: -1 })
        .limit(1)
        .toArray();
      res.send(result[0]);
    });

    //coupons data post in db
    app.post("/coupons", verifyToken, verifyAdmin, async (req, res) => {
      const coupons = req.body;
      const result = await couponsCollection.insertOne(coupons);
      res.send(result);
    });

    //Save a payment data in db
    app.post("/payment", verifyToken, verifyMember, async (req, res) => {
      const paymentData = req.body;
      const result = await paymentsCollection.insertOne(paymentData);

      // // change room availability status
      // const bookingId = paymentData?.booking_id
      // const query = {_id: new ObjectId(bookingId)}
      // const updateDoc = {
      //   $set: {booked: true}
      // }
      // const updatedRoom = await roomsCollection.updateOne(query, updateDoc)
      // console.log(updatedRoom);

      res.send(result);
    });

    // update Room Status
    app.patch("/room/status/:id", async (req, res) => {
      const id = req.params.id;
      const status = req.body.status;
      // change room availability status
      const query = { _id: new ObjectId(id) };
      const updateDoc = {
        $set: { booked: status },
      };
      const result = await roomsCollection.updateOne(query, updateDoc);
      res.send(result);
    });

    // get all payments for a member
    app.get("/my-payments/:email", verifyToken, async (req, res) => {
      const email = req.params.email;
      const query = { "bookingUser.email": email };
      const result = await paymentsCollection.find(query).toArray();
      res.send(result);
    });

    // Admin Statistics
    app.get("/admin-stat", async (req, res) => {
      const paymentsDetails = await paymentsCollection
        .find({}, { projection: { date: 1, rent: 1 } })
        .toArray();

      const totalUser = await usersCollection.countDocuments();
      const totalRooms = await roomsCollection.countDocuments();
      const totalRent = paymentsDetails.reduce(
        (sum, booking) => sum + booking.rent,
        0
      );

      // const data = [
      //   ["Day", "Sales"],
      //   ["9", 1000],
      //   ["10", 1170],
      //   ["11", 660],
      //   ["12", 1030],
      // ];

      const chartArt = paymentsDetails.map((payment) => {
        const day = new Date(payment.date).getDate();
        const month = new Date(payment.date).getMonth() + 1;
        const data = [`${day}/${month} `, payment.rent];
        return data;
      });
      chartArt.unshift(["Day", "Apartment Sales"]);
      // chartArt.splice(0, 0, ["Day", "Sales"]);

      // console.log(chartArt);

      res.send({
        totalUser,
        totalRooms,
        totalPayments: paymentsDetails.length,
        totalRent,
        chartArt,
      });
    });

    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    // console.log(
    //   "Pinged your deployment. You successfully connected to MongoDB!"
    // );
  } finally {
    // Ensures that the client will close when you finish/error
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("building-management is running");
});

app.listen(port, () => {
  console.log(`building-management is running on PORT: ${port}`);
});
