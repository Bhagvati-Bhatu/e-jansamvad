// server.js
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const cookieParser = require("cookie-parser");

const userRouter = require("./routers/user");
const grievanceRouter = require("./routers/grievance");

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error("MONGO_URI is not set. Exiting.");
  process.exit(1);
}

// Middlewares
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({
  origin: true, // consider restricting to your frontend origin in production
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// Multer memory storage (for GridFS)
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') cb(null, true);
    else cb(new Error('Only PDFs allowed'), false);
  }
});

// GridFS bucket variable (initialized after DB connect)
let bucket = null;

// Helper: Promise for upload finish
function waitForStreamFinish(stream) {
  return new Promise((resolve, reject) => {
    stream.on("finish", resolve);
    stream.on("error", reject);
  });
}

/**
 * Upload endpoint: stores file into GridFS and returns filename & fileId
 * Expects multipart/form-data with field "file"
 */
app.post("/upload", upload.single("file"), async (req, res) => {
  try {
    if (!bucket) {
      return res.status(503).json({ error: "Storage not ready. Try again shortly." });
    }
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // Use a unique filename to avoid collisions
    const filename = `${Date.now()}-${req.file.originalname}`;

    const uploadStream = bucket.openUploadStream(filename, {
      contentType: req.file.mimetype
    });

    // write and close
    uploadStream.end(req.file.buffer);

    await waitForStreamFinish(uploadStream);

    return res.status(201).json({
      message: "File uploaded successfully",
      filename,
      fileId: uploadStream.id.toString()
    });
  } catch (err) {
    console.error("❌ Upload error:", err);
    return res.status(500).json({ error: "File upload failed", details: err.message });
  }
});

/**
 * Retrieve file by filename (inline view)
 */
app.get("/file/:filename", async (req, res) => {
  try {
    if (!bucket) return res.status(503).json({ error: "Storage not ready" });

    const file = await mongoose.connection.db.collection("uploads.files").findOne({ filename: req.params.filename });
    if (!file) return res.status(404).json({ error: "File not found" });

    res.set("Content-Type", file.contentType || "application/pdf");
    res.set("Content-Disposition", `inline; filename="${file.filename}"`);

    const downloadStream = bucket.openDownloadStream(file._id);
    downloadStream.pipe(res);
  } catch (err) {
    console.error("❌ Error retrieving file:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

/**
 * Download endpoint (attachment)
 */
app.get("/download/:filename", async (req, res) => {
  try {
    if (!bucket) return res.status(503).json({ error: "Storage not ready" });

    const file = await mongoose.connection.db.collection("uploads.files").findOne({ filename: req.params.filename });
    if (!file) return res.status(404).json({ error: "File not found" });

    res.set("Content-Type", file.contentType || "application/pdf");
    res.set("Content-Disposition", `attachment; filename="${file.filename}"`);

    const downloadStream = bucket.openDownloadStream(file._id);
    downloadStream.pipe(res);
    console.log("📥 File sent for download:", req.params.filename);
  } catch (err) {
    console.error("❌ Error downloading file:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Root health check
app.get("/", (req, res) => res.send("✅ E-JanSamvad backend is running successfully!"));

// Mount other routers (they rely on mongoose connection but can be mounted now)
app.use("/user", userRouter);
app.use("/grievance", grievanceRouter);

// Start server AFTER MongoDB connects and bucket is created
async function start() {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    // Initialize GridFSBucket using mongoose's native db
    bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, { bucketName: "uploads" });
    console.log("✅ Mongo connected & GridFS bucket initialized.");

    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  } catch (err) {
    console.error("Failed to connect to MongoDB:", err);
    process.exit(1);
  }
}

start();
