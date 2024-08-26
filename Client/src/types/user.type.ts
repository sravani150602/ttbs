export interface UserType {
  _id?: any;
  name: string;
  emailID: string;
  password: string;
  phone: number | null;
  gender?: "Male" | "Female" | "Others";
  age: number | null;
}
