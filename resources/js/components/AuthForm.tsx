import { RequestPayload } from "@inertiajs/inertia";
import { Link, router, usePage } from "@inertiajs/react";
import { FormEvent, useRef, useState } from "react";
import { AuthFormProps } from "..";

const AuthForm = <T,>({ inputs, data }: AuthFormProps<T>) => {
    const { url } = usePage();
    const sentData = useRef<T>(data);
    const [render, setRender] = useState<boolean>(false);
    const auth = (event: FormEvent) => {
        event.preventDefault();
        setRender(true);
        url == "/" ?
            router.visit("/register", {
                method: "post",
                data: { ...sentData.current as RequestPayload },
                onFinish: () => setRender(false)
            }) : router.visit("/login", {
                method: "post",
                data: { ...sentData.current as RequestPayload },
                onFinish: () => setRender(false)
            });
        sentData.current = data;
    }
    return (
        <div className="w-full py-8 px-8 bg-white rounded-2xl  ">
            <h1 className=" text-3xl font-bold text-center my-7 ">Register</h1>
            <form onSubmit={auth} className=" flex flex-col justify-center items-center gap-7 ">
                {
                    inputs.map((input, index) => (
                        <div key={index}>
                            <input onChange={(e) => sentData.current = { ...sentData.current, [input.name]: e.target.value }} className="pl-5 w-full min-h-14 outline-0 rounded-lg border-1 border-b-blackButton " type={input.type} placeholder={input.placeHolder} name={input.name} />
                        </div>
                    ))
                }
                <button type="submit" className={` flex justify-center items-center gap-2 border-1 hover:scale-105 duration-200 min-w-36  rounded-full cursor-pointer px-5 py-3  bg-specialOrange `}>  {url == "/" ? "Register" : "Login"} <span className={` ${render ? "block" : "hidden"}  border-2 border-y-transparent border-x-white rounded-full w-7 h-7 bg-transparent animate-spin duration-500 `}></span> </button>
                <p className=" text-description flex justify-center items-center gap-2 "> {url == "/" ? "Have an Acount?" : "Don't Have an Acount?"} <Link className=" text-label " href={url == "/" ? "/login" : "/"} >{url == "/" ? "Go To Login" : "Go To Register"}</Link>{ }</p>
            </form>
        </div>
    )
}

export default AuthForm

{/* <span className={`${wait == "wait" ? "block animate-spin border-2 border-white rounded-full w-7 h-7 bg-transparent " : "hidden"}`}></span> */ }
