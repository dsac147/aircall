import BottomNav from "@/components/BottomNav";
import TopNav from "@/components/TopNav";
import Content from "@/components/Content";

import { fetchCalls } from "@/utils/index";

export default async function Home() {
  const allCalls = await fetchCalls();

  return (
    <main
      className="relative min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8  bg-no-repeat bg-cover relative items-center"
      style={{
        backgroundImage:
          "url(https://images.unsplash.com/photo-1507608158173-1dcec673a2e5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80)",
      }}
    >
      <div className="absolute bg-black opacity-60 inset-0 z-0"></div>
      <div className="w-full sm:w-6/12 lg:w-4/12 xl:w-4/12  overflow-y-scroll space-y-3 border-8 rounded-3xl bg-white border-gray-800 shadow-2xl z-10">
        <TopNav />
        <Content allCalls={allCalls} />
        <BottomNav />
      </div>
    </main>
  );
}
