import { useActiveCategory } from "@/store/categories";
import { BASE_DIR } from "@/utils/constants";
import { IAddProductInput } from "@/utils/propsTypes";
import { ROUTES } from "@/utils/routes";
import axios from "axios";
import { Rotate3D } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMutation, useQuery } from "react-query";

export function useProducts(){
    const id = useActiveCategory((state) => state.activeCategory)

    const {data, isLoading, refetch} = useQuery({
        queryKey:['products'],
        queryFn: async () => {
            return (await axios.get(`${BASE_DIR}/productByCategories`, {params: {id}})).data
        }
    })

    return {productsData:data, isLoading, refetch}
}

export function useProductsByDiscount(){
    const id = useActiveCategory((state) => state.activeCategory)

    const {data, isLoading, refetch} = useQuery({
        queryKey: ['products with discount'],
        queryFn: async () => {
            return (await axios.get(`${BASE_DIR}/productByDiscount`, {params: {id}})).data
        }
    })

    return {productData:data, isLoading, refetch}
}

export function useProductsByName(searchQuery:string){
    
    const {data, isLoading, refetch} = useQuery({
        queryKey: ['get all products'],
        queryFn: async () => {
            return (await axios.get(`${BASE_DIR}/products`, {params:{searchQuery}})).data
        }
    })

    return {productData:data, isLoading, refetch}
}

export function useCreateProduct() {
    const router = useRouter()
    const {mutate} = useMutation({
        mutationKey:['create product'],
        mutationFn: async (data:IAddProductInput) => {
            return await axios.post(`${BASE_DIR}/products`, data)
        },
        onSuccess(){
            router.replace(ROUTES.admin_products)
        }
    })

    return mutate
}

export function useDeleteProduct(id:number){
    const router = useRouter()
    const {mutate} = useMutation({
        mutationKey: ['delete product'],
        mutationFn: async () => {
            return axios.delete(`${BASE_DIR}/products`, {params:{id}})
        },
        onSuccess(){
            router.replace(ROUTES.admin_products)
        }
    })

    return mutate
}

export function useProductById(id:number){
    const {data, isLoading, refetch} = useQuery({
        queryKey: ['get product by id'],
        queryFn: async () => {
            return (await axios.get(`${BASE_DIR}/productById`, {params: {id}})).data
        }
    })

    return {productData:data, isLoading, refetch}
}

export function useUpdateData(id:number){
    const router = useRouter()
    const {mutate} = useMutation({
        mutationKey:['update product'],
        mutationFn: async (data:IAddProductInput) => {
            return await axios.put(`${BASE_DIR}/productById`, data, {params:{id}})
        },
        onSuccess(){
            router.replace(ROUTES.admin_products)
        }
    })

    return mutate
}