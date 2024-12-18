import { useMutation, useQueries, useQuery } from "react-query";
import { prisma } from "../../prisma/prisma-client";
import axios from "axios";
import { BASE_DIR } from "@/utils/constants";
import { useSession } from "next-auth/react";


export  function useCartItem(){
    const userId = useSession().data?.user.id

    const {data, isLoading, refetch} = useQuery({
        queryKey:['cart items'],
        queryFn: async () => {
            return await axios.get(`${BASE_DIR}/cartItem`, {params:{userId}})
        }
    })

    return {cartItemsData:data, isLoading, refetch}
}

export function useAddToCart(userId:number){
    const {refetch} = useCartItem()

    const {mutate} = useMutation({
        mutationKey: ['add to cart'],
        mutationFn: async (productId:number) => {
            return await axios.post(`${BASE_DIR}/cartItem`, productId, {params: {userId}})
        },
        onSuccess(){
            refetch()
        }
    })

    return mutate
}

export function useChangeQuantity(cartItemId:number){
    const {refetch} = useCartItem()
    const {mutate} = useMutation({
        mutationKey:['change quantity'],
        mutationFn: async (number:number) => {
            return await axios.put(`${BASE_DIR}/cartItem`, number,{params:{cartItemId}})
        },
        onSuccess(){
            refetch()
        }
        
    })

    return mutate
}

export function useDeleteCartItem(){
    const {refetch} = useCartItem()
    const {mutate} = useMutation({
        mutationKey: ['delete cart item'],
        mutationFn: async (id:number) => {
            return axios.delete(`${BASE_DIR}/cartItem`, {params:{id}})
        },
        onSuccess(){
            refetch()
            
        }
    })

    return mutate
}