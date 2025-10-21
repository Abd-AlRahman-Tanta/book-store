import { ReactNode } from 'react';
import App from './App';

const Auth = ({ children }: { children: ReactNode }) => {
    return (
        <div className="flex flex-col justify-center items-center  w-full min-h-screen px-descSaveSpace max-desc:px-mobSaveSpace bg-navColor">
            {children}
        </div>
    )
}
Auth.layout = (page: ReactNode) => (<App children={page} />)
export default Auth
