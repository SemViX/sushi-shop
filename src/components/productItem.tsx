
import { IProductsProps } from '@/utils/propsTypes'
import Image from 'next/image'
import React from 'react'
import Button from './ui/Button'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { ROUTES } from '@/utils/routes'
import { useAddToCart } from '@/common/useCartItem'

const ProductItem = ({name, description, imageUrl, price, discount, id}:IProductsProps) => {
  const isDiscount = discount > 0;
  const priceWithDiscount = price - (price * (discount/100));

  const session = useSession();
  const router = useRouter();
  const addToCart = useAddToCart(Number(session.data?.user.id))

  const isAuth = session.status === 'authenticated' 
  const handleClick = () => {
    if (!isAuth){
      router.push(ROUTES.signIn)
    }
    else{
      addToCart(id)
    }
  }

  return (
    <div className='p-3 w-full bg-black/50 rounded-xl shadow-xl shadow-orange-500/30 flex flex-col items-center gap-3'>
        <div className='h-[120px] w-[120px] bg-center bg-contain bg-no-repeat' 
          style={{backgroundImage:`url(${imageUrl})`}}/>
        <h1 className='text-white text-2xl font-bold text-center'>
          {name}
        </h1>
        <p className='text-white/80 text-center max-w-full'>{description}</p>
        <p className='text-white text-xl'>
          Вартість: <span className={isDiscount? 'text-red-700 font-bold':'text-orange-500'}>{isDiscount? priceWithDiscount : price} грн.</span>
        </p>
        <Button 
          className='mt-auto' 
          type='button' 
          title='Замовити' 
          color='orange' 
          size='responsive' 
          onClick={handleClick}
        />
    </div>
  )
}

export default ProductItem