import "tailwindcss/tailwind.css";
import { AppProps } from "next/app";
import '../styles/globals.css'

interface AppWithLayoutProps {
  Component: AppProps['Component'] & {
    getLayout?: (component: JSX.Element) => JSX.Element
  }
  pageProps: AppProps['pageProps']
}

export default function App({ Component, pageProps }: AppWithLayoutProps) {
  const getLayout = Component.getLayout || ((page) => page)

  return getLayout(<Component {...pageProps} />)
}
