import '@testing-library/jest-dom/jest-globals'
import { describe, expect, test } from "@jest/globals"
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react'
import Home from '@/app/page'
import { default as PageChatId } from "@/app/[chatId]/page"
import { default as PageNewChat } from '@/app/new/page'
import { createTestChat, createTestOneChat, createTestUser } from './dataTest'

jest.mock("next/navigation")

jest.mock("../consumer", () => {
    const originalModule = jest.requireActual("../consumer");
    return {
        __esModule: true,
        ...originalModule,
        getChats: jest.fn(async (access_token) => access_token === "tokenTest" ? createTestChat(5) : null),
        getUsers: jest.fn(async (access_token) => access_token === "tokenTest" ? createTestUser(5) : null),
        getChat: jest.fn(async (id, access_token) => access_token === "tokenTest" ? createTestOneChat() : null),
    }
})

const testPageComponents = async (component, label) => {
    return describe(`Page Home ${label}`, () => {
        test('conditional rendering of loading and not fetch because not access token.', async () => {
            render(component)
            const loading = screen.getByText('Loading...')
            expect(loading).toBeInTheDocument()
            //expect(await waitForElementToBeRemoved(loading)
            //expect(screen.getByRole('list')).toThrowError()
        })
        test(`rendering with fetch data with correct access token. ${label}`, async () => {
            localStorage.setItem("access_token", "tokenTest")
            localStorage.setItem("user", JSON.stringify({ "id": 1, "username": "test1" }))
            render(component)
            const loading = screen.getByText('Loading...')
            expect(loading).toBeInTheDocument()
            await waitForElementToBeRemoved(loading)
            if (label === 'pageChatId') {
                expect(screen.getAllByText("test message").length).toBe(5)
            } else if (label === 'pageNew') {
                for (let i = 1; i < 6; i++) {
                    expect(screen.getByText(`test${i}`)).toBeInTheDocument()
                }
            } else {
                expect(screen.getAllByRole('link').length).toBe(6)
            }
        })
    })
}

testPageComponents(<Home />, "home")
testPageComponents(<PageChatId params={{ chatId: 3 }} />, "pageChatId")
testPageComponents(<PageNewChat />, "pageNew")