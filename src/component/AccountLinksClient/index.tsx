"use client";

import Link from "next/link";
import { useState } from "react";
import type { User } from "@supabase/supabase-js";
import { LogOut } from "../../../actions/logout-action";

const AccountLinksClient = ({ user }: { user: User | null }) => {
  const [mobile, setMobile] = useState(false);

  const handleClick = () => {
    setMobile(!mobile);
  };

  return (
    <>
      {mobile && (
        <div
          onClick={handleClick}
          className="fixed inset-0 bg-black/30 z-30 md:hidden"
        />
      )}

      <div
        className={`${mobile ? "translate-x-0" : "translate-x-full"}
    fixed top-0 right-0 bottom-0 left-20 bg-white md:bg-transparent shadow-lg p-6
    flex flex-col gap-3 z-50
    transition-transform duration-300 ease-in-out
    md:static md:h-auto md:w-auto md:translate-x-0 md:flex-row md:shadow-none md:p-0
  `}
      >
        {user ? (
          <>
            <div className="rounded-xl p-3 text-china-red border border-china-red hover:bg-china-red hover:text-white" onClick={LogOut}>
              Log Out
            </div>
            <Link href="/create" className="rounded-xl p-3 text-china-red border border-china-red hover:bg-china-red hover:text-white">
              Create Post
            </Link>
          </>
        ) : (
          <>
            <Link
              href="/auth/login"
              className="rounded-xl p-3 text-china-red border border-china-red hover:bg-china-red hover:text-white"
              onClick={handleClick}
            >
              Log In
            </Link>
            <Link
              href="/auth/signup"
              className="rounded-xl p-3 text-china-red border border-china-red hover:bg-china-red hover:text-white"
              onClick={handleClick}
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
      <img
        src="/images/menu.png"
        alt="mobile size"
        className="h-5 w-5 md:hidden"
        onClick={handleClick}
      />
    </>
  );
};

export default AccountLinksClient;
