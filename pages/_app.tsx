import type { AppProps } from "next/app";
import "@/styles/globals.css"; // or wherever your Tailwind/CSS is defined

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
