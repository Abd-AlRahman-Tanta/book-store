import { Head, usePage } from '@inertiajs/react';
import { ReactNode } from 'react';
import { AuthInputs } from '..';
import AuthForm from '../components/AuthForm';
import Notification from '../components/Notification';
import Auth from '../Layouts/Auth';

const Login = () => {
    const { inputs } = usePage<{ inputs: AuthInputs[] }>().props;
    const { flash } = usePage<{ flash: { error?: string[], success?: string } }>().props
    return (
        <div className=''>
            <Notification />
            <Head title="Login" />
            <AuthForm data={{ "email": "", "password": "" }} inputs={inputs} />
        </div>
    )
}
Login.layout = (page: ReactNode) => (<Auth children={page} />)
export default Login
