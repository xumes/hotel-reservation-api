import { InvalidParamError } from "../../../src/@shared/errors/invalid-param-error"
import { MissingParamError } from "../../../src/@shared/errors/missing-param-error"
import { MakeBookingUsecase } from "../../../src/domain/usecases/make-booking"

describe("Make Booking Usecase", () => {
    it("should throw MissingParamError when room number is not provided", () => {
        const testCases = [
            { startDate: "2023-07-10", endDate: "2023-07-11" },
            { roomNumber: 0, startDate: "2023-07-10", endDate: "2023-07-11" },
            { roomNumber: -1, startDate: "2023-07-10", endDate: "2023-07-11" },
        ]

        const makeBookingUsecase = new MakeBookingUsecase()

        testCases.forEach(({ roomNumber, startDate, endDate }) => {
            const fakeBooking = {
                roomNumber, startDate, endDate
            }

            expect(() => {
                makeBookingUsecase.execute(fakeBooking as any)
            }).toThrow(MissingParamError)
        })
    })

    it("should throw InvalidParamError when booking date are invalid", () => {
        const testCases = [
            { roomNumber: 1, startDate: "invalid", endDate: "2023-07-11" },
            { roomNumber: 2, startDate: "2023-07-10", endDate: "invalid" },
            { roomNumber: 3, startDate: "2023-07-11", endDate: "2023-07-10" },
        ]

        const makeBookingUsecase = new MakeBookingUsecase()

        testCases.forEach(({roomNumber, startDate, endDate}) => {
            const fakeBooking = {
                roomNumber, startDate, endDate
            }

            expect(() => {
                makeBookingUsecase.execute(fakeBooking)
            }).toThrow(InvalidParamError)
        })
    })

    it ("should make a booking with valid data", () => {
        const validBooking = {
            roomNumber: 1,
            startDate: "2023-07-10",
            endDate: "2023-07-11"
        }

        const makeBookingUsecase = new MakeBookingUsecase()
        const myBooking = makeBookingUsecase.execute(validBooking)

        expect(myBooking.roomNumber).toBe(validBooking.roomNumber)
        expect(myBooking.startDate).toStrictEqual(new Date(validBooking.startDate))
        expect(myBooking.endDate).toStrictEqual(new Date(validBooking.endDate))
    })
})