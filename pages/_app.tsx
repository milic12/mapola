import Chakra from "@/components/Chakra";
import LoadingScreen from "@/components/loadingScreen/LoadingScreen";
import { StateContex } from "@/context/StateContext";
import { Layout } from "@/layouts";
import * as ga from "@/lib/googleAnalytics";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Script from "next/script";

import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "slick-carousel/slick/slick.css";

import "slick-carousel/slick/slick-theme.css";

export default function App({ Component, pageProps, router }: AppProps) {
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      ga.pageview(url);
    };

    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  const [loading, setLoading] = useState<{
    load: boolean;
    loadedOnce: boolean;
  }>({
    load: true,
    loadedOnce: false,
  });

  const loaded = () => {
    setTimeout(() => {
      setLoading({
        load: false,
        loadedOnce: true,
      });
    }, 1000);
  };
  useEffect(() => {
    loaded();
  }, []);

  return (
    <>
      <Script
        id="ga"
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
      />
      <Script
        id="ga-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
        window.dataLayer = window.dataLayer || [];
        window.gtag = function () {
          dataLayer.push(arguments);
        };
        window.gtag('js', new Date());
        window.gtag('config','${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
          page_path: window.location.pathname,
        });
      `,
        }}
      />
      <Chakra>
        <ToastContainer className="toast-container" />
        <StateContex>
          <Layout>
            {loading.load && !loading.loadedOnce ? (
              <LoadingScreen />
            ) : (
              <Component {...pageProps} />
            )}
          </Layout>
        </StateContex>
      </Chakra>
    </>
  );
}
