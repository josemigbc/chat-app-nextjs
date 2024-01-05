import MessageForm from "@/app/[chatId]/MessageForm"
import { describe, expect, test } from "@jest/globals"
import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'

const appendMessageMock = jest.fn()
const sendJsonMock = jest.fn()

describe("Message Form", () => {
    test("Message Form rendering", () => {
        render(<MessageForm
            chat_id={3} user={{ id: 1, username: "test" }}
            appendMessage={appendMessageMock} sendJson={sendJsonMock}
        />)
        expect(screen.getByRole("textbox")).toBeInTheDocument()
    })

    test("Send message", () => {
        render(<MessageForm
            chat_id={3} user={{ id: 1, username: "test" }}
            appendMessage={appendMessageMock} sendJson={sendJsonMock}
        />)
        
        fireEvent.click(screen.getByRole("button"))

        expect(sendJsonMock).toHaveBeenCalled()
        expect(sendJsonMock).toHaveBeenCalledWith({
            type: "message",
            chat_id: 3,
            text: ""
        })

        expect(appendMessageMock).toHaveBeenCalled()
    })
})