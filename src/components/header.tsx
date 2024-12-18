'use client'
import { HEADER_LINKS } from '@/utils/constants'
import { ROUTES } from '@/utils/routes'
import { Menu, ShoppingCart, UserCircle2Icon, X } from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import HeaderMenu from './headerMenu'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { useCartItem } from '@/common/useCartItem'

const Header = () => {
    const path =  '/' + usePathname().split('/')[1]
    const [isActive, setActive] = useState(false)
    const {push} = useRouter()
    const session = useSession()
    const isAuth = session.status === 'authenticated'

    const {cartItemsData, isLoading, refetch} = useCartItem()
    const cartItemNum = cartItemsData?.data.length

    useEffect(() => {
        refetch()
    }, [isLoading])
    
  return (
    <header className='p-5 flex flex-row justify-between items-center'>
        <div className='block z-20 sm:hidden text-white' onClick={() => setActive(!isActive)}>
            {isActive? 
                <X size={36}/>:
                <Menu size={36}/>
            }   
        </div>
        <div className='text-white z-20 text-center text-xl font-bold hover:text-orange-500'>
            <Link href={ROUTES.main}>
                SEMVIX <br/>
                SUSHI
            </Link>
        </div>
        <nav className='text-white hidden sm:block z-20'>
            <ul className='flex gap-4 text-lg font-semibold'>
                {
                    HEADER_LINKS.map((link) => (
                        <li className={` hover:text-orange-500 ${path === link.link? 'text-orange-500':''} `} key={link.id}>
                            <Link href={link.link}>{link.title}</Link>
                        </li>
                    ))
                }
            </ul>
        </nav>
        <div className='text-white flex gap-5 z-20 items-center' >
            <div className='relative hover:text-orange-500' onClick={() => push(ROUTES.cart)}>
                <ShoppingCart  className='hover:text-orange-500' size={35}/>
                {!isLoading && isAuth &&  
                    <div className='absolute -right-2 -bottom-2 bg-orange-500 w-[25px] h-[25px] font-semibold cursor-pointer rounded-full flex items-center justify-center text-white' >
                        {cartItemNum}
                    </div>}
            </div>
            {isAuth? 
                <Link href={ROUTES.profile}>
                    <div
                        className='w-[50px] h-[50px] bg-center bg-no-repeat bg-contain rounded-full  sm:block' 
                        style={{backgroundImage:`url(${session.data.user.avatar})`}} 
                    />
                </Link>
            :
                <UserCircle2Icon onClick={() => push(ROUTES.signIn)} className='hover:text-orange-500 hidden sm:block mx-5' size={30}/>
            }
        </div>
        <HeaderMenu close={() => setActive(false)} className={isActive? 'block opacity-100 ' : `sm:hidden opacity-0 -z-10 pointer-events-none`}/>
    </header>
  )
}

export default Header