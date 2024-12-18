'use client'
import { useProductsByDiscount } from '@/common/useProducts'
import Categories from '@/components/categories'
import Container from '@/components/container'
import ProductItem from '@/components/productItem'
import { useActiveCategory } from '@/store/categories'
import { Product } from '@prisma/client'
import React, { useEffect } from 'react'

const Discounts = () => {
  const {productData, isLoading, refetch} = useProductsByDiscount()
  const activeCategory = useActiveCategory((state) => state.activeCategory)

  useEffect(() => {
    refetch()
  }, [activeCategory])

  return (
    <div className='p-5'>
      <Container>
        <Categories/>

        <div className='flex flex-col gap-5 sm:grid sm:grid-cols-2 lg:grid-cols-4 text-white'>
          { isLoading? 'Завантаження...': productData.length < 1? <p>На жаль сьогодні нема знижок на товари в цій категорії:(</p>:
            productData.map((data:Product) => (
              <ProductItem 
                name={data.name} 
                imageUrl={data.image} 
                description={data.description ?? ''} 
                price={data.price} 
                discount={data.discount ?? 0}
                id={data.id} 
              />
            ))
          }
        </div>
      </Container>
    </div>
  )
}

export default Discounts