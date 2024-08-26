import {TrainType} from "./train.type";

export interface TicketType {
  _id?: string;
  train?: TrainType;
  user?: string;
  trainID?: string;
  bookedAt: string;
}
