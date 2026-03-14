import express from "express";
import Channel from "../models/Channel.js";

const router = express.Router();

/* ---------------- CREATE CHANNEL ---------------- */

router.post("/create", async (req, res) => {

try {

const { name, owner } = req.body;

// validation
if (!name || !owner) {
return res.status(400).json({
message: "Channel name and owner are required"
});
}

// check if channel already exists
const existing = await Channel.findOne({ name });

if (existing) {
return res.status(400).json({
message: "Channel already exists"
});
}

// create channel
const newChannel = new Channel({
name,
owner,
icon: "https://cdn-icons-png.flaticon.com/512/149/149071.png"
});

await newChannel.save();

res.status(201).json({
message: "Channel created successfully",
channel: newChannel
});

} catch (err) {

console.error("Channel creation error:", err);

res.status(500).json({
message: "Server error while creating channel"
});

}

});


/* ---------------- TEST ROUTE ---------------- */

router.get("/", (req, res) => {
res.json({ message: "Channel API Working" });
});

export default router;