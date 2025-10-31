import "./globals.css";

export const metadata = {
  title: "Delivery-now",
  description: "App para uma pizzaria",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body>
        {children}
      </body>
    </html>
  );
}
