import Link from "next/link";
import Image from "next/image";
import { ReactNode } from "react";
import { redirect } from "next/navigation";

import { isAuthenticated } from "@/lib/actions/auth.actions";

const Layout = async ({ children }: { children: ReactNode }) => {
  const isUserAuthenticated = await isAuthenticated();
  if (!isUserAuthenticated) redirect("/sign-in");

  return (
    <div className="root-layout">
      <nav>
        <Link href="/" className="flex items-center gap-2">
          <Image src="/return.png" alt="MockMate Logo" width={58} height={52} />
          <div className="animate-in fade-in slide-in-from-bottom-10 duration-700">
          <h2 className="text-primary-100">Mock Mate</h2>
          </div>
        </Link>
      </nav>

      <main className="flex-1 overflow-hidden">
        {children}
      </main>
      
    </div>
  );
};

export default Layout;