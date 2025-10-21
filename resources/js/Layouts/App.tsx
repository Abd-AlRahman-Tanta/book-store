import { ReactNode } from 'react';
const App = ({ children }: { children: ReactNode }) => {
    return (
        <div>
            <main>
                {children}
            </main>
        </div>
    )
}
export default App
