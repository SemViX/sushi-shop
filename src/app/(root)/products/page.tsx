'use client'
import { useProducts } from '@/common/useProducts'
import Categories from '@/components/categories'
import Container from '@/components/container'
import ProductItem from '@/components/productItem'
import { useActiveCategory } from '@/store/categories'
import { Product } from '@prisma/client'
import React, { useEffect } from 'react'


const Products = () => {
  const activeId = useActiveCategory((state) => state.activeCategory)
  const {productsData, isLoading, refetch} = useProducts()


  useEffect(()=>{
    refetch()
  }, [activeId])

  return (
    <div className='p-5'>
      <Container>
        <Categories/>
        <div className='flex flex-col gap-5 sm:grid sm:grid-cols-2 lg:grid-cols-4'>
          {isLoading? 'Завантаження...': 
          productsData.map((product:Product) => (
            <ProductItem
              key={product.id}
              id={product.id} 
              name={product.name} 
              description={product.description ?? ''} 
              price={product.price} 
              imageUrl={product.image}
              discount={product.discount ?? 0} 
            />
          ))}
        </div>
      </Container>
    </div>
  )
}

export default Products