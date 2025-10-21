import { Dispatch, SetStateAction } from "react"
import { FaBars } from "react-icons/fa"
import { RxCross2 } from "react-icons/rx"
const Bars = ({ list, showList }: { list: boolean, showList: Dispatch<SetStateAction<boolean>> }) => {
    return (
        <div className={`w-10 h-10 relative desc:hidden`}>
            <FaBars onClick={() => { showList(true) }} className={`${list ? "scale-0" : "scale-100"} absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 text-2xl cursor-pointer duration-300 `} />
            <RxCross2 onClick={() => { showList(false) }} className={`${list ? "scale-100" : "scale-0"} absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 text-2xl cursor-pointer duration-300 `} />
        </div>
    )
}

export default Bars
