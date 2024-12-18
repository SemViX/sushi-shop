'use client'
import Button from "@/components/ui/Button";
import { ROUTES } from "@/utils/routes";
import { url } from "inspector";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter()
  return (
    <main className="flex flex-col sm:flex-row gap-5 mt-[100px] overflow-hidden flex-grow">
      <div className="p-2 mx-auto sm:ml-auto text-center items-center text-white flex flex-col gap-5">
        <h1 className=" text-6xl font-bold uppercase max-w-[500px]" >
          Ми завжди <span className="text-orange-500">тобі раді :)</span>
        </h1>
        <p className="text-xl">
          Готуємо та доставляємо найсмачніші суші
        </p>

        <Button color={'orange'} type="button" size={'big'} title="Перейти до меню" onClick={() => router.push(ROUTES.products)}/>
      </div>
      <div className="ml-auto">
        <Image src={'/main_img.png'} width={600} height={300} alt=""/>
      </div>
    </main>
  );
}
