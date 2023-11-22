export interface User {
    userId: string;
    userName: string;
}
  
export interface Comment {
    user: User;
    timeSent: string;
    text: string;
}