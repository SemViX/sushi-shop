import { IUserProps } from '@/utils/propsTypes'
import { User } from '@prisma/client'
import React from 'react'
import Button from '../ui/Button'
import { useDeleteUser } from '@/common/useUser'
import { Trash } from 'lucide-react'

const UserItem = ({user}:IUserProps) => {
    const deleteUser = useDeleteUser(user.id)
  return (
    <div className=' flex flex-col sm:flex-row items-center justify-between gap-3 bg-orange-500 p-2 rounded-xl text-white font-semibold hover:bg-orange-600'>
        <p>{user.id}</p>
        <div 
            style={{backgroundImage:`url(${user.avatar})`}}
            className='h-[40px] w-[40px] bg-contain bg-center bg-no-repeat'
        />
        <p>{user.username}</p>
        <p>{user.email}</p>
        <p>{user.role}</p>
        {user.role !== 'admin' && 
          <Button
            type='button'
            title={<Trash/>}
            color='red'
            size='small'
            onClick={() => deleteUser()}
          />
        }        
    </div>
  )
}

export default UserItem