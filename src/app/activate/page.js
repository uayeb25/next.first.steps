// pages/login.js

'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import ErrorListNotification from '@/components/ErrorListNotification';
import SuccessDialog from '@/components/SuccessDialog';
import { ActivateUser } from '@/services/users';


const Activate = () => {

    const [warningMessage, setWarningMessage] = useState([]);
    const [code, setCode] = useState('');
    const [ open, setOpen ] = useState(false);
    const [ sending, setSending ] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (code === '') {
            setWarningMessage(['Code is required']);
            return;
        }
        setSending(true);
        ActivateUser(code).then( (response) => {
            setOpen(true);
        }).catch( (error) => {
            setWarningMessage(['Code is incorrect']);
            setSending(false);
        })

    }

    const handleChange = (e) => {
        const value = e.target.value;
        if (/^\d*$/.test(value)) {
          setCode(value);
        }
    };

    return (
        <div className="flex min-h-screen  justify-center my-7 ">
            <div className="w-full max-w-md">

            <SuccessDialog open={open} title="Account activated" message="Your account has been activated successfully" buttonText="Go to login" buttonAction="/login" />

            { warningMessage.length > 0 && <ErrorListNotification errors={warningMessage} /> }
                <h1 className="text-3xl font-bold text-center">Activate your account</h1>
                <form className="mt-6">
                    <div>
                        <label className="block text-xs font-semibold text-gray-600 uppercase">
                            Insert the code sent to your email
                        </label>
                        <input
                            id="code"
                            type="text"
                            value={code}
                            onChange={handleChange}
                            name="code"
                            placeholder=""
                            className="w-full p-2 mt-1 border border-gray-300 rounded-md" 
                            required
                        />
                    </div>

                    <div className="mt-6">
                        <button disabled={sending} onClick={handleSubmit} type="submit" className="w-full py-2 px-3 text-white bg-blue-600 rounded-md">
                            { sending ? 'Activating...' : 'Activate' }
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Activate;