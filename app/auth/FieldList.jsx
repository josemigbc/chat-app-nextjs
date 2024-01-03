
import Field from "./Field";

export default function FieldList({ isLogin, setIsLogin }) {
    return (
        <div className="flex flex-col gap-3 items-center">
            {!isLogin && (
                <>
                    <Field label={"First Name"} name={"first_name"} />
                    <Field label={"Last Name"} name={"last_name"} />
                    <Field label={"E-mail"} name={"email"} inputType={"email"} />
                </>
            )}
            <Field label={"Username"} name={"username"} />
            <Field label={"Password"} name={"password"} inputType={"password"} />
            {!isLogin && (
                <Field label={"Confirm Password"} name={"password2"} inputType={"password"} />
            )}
            <div>
                <button type="submit" className="bg-slate-400 px-5 py-1 rounded-xl shadow-md">{isLogin ? "Login" : "Create User"}</button>
            </div>
            <div>
                <a
                    onClick={() => { setIsLogin(!isLogin) }}
                    className="text-sm cursor-pointer hover:text-slate-500">{isLogin ? "Create an account" : "Log In"}</a>
            </div>
        </div>
    )
}