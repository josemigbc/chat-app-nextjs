import UserContainer from "@/app/new/UserContainer"
import {describe, expect, test} from "@jest/globals"
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

jest.mock("next/navigation")

describe("UserContainer", () => {
    test("UserContainer rendering", ()=> {
        render(<UserContainer data={{username: "test"}}/>)
        expect(screen.getByText("test")).toBeInTheDocument()
    })
})