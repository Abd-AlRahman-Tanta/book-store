import { Dispatch, SetStateAction, useState } from "react";
import Bars from "./Bars";
import NavBarsItems from './NavBarsItems';
const Nav = ({ logout, setSearch }: { setSearch: Dispatch<SetStateAction<string>>, logout: () => void }) => {
    const [list, showList] = useState<boolean>(false);
    return (
        <div className="flex justify-between items-center mb-5 px-descSaveSpace max-desc:px-mobSaveSpace">
            <h1 className="text-3xl font-bold">Book Store</h1>
            <Bars showList={showList} list={list} />
            <NavBarsItems setSearch={setSearch} className={` max-desc:hidden`} logout={logout} />
            <div className={`${list ? "translate-x-0" : "-translate-x-full"} desc:hidden w-full fixed top-20 left-0   flex flex-col items-center gap-6 py-5  duration-500 z-[5000] bg-white`}>
                <NavBarsItems setSearch={setSearch} logout={logout} />
            </div>
        </div>
    )
}

export default Nav
