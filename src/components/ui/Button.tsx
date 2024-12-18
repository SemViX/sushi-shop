'use client'
import { IButtonProps } from '@/utils/propsTypes'
import { useSession } from 'next-auth/react'
import React from 'react'

const Button = ({color, size, title, onClick, className, type}:IButtonProps) => {
    const btn_color = {
        'orange': 'bg-orange-500 text-white shadow-md shadow-orange-700 hover:bg-orange-600 active:bg-orange-700',
        'red': 'bg-red-500 text-white shadow-md shadow-red-700 hover:bg-red-600 active:bg-red-700'
    }[color]

    const btn_size = {
        'big': 'p-2 rounded-xl text-xl  w-[300px]',
        'responsive': 'p-2 rounded-xl text-xl font-bold w-full',
        'small': 'p-2 rounded-xl text-xl font-bold'
    }[size]

    
    return (
    <button type={type} className={`${btn_color} ${btn_size} ${className}`} onClick={() => onClick()}>{title}</button>
  )
}

export default Button