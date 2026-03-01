"use client";

import { useState } from "react";

export default function UploadPanel({ onUpload, loading }) {
  const [file, setFile] = useState(null);

  return (
    <div className="upload-section">
      <input
        type="file"
        accept=".zip"
        onChange={(e) => setFile(e.target.files[0])}
      />

      {file && <div className="file-info">{file.name}</div>}

      <button
        disabled={!file || loading}
        onClick={() => onUpload(file)}
      >
        {loading ? "Analyzing Project..." : "Generate Diagram"}
      </button>
    </div>
  );
}