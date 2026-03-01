"use client";

export default function ControllerSelector({ controllers, onSelect }) {
  if (!controllers || controllers.length === 0) return null;

  return (
    <div style={{ marginTop: 12 }}>
      <label style={{ fontSize: 13, color: "#6b7280" }}>Visualize controller</label>
      <select
        onChange={(e) => onSelect(e.target.value)}
        style={{ marginTop: 8, padding: 8, width: "100%", borderRadius: 8 }}
      >
        <option value="">Overview (auto)</option>
        {controllers.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
    </div>
  );
}