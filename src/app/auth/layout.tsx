import Link from "next/link";
import { ReactNode } from "react";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <header className="p-4 flex flex-col justify-between items-start bg-white border-b border-border sticky top-0 z-50 shadow-sm">
        <Link href="/">
          <img
            src="/images/logo.png"
            alt="logo"
            className="h-15 w-15 rounded-full"
          />
        </Link>
      </header>
      {children}
    </>
  );
};

export default AuthLayout;
