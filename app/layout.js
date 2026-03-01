import "./globals.css";

export const metadata = {
  title: "CodeFlow AI",
  description: "Sequence Diagram Generator",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}