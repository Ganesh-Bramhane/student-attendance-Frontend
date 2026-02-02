import Webcam from "react-webcam";
import { useRef, useState, useEffect } from "react";
import axios from "axios";

export default function Attendance() {
  const webcamRef = useRef(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const interval = setInterval(capture, 2000);
    return () => clearInterval(interval);
  }, []);

  const capture = async () => {
    if (!webcamRef.current) return;

    const image = webcamRef.current.getScreenshot();

    const res = await axios.post(
      "http://localhost:5000/attendance/recognize" || "https://student-attendance-backend-1-445z.onrender.com/attendance/recognize",
      { image }
    );

    setMessage(res.data.message + " " + (res.data.rollNo || ""));
  };

  return (
    <div className="flex flex-col items-center p-4">
      <h2 className="text-xl font-bold mb-3">Attendance Camera</h2>

      <Webcam ref={webcamRef} screenshotFormat="image/jpeg" />

      <p className="mt-3 text-green-600 font-bold">{message}</p>
    </div>
  );
}
