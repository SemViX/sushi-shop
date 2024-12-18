
export function totalPrice(arr:number[]) {
    console.log(arr)
    const sum = arr.reduce((prevNum, curNum) => prevNum + curNum, 0)
    return sum
} 