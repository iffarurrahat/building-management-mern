const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { MongoClient, ServerApiVersion } = require("mongodb");
const jwt = require("jsonwebtoken");
const port = process.env.PORT || 5000;

// middleware
const corsOptions = {
  origin: ["http://localhost:5173", "http://localhost:5174"],
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// Verify Token Middleware
const verifyToken = async (req, res, next) => {
  const token = req.cookies?.token;
  console.log(token);
  if (!token) {
    return res.status(401).send({ message: "unauthorized access" });
  }
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      console.log(err);
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
    await client.connect();

    const roomsCollection = client.db("buildingDB").collection("rooms");
    const usersCollection = client.db("buildingDB").collection("users");

    // // auth related api
    // app.post("/jwt", async (req, res) => {
    //   const user = req.body;
    //   const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    //     expiresIn: "365d",
    //   });
    //   res
    //     .cookie("token", token, {
    //       httpOnly: true,
    //       secure: process.env.NODE_ENV === "production",
    //       sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    //     })
    //     .send({ success: true });
    // });

    // auth related api
    app.post("/jwt", async (req, res) => {
      const user = req.body;

      // // Check if the user object contains necessary data before signing the token
      // if (!user || Object.keys(user).length === 0) {
      //   return res.status(400).send({ message: "Invalid user data" }); // Error handling for empty payload
      // }

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
        console.log("Logout successful");
      } catch (err) {
        res.status(500).send(err);
      }
    });

    //save a user data in db
    app.put("/user", async (req, res) => {
      const user = req.body;
      const query = { email: user?.email };

      // check if user already exists in db
      const isExits = await usersCollection.findOne(query);
      // if (isExits) return res.send(isExits);

      if (isExits) {
        if (user.status === "Requested") {
          const result = await usersCollection.updateOne(query, {
            $set: { status: user?.user },
          });
          return res.send(result);
        } else {
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

    // get all users data from db
    app.get("/users", async (req, res) => {
      const result = await usersCollection.find().toArray();
      res.send(result);
    });

    // Get all rooms data from db
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

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
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
