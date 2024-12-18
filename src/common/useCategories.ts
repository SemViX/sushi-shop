import { BASE_DIR } from "@/utils/constants";
import { IAddCategoryInput } from "@/utils/propsTypes";
import { ROUTES } from "@/utils/routes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useMutation, useQuery } from "react-query";


export function useCategories(){
    const {data, isLoading, refetch} = useQuery({
        queryKey:['categories'],
        queryFn: async () => {
            return (await axios.get(`${BASE_DIR}/categories`)).data
        }
    })

    return {categoriesData:data, isLoading, refetch}
}

export function useCategoriesByName(searchQuery:string){
    const {data, isLoading, refetch} = useQuery({
        queryKey:['categories by name'],
        queryFn: async () => {
            return (await axios.get(`${BASE_DIR}/categories/getByName`, {params:{searchQuery}})).data
        }
    })

    return {categoriesData:data, isLoading, refetch}
}

export function useAddCategory(){
    const router = useRouter()
    const {mutate} = useMutation({
        mutationKey:['add category'],
        mutationFn: async (data:IAddCategoryInput) =>{
            return await axios.post(`${BASE_DIR}/categories`, data)
        },
        onSuccess(){
            router.replace(ROUTES.categories)
        }
    })

    return mutate
}

export function useDeleteCategory(id:number){
    const router = useRouter()
    const {mutate} = useMutation({
        mutationKey: ['delete category'],
        mutationFn: async () => {
            return await axios.delete(`${BASE_DIR}/categories`, {params:{id}})
        },
        onSuccess(){
            router.replace(ROUTES.categories)
        }
    })

    return mutate
}

export function useUpdateCategory(catId:number){
    const router = useRouter()
    const {mutate} = useMutation({
        mutationKey:['update category'],
        mutationFn: async (data:IAddCategoryInput) => {
            return await axios.put(`${BASE_DIR}/categories`, data, {params:{catId}} )
        },
        onSuccess(){
            router.replace(ROUTES.categories)
        }
    })

    return mutate
}