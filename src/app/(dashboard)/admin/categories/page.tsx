'use client'
import { useCategoriesByName } from '@/common/useCategories'
import CategoryItem from '@/components/admin/categoryItem'
import Container from '@/components/container'
import Button from '@/components/ui/Button'
import { ICategoriesAdminProps } from '@/utils/propsTypes'
import { ROUTES } from '@/utils/routes'
import { Category, Product } from '@prisma/client'
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const AdminCategories = () => {
    const [searchQuery, setSearchQuery] = useState('')
    const router = useRouter()
    const {categoriesData, isLoading, refetch} = useCategoriesByName(searchQuery)
  
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
                title='Добавити категорію'
                color='orange'
                size='small'
                type='button'
                onClick={()=>router.push(ROUTES.add_category)}
            />
          </div>
          <form className='text-white m-5'>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Введіть назву категорії"
              className='mt-1 w-full p-2 bg-black border-orange-500 border-2 rounded-lg outline-none focus:shadow-xl focus:shadow-orange-700/20'
            />
          </form>
          <div className='my-5 flex flex-col gap-3 overflow-auto h-[500px] p-3 scroll-orange-500'>
            {isLoading? 'Завантаження...':
              categoriesData?.map((item:ICategoriesAdminProps) => (
                <CategoryItem
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    products={item.products}
                />
              ))
            }
          </div>
        </Container>
    </div>
  )
}

export default AdminCategories