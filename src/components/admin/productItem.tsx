import { IProductAdminProps } from '@/utils/propsTypes'
import { ROUTES } from '@/utils/routes'
import Link from 'next/link'
import React from 'react'

const ProductItem = ({products}:IProductAdminProps) => {
  return (
    <div className=' bg-orange-500 p-2 rounded-xl text-white font-semibold hover:bg-orange-600'>
      <Link href={`${ROUTES.admin_products}/${products.id}`} className=' flex flex-col sm:flex-row items-center justify-between gap-3'>
        <p>{products.id}</p>
        <p>{products.name}</p>
        <div 
            style={{backgroundImage:`url(${products.image})`}}
            className='h-[40px] w-[40px] bg-contain bg-center bg-no-repeat'
        />
        <p>{products.price} грн.</p>
        
      </Link>
</div>
  )
}

export default ProductItem