import Message from "@/app/[chatId]/Message"
import {describe, expect, test} from "@jest/globals"
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { createTestMessage } from "./dataTest"

describe("Message Contaner", ()=>{
    test("message rendering with user message", () => {
        const container = render(<Message data={createTestMessage(1)[0]} userTo={"test2"} />)
        expect(screen.getByText("test message")).toBeInTheDocument()
        expect(document.querySelector(".flex").className).toBe("flex justify-end py-1 px-2")
        //expect(container.container.className).toBe("flex justify-end py-1 px-2")
    })

    test("message rendering with userTo message", () => {
        const container = render(<Message data={createTestMessage(1)[0]} userTo={"test1"} />)
        expect(screen.getByText("test message")).toBeInTheDocument()
        console.log(container.debug());
        expect(document.querySelector(".flex").className).toBe("flex justify-start")
    })
})