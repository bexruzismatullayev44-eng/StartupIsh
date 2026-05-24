export const API = "http://localhost:3000";


export enum Role {
    USER = "user",
    WORKER = "worker",
    ADMIN = "admin"
}


export type User={
  id:string;
  fullName:string;
  age:number;
  email:string;
  password:string;
  role: Role;
}

export type Jobs = {
  id: number;
  name: string;
  image: string;
};

export type Worker = {
  id: string;
  userId: string;
  title: string;
  price: number;
  images: string[];
  jobs: Jobs;
  description: string;
  experience: string;
  jobId: string;
  city: string;
};




export type CartItem=Worker&{
  quantity:number;
}

export enum OrderStatus{
  NEW="yangi",
  Progress="yetkazilmoqda",
  FINISHED="yetkazildi",
  CANCELED="bekor qilindi"
}

export type Order = {
  id:string;
  fullName:string;
  phone:string;
  address:string;
  orderItems:CartItem[];
  totalPrice: number;
  status:OrderStatus;
  createAt:Date;
  UserId:string;
}