import ChatList from '@/app/ChatList'
import {describe, expect, test} from "@jest/globals"
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { createTestChat } from './dataTest'

describe("Chat List Component", () => {
    test('Chat List with data longer than 0.', () => {
        render(<ChatList data={ createTestChat(4) } />)
        screen.getAllByRole("link").forEach(element => {
            expect(element).toBeInTheDocument()
        });
    })

    test('Chat List with data longer than 0.', () => {
        render(<ChatList data={ [] } />)
        expect(screen.getByText("There are not any chats.")).toBeInTheDocument()
    })
})