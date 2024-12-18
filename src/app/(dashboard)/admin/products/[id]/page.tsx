'use client'
import { useCategories } from '@/common/useCategories'
import { useDeleteProduct, useProductById, useUpdateData } from '@/common/useProducts'
import Container from '@/components/container'
import Button from '@/components/ui/Button'
import { IAddProductInput } from '@/utils/propsTypes'
import { Category } from '@prisma/client'
import { ArrowLeft } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

const AdminProduct = () => {
    const prodId = useParams().id
    const router = useRouter()
    const deleteProduct = useDeleteProduct(Number(prodId))
    const {productData, isLoading} = useProductById(Number(prodId))
    
    const {register, handleSubmit, formState: {errors}} = useForm<IAddProductInput>({mode: 'onChange', defaultValues:productData})
    const {categoriesData, isLoading:isCategoryLoading} = useCategories()
    const updateData = useUpdateData(Number(prodId))
    useEffect(() => {
      router.refresh()
    }, [isLoading])

    const onSubmit = (data:IAddProductInput) => {
      updateData(data)
    }
  return (
    <div>
        <Container>
            <h1 className='text-center text-white text-2xl font-bold my-3 uppercase'>
              {productData?.name}
            </h1>
            <div className='flex items-center justify-between'>
                <ArrowLeft size={40} className='text-white hover:text-orange-500' onClick={() => router.back()}/>
                <Button
                  title='Видалити продукт'
                  color='red'
                  size='small'
                  type='button'
                  onClick={()=> deleteProduct()}
                />
            </div>
            {isLoading? 'Завантаження...' :
                <form onSubmit={handleSubmit(onSubmit)} className='my-3 flex flex-col gap-3 mx-auto max-w-[600px] text-white'>
                  <label className='w-full text-md font-semibold'>
                    Назва продукту: <br />
                    <input
                        type="text"
                        {...register('name', {required:false})} 
                        placeholder="Введіть назву продукту"
                        defaultValue={productData?.name}
                        className='mt-1 w-full p-2 bg-black border-orange-500 border-2 rounded-lg outline-none focus:shadow-xl focus:shadow-orange-700/20'
                    />
                </label>
                <label className='w-full text-md font-semibold'>
                  Посилання на фото: <br />
                  <input
                      type="text"
                      {...register('image', {required:false})} 
                      placeholder="Введіть посилання на фото продукту"
                      defaultValue={productData.image}
                      className='mt-1 w-full p-2 bg-black border-orange-500 border-2 rounded-lg outline-none focus:shadow-xl focus:shadow-orange-700/20'
                  />
                </label>
                <label className='w-full text-md font-semibold'>
                  Опис продукту: <br />
                  <textarea
                      {...register('description', {required:false})} 
                      placeholder="Введіть опис продукту"
                      defaultValue={productData.description}
                      className='mt-1 w-full p-2 bg-black border-orange-500 border-2 rounded-lg outline-none focus:shadow-xl focus:shadow-orange-700/20 resize-none h-[150px]'
                  />
                </label>
                <label className='w-full text-md font-semibold'>
                  Ціна продукту(в гривнях): <br />
                  <input
                      type="number"
                      {...register('price', {required:false})} 
                      placeholder="Введіть ціну продукту"
                      defaultValue={productData.price}
                      className='mt-1 w-full p-2 bg-black border-orange-500 border-2 rounded-lg outline-none focus:shadow-xl focus:shadow-orange-700/20'
                  />
                </label>
                <label className='w-full text-md font-semibold'>
                  Знижка продукту(у відсотках): <br />
                  <input
                      type="number"
                      {...register('discount', {required:false, 
                                                max:{value:100, message:'Знижка не можу бути більшою за 100%'},
                                                min:{value:0, message:'Знижка не може бути меншою 0%'}})} 
                      placeholder="Введіть знижку продукту"
                      defaultValue={productData.discount}
                      className='mt-1 w-full p-2 bg-black border-orange-500 border-2 rounded-lg outline-none focus:shadow-xl focus:shadow-orange-700/20'
                  />
                </label>
                {errors.discount? <p className='text-red-500 font-semibold'>{errors.discount.message}</p> : ''}
                <label className='w-full text-md font-semibold'>
                  Категорія продукту: <br />
                  <select
                    defaultValue={productData.category.name}
                    className='mt-1 w-full p-2 bg-black border-orange-500 border-2 rounded-lg outline-none focus:shadow-xl focus:shadow-orange-700/20'
                    {...register('category', {required:false})} 
                  >
                    <option defaultChecked >{productData.category.name}</option>
                    {isCategoryLoading? 'Завантаження...':
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
            }
        </Container>
    </div>
  )
}

export default AdminProduct