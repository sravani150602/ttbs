import {model, Schema} from "mongoose";

interface IAdmin extends Document {
	id?: string;
	emailID: string;
	password: string;
}

const adminSchema: Schema = new Schema<IAdmin>({
	emailID: String,
	password: String,
})

const Admin = model<IAdmin>('admin', adminSchema)

export {Admin, IAdmin}