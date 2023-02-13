export interface UserServiceInterface {
    getUser(id:string):string;
    deleteUser(id:string):string;
    addUser(id:string):string;
    updateUser(id:string):string;
}