import { useChangeQuantity, useDeleteCartItem } from '@/common/useCartItem'
import { CartItemData } from '@/utils/propsTypes'
import { Minus, Plus, X } from 'lucide-react'
import React from 'react'

const CartProductItem = ({id, product, quantity}:CartItemData) => {

    const changeQuantity = useChangeQuantity(id)
    const deleteCartItem = useDeleteCartItem()
  return (
    <div className='flex flex-col items-center sm:flex-row justify-between gap-3 w-full p-3 bg-black/70 rounded-xl shadow-lg shadow-orange-500/20'>
        <div 
            className='w-[50px] h-[50px] bg-no-repeat bg-contain bg-center'
            style={{backgroundImage:`url(${product.image})`}}
        />
        <p>{product.name}</p>
        <div className='flex gap-1'>
            <p>Кількість:</p>
            {quantity > 1 && <Minus className='hover:text-orange-500' onClick={() => changeQuantity(-1)}/>}
            {quantity}
            <Plus className='hover:text-orange-500' onClick={() => changeQuantity(1)} />
        </div>
        <p>
            Вартість: <span className='text-orange-500'>{product.price * quantity} грн.</span>
        </p>
        <div className='cursor-pointer hover:text-orange-500' onClick={() => deleteCartItem(id)}>
            <X/>
        </div>
    </div>
  )
}

export default CartProductItem