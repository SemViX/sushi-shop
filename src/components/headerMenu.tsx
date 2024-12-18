'use client'
import { HEADER_LINKS } from '@/utils/constants'
import { IHeaderProps } from '@/utils/propsTypes'
import { ROUTES } from '@/utils/routes'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'


const HeaderMenu = ({className, close}:IHeaderProps) => {
    const path = usePathname()
    const session = useSession()
    const isAuth = session.status === 'authenticated'

  return (
    <div className={`sm:hidden absolute z-10 left-0 right-0 top-0 bottom-0 bg-gray-900 transition-opacity ease-linear flex items-center justify-center ${className}`}>
        <nav className='text-white text-2xl text-center'>
            <ul className='flex flex-col gap-5'>
                {HEADER_LINKS.map((link) => (
                    <li key={link.id} onClick={() => close()} className={path === (link.link)? 'text-orange-500':''}>
                        <Link href={link.link}>
                            {link.title}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    </div>
  )
}

export default HeaderMenu