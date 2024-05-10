import Image from "next/image";
import PageHome from "./home/page";

export default function Page({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <PageHome />
    </>
  );
}
