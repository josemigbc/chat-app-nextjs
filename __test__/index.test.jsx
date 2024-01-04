import '@testing-library/jest-dom/jest-globals'
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react'
import Home from '@/app/page'
import { default as PageChatId} from "@/app/[chatId]/page"
import { default as PageNewChat} from '@/app/new/page'

const testPageComponents = (component) => {
    return describe('Page Home', () => {
        it('conditional rendering of loading and ChatList.', async () => {
            render(component)
            const loading = screen.getByText('Loading...')
            expect(loading).toBeInTheDocument()
            //await waitForElementToBeRemoved(loading)
            //expect(screen.getByRole('list')).toBeInTheDocument()
        })
    })
}

testPageComponents(<Home/>)
testPageComponents(<PageChatId params={{chatId: 3}}/>)
testPageComponents(<PageNewChat/>)