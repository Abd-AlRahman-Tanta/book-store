import { Head, usePage } from '@inertiajs/react';
import { ReactNode } from 'react';
import { AuthInputs } from '..';
import AuthForm from '../components/AuthForm';
import Notification from '../components/Notification';
import Auth from '../Layouts/Auth';

const Register = () => {
    const { inputs } = usePage<{ inputs: AuthInputs[] }>().props
    return (
        <div className=''>
            <Notification />
            <Head title='Register' />
            <AuthForm data={{ "user_name": "", "email": "", "password": "", "password_confirmation": "" }} inputs={inputs} />
        </div>
    )
}

Register.layout = (page: ReactNode) => <Auth children={page} />
export default Register
