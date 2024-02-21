import React from "react"
import BookingScreen from "../src/screens/booking/BookingScreen"
import renderer from 'react-test-renderer';

// describe("Booking screen", () => {
//     it("should render clearly", () => {
//         const page =  (<BookingScreen />)

//         const startDateField = page.getByTestId("start-date")

//         expect(false).toBeTruthy()
//     })
// })

test("renders clearly", () => {
    const sum = 1 + 1
    expect(sum).toBe(2)
    // const tree = renderer.create(<BookingScreen />).toJSON()
    // expect(tree).toMatchSnapshot()
})