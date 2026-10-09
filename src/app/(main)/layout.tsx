import Header from "@/component/Header"
import { ReactNode } from "react"
import Navigation from "@/component/Navigation"

const MainLayout = ({children}:{children:ReactNode}) => {
  return(
    <>
      <Header />
      <Navigation />
      {children}
    </>
  )
}

export default MainLayout