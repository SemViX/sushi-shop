import { IContainerProps } from '@/utils/propsTypes'
import React, { ReactNode } from 'react'


const Container = ({children}:IContainerProps) => {
  return (
    <div className='mx-5 sm:mx-20'>
        {children}
    </div>
  )
}

export default Container