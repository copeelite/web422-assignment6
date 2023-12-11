import Layout from "@/components/Layout";
import "@/styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { ShoppingCartProvider } from "@/context/ShoppingCartContext";
// pages/_app.js or where you setup your main application component

export default function App({ Component, pageProps }) {
  return (
    <ShoppingCartProvider >
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ShoppingCartProvider>
  );
}
