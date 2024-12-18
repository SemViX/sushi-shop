import { create } from "zustand"

interface State{
    activeCategory: number
    setActiveCategory: (activeCategory:number) => void
}

export const useActiveCategory = create<State>()((set) => ({
    activeCategory: 1,
    setActiveCategory: (activeCategory:number) => set({activeCategory})
}))