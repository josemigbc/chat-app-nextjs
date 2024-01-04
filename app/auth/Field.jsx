export default function Field({label, name, inputType}) {
    return (
        <div>
            <label for={name}>{label}</label>
            <input id={name} name={name} type={inputType ? inputType: "text"}
            className=" border-b-2 border-slate-200 px-2 py-1 focus:outline-none"
            />
        </div>
    )
}