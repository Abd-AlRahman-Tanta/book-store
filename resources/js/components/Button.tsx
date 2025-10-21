import type { ReactNode } from "react"

const Button = ({ text, icon, className }: { text: string, icon?: ReactNode, className: string }) => {
    return (
        <button className={`${className} border-1 hover:scale-105 duration-200 min-w-36  rounded-full cursor-pointer px-5 py-3`}>{text}<span>{icon}</span></button>
    )
}

export default Button
