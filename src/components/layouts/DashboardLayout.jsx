import { Navbar } from "@/components";

export const DashboardLayout = ({ children }) => {
  return (
    <>
      <div className="w-full mx-auto h-screen overflow-hidden">
        <Navbar />
        <main className="">
          <div className="mx-auto ">{children}</div>
        </main>
      </div>
    </>
  );
};
