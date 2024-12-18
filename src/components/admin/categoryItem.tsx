import { ICategoriesAdminProps } from '@/utils/propsTypes'
import { ROUTES } from '@/utils/routes'
import Link from 'next/link'
import React from 'react'

const CategoryItem = ({id, name, products}:ICategoriesAdminProps) => {
  return (
    <div className='gap-3 bg-orange-500 p-2 rounded-xl text-white font-semibold hover:bg-orange-600'>
        <Link href={`${ROUTES.categories}/${id}`} 
        className='h-full w-full  flex flex-col sm:flex-row items-center justify-around '>
          <p>{id}</p>
          <p>{name}</p>
          <p>Кількість товарів в категорії: {products.length}</p>
        </Link>
    </div>
  )
}

export default CategoryItem