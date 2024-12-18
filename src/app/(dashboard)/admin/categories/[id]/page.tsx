'use client'
import { useCategories, useCategoriesByName, useDeleteCategory, useUpdateCategory } from '@/common/useCategories'
import Container from '@/components/container'
import Button from '@/components/ui/Button'
import { IAddCategoryInput } from '@/utils/propsTypes'
import {Category} from '@prisma/client'
import { ArrowLeft } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

const AdminCategory = () => {
  const categoryId = useParams()
  const {categoriesData, isLoading, refetch} = useCategories()
  const categoryName = categoriesData?.filter((item:Category) => item.id === Number(categoryId.id))[0]
  const router = useRouter()
  const deleteCategory = useDeleteCategory(Number(categoryId.id))
  const {register, handleSubmit} = useForm<IAddCategoryInput>({defaultValues:{name:categoryName?.name}})
  const updateCat = useUpdateCategory(Number(categoryId.id))

  useEffect(() => {
    refetch()
  }, [isLoading])

  const onSubmit = (data:IAddCategoryInput) =>{
    updateCat(data)
  }
  return (
    <div className='p-3'>
        <Container>
            <h1 className='my-2 uppercase text-center text-white text-2xl font-bold'>
              {categoryName?.name}
            </h1>
            <div className='w-full flex justify-between items-center'>
              <ArrowLeft size={40} className='text-white hover:text-orange-500' onClick={() => router.back()}/>
              <Button
                title='Видалити категорію'
                color='red'
                size='small'
                type='button'
                onClick={() => deleteCategory()}
              />
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className='my-5 m-w-[600px] flex flex-col gap-3 items-center text-white'>
              <label className='w-full text-md font-semibold'>
                  Назва категорії: <br />
                  <input
                      type="text"
                      {...register('name', {required:true})} 
                      placeholder="Введіть нову назву категорії"
                      className='mt-1 w-full p-2 bg-black border-orange-500 border-2 rounded-lg outline-none focus:shadow-xl focus:shadow-orange-700/20'
                  />
              </label>
              <Button
                title='Зберегти зміни'
                color='orange'
                size='responsive'
                type='submit'
                onClick={()=>{}}
              />
            </form>
        </Container>
    </div>
  )
}

export default AdminCategory