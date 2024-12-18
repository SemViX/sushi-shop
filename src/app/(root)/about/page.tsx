'use client'
import { SOCIALS } from '@/utils/constants'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const About = () => {
  return (
    <div className='p-5 gap-5 flex flex-col items-center sm:flex-row justify-around h-full'>
      <div className='text-white text-xl flex flex-col gap-4'>
        <p>Номер телофону: <span className='font-bold text-orange-500'>
          +380960360101</span>
        </p>
        <p>
          Адреса: <span className='font-bold text-orange-500'>м. Виноградів, вул.Борканюка, 1/1 </span>
        </p>
        <p>
          Шеф-повар: <span className='font-bold text-orange-500'>Семен В. В</span>
        </p>
        <div className='flex gap-3'>
          {
            SOCIALS.map((soc) => (
              <div key={soc.id} className='border-white border-2 p-2 rounded-lg hover:text-orange-500 hover:border-orange-500'>
                <Link href={soc.link} target='blank' className='h-full w-full'>
                  <soc.icon/>
                </Link>
              </div>
            ))
          }
        </div>
      </div>
      
      <div className='border-4  border-orange-500'>
        <Image src={'/map.png'} height={500} width={500} alt=''/>
      </div>
    </div>
  )
}

export default About