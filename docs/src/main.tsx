import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { Helmet, HelmetProvider } from 'react-helmet-async';

createRoot(document.getElementById("root")!).render(
  <HelmetProvider>
    <Helmet>
      <title>Parivartana - Student Marketplace for Sustainability</title>
      <meta name="description" content="Buy, sell, and exchange used items within your campus community. Save money while reducing waste with Parivartana - the sustainable student marketplace." />
      <meta property="og:title" content="Parivartana - Student Marketplace" />
      <meta property="og:description" content="Buy, sell, and exchange used items within your campus community. Save money while reducing waste." />
      <meta property="og:type" content="website" />
      <meta property="og:image" content="https://images.unsplash.com/photo-1523240795612-9a054b0db644" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Poppins:wght@500;600;700&family=Outfit:wght@400;500;600&display=swap" rel="stylesheet" />
    </Helmet>
    <App />
  </HelmetProvider>
);
