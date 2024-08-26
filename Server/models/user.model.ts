import {model, Schema} from "mongoose";

interface IUser extends Document {
    id?: number;
    name: string;
    emailID: string;
    password: string;
    phone: number | null;
}

const userSchema: Schema = new Schema<IUser>({
    name: String,
    phone: Number,
    emailID: {type: String, unique: true},
    password: String,
})

const User = model<IUser>('users', userSchema)

export {User, IUser}