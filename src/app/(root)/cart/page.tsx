'use client'
import { useCartItem } from '@/common/useCartItem'
import CartProductItem from '@/components/cartItem'
import Container from '@/components/container'
import { CartItemData } from '@/utils/propsTypes'
import { totalPrice } from '@/utils/totalCartPrice'
import { CartItem } from '@prisma/client'
import { useSession } from 'next-auth/react'
import React, { useEffect } from 'react'

const Cart = () => {

  const userData = useSession();

  const {cartItemsData, isLoading, refetch} = useCartItem()

  useEffect(() => {
    refetch()
  }, [userData])

  return (
    <div className='text-white m-3 p-4'>
      <Container>
        <div className='flex flex-col items-center gap-2'>
          <h1 className='text-3xl font-bold'>Корзина</h1>
          <div className='p-4 mt-3 flex flex-col gap-2 max-w-[700px] w-screen'>
            {isLoading? 'Зантаження...':
              cartItemsData?.data.map((cartItem:CartItemData) => (
                <CartProductItem
                  key={cartItem.id}
                  quantity={cartItem.quantity}
                  id={cartItem.id}
                  product={cartItem.product}
                />
              ))
            }
          {!isLoading && 
            <p className='mr-auto my-5 text-xl font-sans-semibold'>
              Загальна вартість: 
              <span className='text-orange-500 font-bold'>{ totalPrice(cartItemsData?.data.map((item:CartItemData) => item.product.price * item.quantity)) } грн.</span>
            </p>}
          </div>
        </div>
      </Container>
    </div>
  )
}

export default Cart