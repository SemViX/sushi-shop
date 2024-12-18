'use client'
import { useCreateUser } from '@/common/useUser'
import Container from '@/components/container'
import Button from '@/components/ui/Button'
import { IRegistrationInput } from '@/utils/propsTypes'
import { ROUTES } from '@/utils/routes'
import { ErrorMessage } from '@hookform/error-message'
import Link from 'next/link'
import React from 'react'
import { useForm } from 'react-hook-form'

const Registration = () => {
    const {register, handleSubmit, formState:{errors}} = useForm<IRegistrationInput>({mode:'onChange'})
    
    const createUser = useCreateUser()

    const onSubmit = (data:IRegistrationInput) => {
        if (!data.avatar) {
            data.avatar = '/images/default_avatar.png'           
        }
        createUser(data)
    }
  return (
    <div className='p-5 my-5 flex flex-col items-center justify-center text-white'>
        <Container>
            <div className='flex flex-col items-center bg-black/70 p-5 rounded-xl shadow-xl shadow-orange-500/30 max-w-[400px] w-screen m-1'>
                <h1 className='text-3xl font-bold'>Реєстрація</h1>
                <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col w-full items-center gap-4 my-3'>
                    <label className='w-full text-md font-semibold'>
                        Ім'я користувача: <br />
                        <input
                            {...register('username', {required:true})} 
                            type="text" 
                            placeholder="Введіть ваш нікнейм"
                            className='mt-1 w-full p-2 bg-black border-orange-500 border-2 rounded-lg outline-none focus:shadow-xl focus:shadow-orange-700/20'
                        />
                    </label>
                    <label className='w-full text-md font-semibold'>
                        Пароль: <br />
                        <input
                            {...register('password', {required:true, minLength:{value:8, message:'Мінімальна довжина паролю 8 символів'}})} 
                            type="password" 
                            placeholder="Введіть ваш пароль"
                            className='mt-1 w-full p-2 bg-black border-orange-500 border-2 rounded-lg outline-none focus:shadow-xl focus:shadow-orange-700/20'
                        />
                    </label>
                    {errors.password && <p className='text-red-700'>{errors.password.message}</p>}
                    <label className='w-full text-md font-semibold'>
                        Електронна адреса: <br />
                        <input
                            {...register('email', {required:true})} 
                            type="email" 
                            placeholder="Введіть ваш електронну адресу"
                            className='mt-1 w-full p-2 bg-black border-orange-500 border-2 rounded-lg outline-none focus:shadow-xl focus:shadow-orange-700/20'
                        />
                    </label>
                    <ErrorMessage errors={errors} name='email'/>
                    <label className='w-full text-md font-semibold'>
                        Посилання на аватарку(не обов'язково): <br />
                        <input
                            {...register('avatar')} 
                            type="text"
                            placeholder="Введіть вашe посилання"
                            className='mt-1 w-full p-2 bg-black border-orange-500 border-2 rounded-lg outline-none focus:shadow-xl focus:shadow-orange-700/20'
                        />
                    </label>

                    <Button 
                        color='orange'
                        title='Зареєструватись'
                        size='responsive'
                        type='submit'
                        onClick={() => {}}
                    />
                </form>
                <p>
                    Уже маєте акаунт? <Link className='text-orange-500 font-bold' href={ROUTES.signIn}>Увійти</Link>
                </p>
            </div>
        </Container>
    </div>
  )
}

export default Registration