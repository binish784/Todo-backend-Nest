export interface ApiResponse{
    success:boolean,
    data:{[key:string]:any} | null,
    message:string
}