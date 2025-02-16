import { Footer, Navbar } from "@/components";
import Head from "next/head";
import React from "react";

const Layout = ({ children }: any) => {
  return (
    <div className="layout">
      <Head>
        <title>Mapola Design</title>
      </Head>
      <header>
        <Navbar />
      </header>
      <main className="main-container">{children}</main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default Layout;
