import { BASE_DIR } from "@/utils/constants";
import { IEditUserInput, IRegistrationInput } from "@/utils/propsTypes";
import { ROUTES } from "@/utils/routes";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useMutation, useQuery } from "react-query";


export function useCreateUser(){
    const router = useRouter()

    const {mutate} = useMutation({
        mutationKey:['create user'],
        mutationFn: async (data:IRegistrationInput) => {
            return await axios.post(`${BASE_DIR}/user`, data)
        },
        onError(error:any) {
            alert(error.response.data.error)
        },
        onSuccess(){
            router.push(ROUTES.signIn)
        }
    })

    return mutate
}

export function useEditUser(){
    const router = useRouter()
    const {update} = useSession()

    const {mutate} = useMutation({
        mutationKey:['edit user'],
        mutationFn: async (data:IEditUserInput) => {
            return await axios.put(`${BASE_DIR}/user`, data)
        },
        onSuccess({data}){
            update(data)
            router.refresh()
        },
        onError(error, variables, context) {
            console.log(error)
        },
    })

    return mutate
}

export function useAllUser(searchQuery:string) {
    const {data, isLoading, refetch} = useQuery({
        queryKey: ['get all users'],
        queryFn: async () => {
            return (await axios.get(`${BASE_DIR}/user`, {params:{searchQuery}})).data
        }
    })

    return {usersData: data, isLoading, refetch}
}

export function useDeleteUser(id:number){
    const {refetch} = useAllUser('')
    const {mutate} = useMutation({
        mutationKey: ['delete user'],
        mutationFn: async () => {
            return axios.delete(`${BASE_DIR}/user`, {params:{id}})
        },
        onSuccess(){
            refetch()
        }
    })

    return mutate
} 