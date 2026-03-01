export default function ArchitecturePanel({ architecture }) {
  if (!architecture) return null;

  return (
    <div style={{ marginTop: 20, background: "#f4f4f4", padding: 10 }}>
      <h3>Detected Architecture</h3>
      <pre>{JSON.stringify(architecture, null, 2)}</pre>
    </div>
  );
}