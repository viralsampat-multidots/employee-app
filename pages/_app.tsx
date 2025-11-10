import type { AppProps } from "next/app";
import { enableVisualEditing } from "@sanity/visual-editing";

enableVisualEditing();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
    </>
  )
}
