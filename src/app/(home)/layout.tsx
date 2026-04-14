"use client";

import { Suspense } from "react";
import { usePathname } from "next/navigation";

import Header from "@/components/home/layout/header";
import Footer from "@/components/home/layout/footer";
import Chatbot from "@/components/home/layout/chatbot";
import Loader from "@/components/loader";

const ShopLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const pathname = usePathname();
  const hideFooterAndChatbot = pathname === "/register" || pathname === "/login";

  return (
    <>
      <Suspense fallback={<Loader />}>
        <Header />

        {children}

        {!hideFooterAndChatbot && <Footer />}
        {!hideFooterAndChatbot && <Chatbot />}
      </Suspense>
    </>
  );
};

export default ShopLayout;




