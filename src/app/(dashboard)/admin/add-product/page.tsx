'use client'
import { useCategories } from '@/common/useCategories'
import { useCreateProduct } from '@/common/useProducts'
import Container from '@/components/container'
import Button from '@/components/ui/Button'
import { IAddProductInput } from '@/utils/propsTypes'
import { ErrorMessage } from '@hookform/error-message'
import { Category } from '@prisma/client'
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form'

const AddProduct = () => {
  const router = useRouter()
  const {register, handleSubmit, formState: {errors}} = useForm<IAddProductInput>()
  const {categoriesData, isLoading} = useCategories()
  const createProduct = useCreateProduct()

  const onSubmit = (data:IAddProductInput) => {
    createProduct(data)
  }

  return (
    <div className='p-5'>
      <Container>
        <h1 className='text-white text-center text-2xl font-bold my-3'>
          Добавити продукт
        </h1>
        <div className='flex'>
          <ArrowLeft size={40} className='text-white hover:text-orange-500' onClick={() => router.back()}/>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className='my-3 flex flex-col gap-3 mx-auto max-w-[600px] text-white'>
          <label className='w-full text-md font-semibold'>
            Назва продукту: <br />
            <input
                type="text"
                {...register('name', {required:true})} 
                placeholder="Введіть назву продукту"
                className='mt-1 w-full p-2 bg-black border-orange-500 border-2 rounded-lg outline-none focus:shadow-xl focus:shadow-orange-700/20'
            />
          </label>
          <label className='w-full text-md font-semibold'>
            Посилання на фото: <br />
            <input
                type="text"
                {...register('image', {required:true})} 
                placeholder="Введіть посилання на фото продукту"
                className='mt-1 w-full p-2 bg-black border-orange-500 border-2 rounded-lg outline-none focus:shadow-xl focus:shadow-orange-700/20'
            />
          </label>
          <label className='w-full text-md font-semibold'>
            Опис продукту: <br />
            <textarea
                {...register('description', {required:true})} 
                placeholder="Введіть опис продукту"
                className='mt-1 w-full p-2 bg-black border-orange-500 border-2 rounded-lg outline-none focus:shadow-xl focus:shadow-orange-700/20 resize-none h-[150px]'
            />
          </label>
          <label className='w-full text-md font-semibold'>
            Ціна продукту(в гривнях): <br />
            <input
                type="number"
                {...register('price', {required:true})} 
                placeholder="Введіть ціну продукту"
                className='mt-1 w-full p-2 bg-black border-orange-500 border-2 rounded-lg outline-none focus:shadow-xl focus:shadow-orange-700/20'
            />
          </label>
          <label className='w-full text-md font-semibold'>
            Знижка продукту(у відсотках): <br />
            <input
                type="number"
                {...register('discount', {required:true, 
                                          max:{value:100, message:'Знижка не можу бути більшою за 100%'},
                                          min:{value:0, message:'Знижка не може бути меншою 0%'}})} 
                placeholder="Введіть знижку продукту"
                className='mt-1 w-full p-2 bg-black border-orange-500 border-2 rounded-lg outline-none focus:shadow-xl focus:shadow-orange-700/20'
            />
          </label>
          {errors.discount? <p className='text-red-500 font-semibold'>{errors.discount.message}</p> : ''}
          <label className='w-full text-md font-semibold'>
            Категорія продукту: <br />
            <select 
              className='mt-1 w-full p-2 bg-black border-orange-500 border-2 rounded-lg outline-none focus:shadow-xl focus:shadow-orange-700/20'
              {...register('category', {required:true})} 
            >
              <option defaultChecked disabled>Виберіть категорію</option>
              {isLoading? 'Завантаження...':
                categoriesData.map((category:Category) => (
                  <option key={category.id}>{category.name}</option>
                ))
              }
            </select>
          </label>

          <Button
            title='Додати продукт'
            color='orange'
            size='responsive'
            type='submit'
            onClick={() => {}}
          />
        </form>
      </Container>
    </div>
  )
}

export default AddProduct