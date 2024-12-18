'use client'
import { useEditUser } from '@/common/useUser'
import Container from '@/components/container'
import Button from '@/components/ui/Button'
import { IEditUserInput } from '@/utils/propsTypes'
import { ROUTES } from '@/utils/routes'
import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form'

const Profile =  () => {
  const editUser = useEditUser()
  const session = useSession()
  const {push} = useRouter()
  const {register, handleSubmit} = useForm<IEditUserInput>()

  const userData = session.data?.user;
  const userId = userData?.id
  const isAdmin = userData?.role === 'admin'

  const onSubmit = (data:IEditUserInput) => {
    const email = userData?.email ?? ''
    let {username, avatar} = data;
    if (!username) {
      username = userData?.username ?? `user${userId}`
    }
    if (!avatar) {
      avatar = userData?.avatar ?? '/images/default_avatar.png'
    }
    

    const newData:IEditUserInput = {
      username: username,
      avatar: avatar,
      email: email,
      id: Number(userData?.id)
    }
    console.log(newData)
    editUser(newData)
  }
  
  return (
    <div className='my-5'>
      <Container>
        <div className='flex flex-col items-center gap-3 md:grid grid-cols-2'>
          <div 
            style={{backgroundImage:`url(${userData?.avatar})`}} 
            className='max-w-[250px] max-h-[250px] w-screen h-screen bg-center bg-no-repeat bg-contain'
          />
          <form onSubmit={handleSubmit(onSubmit)} className=' text-white flex flex-col w-full items-center gap-4 my-3'>
            <label className='w-full text-md font-semibold'>
                Ім'я користувача: <br />
                <input
                    {...register('username')} 
                    type="text" 
                    defaultValue={userData?.username}
                    placeholder="Введіть ваш нікнейм"
                    className='mt-1 w-full p-2 bg-black border-orange-500 border-2 rounded-lg outline-none focus:shadow-xl focus:shadow-orange-700/20'
                />
            </label>
            <label className='w-full text-md font-semibold'>
                Електронна адреса: <br />
                <input
                    {...register('email')} 
                    type="email" 
                    placeholder="Введіть ваш електронну адресу"
                    value={userData?.email ?? ''}
                    readOnly
                    className='mt-1 w-full p-2 bg-black border-orange-500 border-2 rounded-lg outline-none focus:shadow-xl focus:shadow-orange-700/20'
                />
            </label>
            <label className='w-full text-md font-semibold'>
                Посилання на аватарку: <br />
                <input
                    {...register('avatar')} 
                    type="text"
                    defaultValue={userData?.avatar}
                    placeholder="Введіть вашe посилання"
                    className='mt-1 w-full p-2 bg-black border-orange-500 border-2 rounded-lg outline-none focus:shadow-xl focus:shadow-orange-700/20'
                />
            </label>
            <Button 
                color='orange'
                title='Зберегти зміни'
                size='responsive'
                type='submit'
                onClick={() => {}}
            />
          </form>
          <div className='flex flex-col gap-4 w-full md:w-[250px] border-t-2 border-orange-500 pt-5'>
            <Button
              color='red'
              title='Вийти'
              size='responsive'
              type='button'
              onClick={() => signOut()}
            />
            {isAdmin &&
              <Button
                color='orange'
                title='Панель адміністаротора'
                size='responsive'
                type='button'
                onClick={() => push(ROUTES.admin)}
              />
            }
          </div>
        </div>
      </Container>
    </div>
  )
}

export default Profile