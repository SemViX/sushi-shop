'use client'
import { useAddCategory } from '@/common/useCategories'
import Container from '@/components/container'
import Button from '@/components/ui/Button'
import { IAddCategoryInput } from '@/utils/propsTypes'
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form'

const AddCategory = () => {
    const router = useRouter()
    const {register, handleSubmit} = useForm<IAddCategoryInput>()
    const createCategory = useAddCategory()

    const onSubmit = (data:IAddCategoryInput) => {
        createCategory(data)
    }
    return (
    <div>
        <Container>
            <h1 className='text-2xl text-center font-bold text-white my-5'>Добавити категорію</h1>
            <div className='w-full flex items-center justify-between'>
                <ArrowLeft size={40} className='text-white hover:text-orange-500' onClick={() => router.back()}/>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className='mx-auto max-w-[600px] text-white flex flex-col gap-3'>
                <label className='w-full text-md font-semibold'>
                    Назва категорії: <br />
                    <input
                        type="text"
                        {...register('name', {required:true})} 
                        placeholder="Введіть назву категорії"
                        className='mt-1 w-full p-2 bg-black border-orange-500 border-2 rounded-lg outline-none focus:shadow-xl focus:shadow-orange-700/20'
                    />
                </label>
                <Button
                    title='Додати'
                    color='orange'
                    type='submit'
                    onClick={() => {}}
                    size='responsive'
                />
            </form>
        </Container>
    </div>
  )
}

export default AddCategory