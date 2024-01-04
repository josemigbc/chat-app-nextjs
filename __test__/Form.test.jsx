import Form from "@/app/auth/Form"
import { getUser, login, register } from "@/consumer"
import {describe, expect, test} from "@jest/globals"
import '@testing-library/jest-dom'
import { render, screen, fireEvent} from '@testing-library/react'

const pushMock = jest.fn((url) => {})

jest.mock("next/navigation", () => {
    const originalModule = jest.requireActual("next/navigation");
    return {
        __esModule: true,
        ...originalModule,
        useRouter: jest.fn(() => { return {push: pushMock} }),
    }
})

jest.mock("../consumer", () => {
    const originalModule = jest.requireActual("../consumer");
    return {
        __esModule: true,
        ...originalModule,
        login: jest.fn(async (data) => { return {access_token: "tokenTest"}}),
        register: jest.fn(async (data) => ({id:1})),
        getUser: jest.fn(async (access_token) => ({id:1})),
    }
})

describe("Authentation Form", () => {
    test("Change of isLogin state",()=>{
        render(<Form/>);
        const toggleButton = screen.getByText("Create an account")
        expect(toggleButton).toBeInTheDocument()
        expect(screen.getAllByRole("textbox").length).toBe(1)

        fireEvent.click(toggleButton)
        
        expect(screen.getAllByRole("textbox").length).toBe(4)
        expect(screen.getByText("Log In")).toBeInTheDocument()
    })
    test("Login flow", async () => {
        render(<Form/>);
        const submitButton = screen.getByText("Login")
        await fireEvent.click(submitButton)
        expect(login).toHaveBeenCalled()
        expect(localStorage.getItem('access_token')).toBe("tokenTest")
        expect(getUser).toHaveBeenCalled()
    })

    test("Register flow with ok", () => {
        render(<Form/>);
        const toggleButton = screen.getByText("Create an account")
        const submitButton = screen.getByText("Login")

        fireEvent.click(toggleButton)
        fireEvent.click(submitButton)
    
        expect(register).toHaveBeenCalled()
    })

    test("Register flow with password does not match", () => {
        render(<Form/>);
        const toggleButton = screen.getByText("Create an account")
        const submitButton = screen.getByText("Login")
        const pwInput = screen.getByLabelText("Password")

        fireEvent.click(toggleButton)
        fireEvent.change(pwInput, {target: {value: 'test'}})
        fireEvent.click(submitButton)

        expect(register).not.toHaveBeenCalled()
    })
})