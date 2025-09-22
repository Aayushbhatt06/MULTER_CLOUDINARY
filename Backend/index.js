const express = require("express");
const app = express();
const uploader = require("./middleware/multer");
const cors = require("cors");
const { uploadToCloudinary } = require("./utils/cloudinary");

const PORT = 3000;
app.get("/", (req, res) => {
  res.send("Hello world");
});
app.use(cors());

app.use(express.urlencoded({ extended: false }));

app.post("/upload", uploader("profileImage"), async (req, res) => {
  try {
    const localFilePath = req.file.path;

    const result = await uploadToCloudinary(localFilePath);

    if (!result) {
      return res.status(500).json({ error: "Upload failed" });
    }

    return res.json({
      message: "File uploaded successfully",
      url: result.secure_url,
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log("Listening on Port number : ", PORT);
});
