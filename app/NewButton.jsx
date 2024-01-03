import Link from "next/link"
import { MdMessage } from "react-icons/md"

export default function NewButton() {
    return (
        <div className="fixed bottom-3 right-6">
            <Link href={"/new"}>
                <MdMessage className="w-10 h-10" />
            </Link>
        </div>

    )
}