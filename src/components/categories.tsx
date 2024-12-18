import { useCategories } from '@/common/useCategories'
import { useActiveCategory } from '@/store/categories'
import { Category } from '@prisma/client'
import React from 'react'
import { text } from 'stream/consumers'

const Categories = () => {
    const {categoriesData, isLoading} = useCategories()
    const {activeCategory, setActiveCategory} = useActiveCategory((state) => state)
  return (
    <div className='w-full p-2 bg-black/50 my-10 rounded-xl font-semibold text-white flex justify-around shadow-lg shadow-orange-500/30 flex-wrap gap-3'>
        {isLoading? 'завантаження...':
            categoriesData?.map((category:Category) => (
                <p className={`hover:text-orange-500 cursor-pointer ${activeCategory === category.id? 'text-orange-500':''}`} key={category.id} onClick={() => setActiveCategory(category.id)}>
                    {category.name}
                </p>
            ))
        }
    </div>
  )
}

export default Categories