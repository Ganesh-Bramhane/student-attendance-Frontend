import Webcam from "react-webcam";
import { useRef, useState } from "react";
import axios from "axios";

export default function Register() {
  const webcamRef = useRef(null);

  const [name, setName] = useState("");
  const [rollNo, setRollNo] = useState("");
  const [showCam, setShowCam] = useState(false);
  const [images, setImages] = useState([]);

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImages(prev => [...prev, imageSrc]);
  };

  const startCapture = () => {
    setShowCam(true);

    let count = 0;

    const interval = setInterval(() => {
      capture();
      count++;

      if (count === 20) {
        clearInterval(interval);
        alert("Face captured ✅");
      }
    }, 300);
  };

  const handleSubmit = async () => {
    try {
      if (images.length < 20) {
        return alert("Capture face first");
      }

      const res = await axios.post("http://localhost:5000/register" || "https://student-attendance-backend-1-445z.onrender.com/register", {
        name,
        rollNo,
        images
      });

      alert(res.data.message);

    } catch (err) {
      alert(
        err.response?.data?.error ||
        err.response?.data?.message ||
        "Something went wrong"
      );
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center p-4">

      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">

        <h2 className="text-xl font-bold mb-4">Student Register</h2>

        <input
          className="border p-2 w-full mb-3"
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="border p-2 w-full mb-3"
          placeholder="Roll No (A-101)"
          onChange={(e) => setRollNo(e.target.value)}
        />

        {!showCam && (
          <button
            onClick={startCapture}
            className="bg-green-600 text-white w-full p-2 rounded mb-3"
          >
            Open Camera
          </button>
        )}

        {showCam && (
          <Webcam
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            className="mb-3 rounded"
          />
        )}

        <p className="text-sm mb-3">
          Captured: {images.length} / 20
        </p>

        <button
          onClick={handleSubmit}a
          className="bg-blue-600 text-white w-full p-2 rounded"
        >
          Register
        </button>

      </div>
    </div>
  );
}
