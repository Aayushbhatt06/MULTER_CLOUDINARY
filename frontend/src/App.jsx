import { useState } from "react";

function App() {
  const [file, setFile] = useState(null);
  const [image, setImage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("profileImage", file);

    const res = await fetch("http://localhost:3000/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setImage(data.url);
    alert(data.message);
  };

  return (
    <div className="main">
      <form onSubmit={handleSubmit}>
        <label htmlFor="file">Input file: </label>
        <input
          type="file"
          name="profileImage"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <button type="submit">Upload</button>
      </form>
      {image.length > 0 ? (
        <div>
          <img src={image} alt="" />
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default App;
