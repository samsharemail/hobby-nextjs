"use client";

import { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import UploadPanel from "../components/UploadPanel";
import ControllerSelector from "../components/ControllerSelector";
import DiagramPanel from "../components/DiagramPanel";
import ArchitecturePanel from "../components/ArchitecturePanel";

export default function Home() {
  const [diagram, setDiagram] = useState("");
  const [architecture, setArchitecture] = useState(null);
  const [controllers, setControllers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedController, setSelectedController] = useState("");

  const uploadAndAnalyze = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);
      const res = await axios.post(
        "http://localhost:8000/api/generate-from-zip",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setArchitecture(res.data.architecture);
      setControllers(res.data.controllers_sorted || []);
      setDiagram(res.data.mermaid);
      setSelectedController("");
    } catch (err) {
      console.error(err);
      alert("Error analyzing project");
    } finally {
      setLoading(false);
    }
  };

  const onControllerSelect = async (controller) => {
    setSelectedController(controller || "");
    // if empty -> overview, so re-request without selected_controller
    const form = new FormData();
    // We need to send the same ZIP file again or backend could cache results.
    // Simplest: send selected_controller with null to request overview again — but we don't have the file now.
    // Instead, we'll ask backend to accept selected_controller in same POST; so frontend must re-upload file,
    // but to avoid re-uploading, we included controllers list so user can first pick a controller before upload.
    // Simpler approach: call a new endpoint would be ideal, but to keep changes minimal:
    // We'll ask backend to accept selected_controller via GET/POST; here we re-generate using the previous architecture.
    // To keep stateless, we re-send selected_controller in a lightweight POST (backend will reuse last extracted dir if implemented).
    // For now, we will request the same generate endpoint with selected_controller; this requires re-upload of the zip.
    // So prompt user to re-upload or we can cache last uploaded file id (future).
    // For now, show instruction:
    alert("To visualize a specific controller: re-upload the same ZIP and choose the controller from the selector after analysis.");
  };

  return (
    <div className="app-container">
      <div className="sidebar">
        <div>
          <div className="title">CodeFlow AI</div>
          <div className="subtitle">.NET ZIP → Sequence Diagram Generator</div>
        </div>

        <UploadPanel onUpload={uploadAndAnalyze} loading={loading} />

        <ControllerSelector controllers={controllers} onSelect={onControllerSelect} />

        {architecture && (
          <div className="arch-box">
            <strong>Detected Architecture</strong>
            <pre>{JSON.stringify(architecture, null, 2)}</pre>
          </div>
        )}
      </div>

      <div className="main-content">
        <div className="card">
          <DiagramPanel diagram={diagram} />
        </div>
      </div>
    </div>
  );
}