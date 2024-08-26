export interface TrainType {
  id?: number;
  trainID: string;
  name: string;
  start: string;
  destination: string;
  status: boolean;
  startTime: string;
  endTime: string;
  ticketFare: number | null;
  stops: number | null;
  journeyTime: number | null;
}
