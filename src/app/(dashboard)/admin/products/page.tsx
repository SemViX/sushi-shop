'use client'
import { useProductsByName } from '@/common/useProducts'
import ProductItem from '@/components/admin/productItem'
import Container from '@/components/container'
import Button from '@/components/ui/Button'
import { ROUTES } from '@/utils/routes'
import { Product } from '@prisma/client'
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const AdminProducts = () => {
    const router = useRouter()
    const [searchQuery, setSearchQuery] = useState('')
    const {productData, isLoading, refetch} = useProductsByName(searchQuery)


    useEffect(() => {
        refetch()
    }, [searchQuery])

  return (
    <div>
        <Container>
          <h1 className='text-white text-2xl text-center font-bold my-5'>
            Продукти
          </h1>
          <div className='w-full flex items-center justify-between'>
            <ArrowLeft size={40} className='text-white hover:text-orange-500' onClick={() => router.back()}/>
            <Button
              type='button'
              color='orange'
              title='Добавити продукт'
              size='small'
              onClick={() => router.push(ROUTES.add_product)}
            />
          </div>
          <form className='text-white m-5'>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Введіть назву товару"
              className='mt-1 w-full p-2 bg-black border-orange-500 border-2 rounded-lg outline-none focus:shadow-xl focus:shadow-orange-700/20'
            />
          </form>
          <div className='my-5 flex flex-col gap-3 overflow-auto h-[500px] p-3 scroll-orange-500'>
            {isLoading? 'Завантаження...':
              productData?.map((item:Product) => (
                <ProductItem key={item.id} products={item}/>
              ))
            }
          </div>
        </Container>
    </div>
  )
}

export default AdminProducts