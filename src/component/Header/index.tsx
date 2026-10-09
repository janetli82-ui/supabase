import Link from "next/link"
import AccountLinks from "../AccountLinks"
import Search from "./search"




const Header = () => {
  return(
    <header className="p-4 flex justify-between items-center bg-white border-b border-border sticky top-0 z-50 shadow-sm">
      <Link href="/">
        <img src="/images/logo.png" alt="logo" className="h-14 w-14 rounded-full"/>
      </Link>
      <Search />
      <AccountLinks />
    </header>
  )
}

export default Header