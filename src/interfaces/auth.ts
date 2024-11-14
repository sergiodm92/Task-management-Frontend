export interface Credentials {
    email: string;
    password: string;
  }
  
  export interface UserData {
    email: string;
    password: string;
  }

  type User = {
    id: number;
    email: string
  }
  
  export interface AuthResponse {
    status:string;
    statusCode:number;
    message:string;
    data:{
    token: string;
    user: User
  }
  }

  export interface GetUserResponse {
    status:string;
    statusCode:number;
    message:string;
    data:User;
  
  }
  
  export interface ApiError {
    message: string;
  }
  