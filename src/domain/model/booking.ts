export interface BookingModel {
  roomNumber: number;
  startDate: Date;
  endDate: Date;
}

export interface BookingProps {
  roomNumber: number;
  startDate: string;
  endDate: string;
}
