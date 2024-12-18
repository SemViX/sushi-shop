'use client'
import { useAllUser } from '@/common/useUser'
import UserItem from '@/components/admin/userItem'
import Container from '@/components/container'
import { User } from '@prisma/client'
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const Users = () => {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const {usersData, isLoading, refetch} = useAllUser(searchQuery)

  useEffect(() => {
    refetch()
  }, [searchQuery])

  return (
    <div>
      <Container>
        <h1 className='text-white text-2xl text-center font-bold my-5'>
          Користувачі
        </h1>
        <div className='w-full flex items-center justify-between'>
          <ArrowLeft size={40} className='text-white hover:text-orange-500' onClick={() => router.back()}/>
        </div>
        <form className='text-white m-5'>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Введіть ім'я користувача"
            className='mt-1 w-full p-2 bg-black border-orange-500 border-2 rounded-lg outline-none focus:shadow-xl focus:shadow-orange-700/20'
          />
        </form>
        <div className='my-5 flex flex-col gap-3 overflow-auto h-[500px] p-3 scroll-orange-500'>
          {isLoading? 'Завантаження...':
            usersData?.map((item:User) => (
              <UserItem key={item.id} user={item}/>
            ))
          }
        </div>
      </Container>
    </div>
  )
}

export default Users