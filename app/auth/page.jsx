import Form from "./Form"

export default function Page(){
    return (
        <main>
            <section>
                <h1 className="text-xl text-center mb-12">ChatApps</h1>
            </section>
            <section className="px-4 py-2">
                <Form/>
            </section>
        </main>
    )
}