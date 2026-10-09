'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"


const Navigation = () => {
  const path = usePathname()

  const navItem = ["Sweet", "Salt", "Spicy", "Crispy", "Drinks"]
  return(
    <nav className="flex justify-center md:gap-3 gap-2 py-4">
      {navItem.map((item, index) => {
        const href = `/categories/${item.toLowerCase()}`
        const isActive = path === href 
        return(
          <Link href={href} className={`rounded-xl p-3 border space-y-4 transition-colors
              ${isActive
                ? 'bg-china-red text-white border-china-red'
                : 'text-china-red border-china-red hover:bg-china-red hover:text-white'
              }`} key={index}>
            {item}
          </Link>
        )
      })}
    </nav>
  )
}

export default Navigation