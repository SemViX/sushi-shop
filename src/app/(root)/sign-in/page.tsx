'use client'
import Container from '@/components/container'
import Button from '@/components/ui/Button'
import { ISingInInput } from '@/utils/propsTypes'
import { ROUTES } from '@/utils/routes'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form'

const SignIn = () => {
    const {register, handleSubmit, formState:{errors}} = useForm<ISingInInput>({mode:'onChange'})
    const router = useRouter()

    const onSubmit = async(data:ISingInInput) => {
        const signInData = await signIn('credentials', {
            email: data.email,
            password: data.password,
            redirect: false
        })
        if (signInData?.error){
            console.log(signInData.error)
        }
        else{
            router.push(ROUTES.main)
        }

    }
  return (
    <div className='p-5 my-5 flex flex-col items-center justify-center text-white'>
        <Container>
            <div className='flex flex-col items-center bg-black/70 p-5 rounded-xl shadow-xl shadow-orange-500/30 max-w-[400px] w-screen m-1'>
                <h1 className='text-3xl font-bold'>Вхід</h1>
                <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col w-full items-center gap-4 my-3'>
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
                    <label className='w-full text-md font-semibold'>
                        Пароль: <br />
                        <input
                            {...register('password', {required:true, minLength:{value:8, message:'Мінімальна довжина паролю 8 символів'}})} 
                            type="password" 
                            placeholder="Введіть ваш пароль"
                            className='mt-1 w-full p-2 bg-black border-orange-500 border-2 rounded-lg outline-none focus:shadow-xl focus:shadow-orange-700/20'
                        />
                    </label>
                    <Button 
                        color='orange'
                        title='Увійти'
                        size='responsive'
                        type='submit'
                        onClick={() => {}}
                    />
                </form>
                <p>
                    Ще не маєте акаунту? <Link className='text-orange-500 font-bold' href={ROUTES.registration}>Зареєструватись   </Link>
                </p>
            </div>
        </Container>
    </div>
  )
}

export default SignIn