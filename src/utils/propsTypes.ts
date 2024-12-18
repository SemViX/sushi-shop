import { Category, Product, User } from "@prisma/client";
import { ReactNode } from "react";

export interface IContainerProps{
    children: ReactNode
}

export interface IHeaderProps {
    className?: string
    close: Function
}

export interface IButtonProps{
    className?: string
    color: string
    size: string
    title: string | ReactNode
    type: 'submit' | 'button'
    onClick: Function
}

export interface IProviderProps{
    children: ReactNode
}

export interface IProductsProps{
    id: number
    name: string
    price: number
    imageUrl: string
    description: string
    discount: number
}

export interface IRegistrationInput{
    username: string
    email: string
    password: string
    avatar: string 
}

export interface ISingInInput{
    email: string
    password: string
}

export interface IEditUserInput{
    id: number
    username: string
    email: string
    avatar: string 
}

export interface CartItemData{
    product: Product
    quantity: number
    id: number
}

export interface IUserProps{
    user: User
}

export interface IProductAdminProps{
    products: Product
}

export interface ICategoriesAdminProps{
    id:number
    name:string
    products: Product[]
}

export interface IAddCategoryInput{
    name:string
}

export interface IAddProductInput{
    name: string
    description: string
    price: number
    discount: number
    category: string
    image: string
}
