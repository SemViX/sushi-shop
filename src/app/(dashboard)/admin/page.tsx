import Container from '@/components/container'
import Button from '@/components/ui/Button'
import { ROUTES } from '@/utils/routes'
import { ArrowLeft } from 'lucide-react'
import { getSession } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <div className='p-2'>
      <Container>
        <h1 className='text-center text-2xl font-bold my-10 text-white'>Панель адміністратора</h1>
        <div className='flex flex-col gap-5 items-center my-5 '>
            <Link className='w-full bg-orange-500 hover:bg-orange-600 p-3 rounded-xl text-center text-white text-xl' href={ROUTES.users}>Користувачі</Link>
            <Link className='w-full bg-orange-500 hover:bg-orange-600 p-3 rounded-xl text-center text-white text-xl' href={ROUTES.admin_products}>Продукти</Link>
            <Link className='w-full bg-orange-500 hover:bg-orange-600 p-3 rounded-xl text-center text-white text-xl' href={ROUTES.categories}>Категорії</Link>
        </div>
        <Link className='flex items-center justify-center gap-2 mt-5 max-w-[300px] bg-red-500 hover:bg-red-600 p-3 rounded-xl text-white' href={ROUTES.profile}>
          <ArrowLeft/> Повернутись у профіль
        </Link>
      </Container>
    </div>
  )
}

export default page