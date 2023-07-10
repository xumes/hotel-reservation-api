export interface BookingModel {
  id: number;
  startDate: Date;
  endDate: Date;
  roomId: number;
  hotelId: string;
}

export type AddBookingModel = Omit<BookingModel, "id">;

export interface BookingProps {
  hotelId: string;
  roomNumber: number;
  startDate: string;
  endDate: string;
}
