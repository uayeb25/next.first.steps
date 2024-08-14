'use client';

import { useState , useEffect } from "react"

import { SignUpFormValidator } from "@/utils/utils";
import { Register } from "@/services/users"

import  ErrorListNotification from "@/components/ErrorListNotification";
import SuccessDialog from "@/components/SuccessDialog";



export default function Signup() {

    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ confirmPassword, setConfirmPassword ] = useState('');
    const [ name, setName ] = useState('');
    const [ lastname, setLastname ] = useState('');

    const [ warningMessage, setWarningMessage ] = useState([]);

    const [ open, setOpen ] = useState(false);
    const [ sending, setSending ] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        const wa = SignUpFormValidator(email, password, confirmPassword, name, lastname);
        setWarningMessage(wa);

        if (wa.length === 0) {
            setSending(true);
            Register({
                email: email,
                password: password,
                firstname: name,
                lastname: lastname
            }).then( (response) => {
                if (response.error) {
                    setWarningMessage([response.error]);
                    setSending(false);
                } else {
                    setOpen(true);
                }
            }).catch( (error) => {
                setWarningMessage(["User already exists"]);
                setSending(false);
            });

        }


    }



    return (
        <>
            <div className="flex min-h-screen  justify-center my-7 ">
                <div className="w-full max-w-md  ">
                    { warningMessage.length > 0 && <ErrorListNotification errors={warningMessage} /> }
                    <SuccessDialog
                        open={open}
                        title={"Success"}
                        message={"You have successfully registered"}
                        buttonText={"Go to login"}
                        buttonAction={"/login"}
                    />
                    <h1 className="text-3xl font-bold text-center">Signup</h1>
                    <form className="mt-6">
                        <div>
                            <label htmlFor="email" className="block text-xs font-semibold text-gray-600 uppercase">E-mail</label>
                            <input disabled={ sending } id="email" value={email} onChange={ (e) => setEmail( e.target.value ) } type="email" name="email" placeholder="
                            " autoComplete="email" className="w-full p-2 mt-1 border border-gray-300 rounded-md" required />
                        </div>
                        <div className="mt-4">
                            <label htmlFor="password" className="block text-xs font-semibold text-gray-600 uppercase">Password</label>
                            <input disabled={ sending } id="password" value={password} onChange={ (e) => setPassword( e.target.value ) } type="password" name="password" placeholder="" autoComplete="current-password" className="w-full p-2 mt-1 border border-gray-300 rounded-md" required />
                        </div>
                        <div className="mt-4">
                            <label htmlFor="password" className="block text-xs font-semibold text-gray-600 uppercase">Confirm Password</label>
                            <input disabled={ sending } id="password" type="password" name="password" value={confirmPassword} onChange={ (e) => setConfirmPassword( e.target.value ) } placeholder="" autoComplete="current-password" className="w-full p-2 mt-1 border border-gray-300 rounded-md" required />
                            <p className="text-xs text-gray-500 mt-1">Make sure your passwords match</p>
                        </div>
                        <div className="mt-4">
                            <label htmlFor="name"  className="block text-xs font-semibold text-gray-600 uppercase">Name</label>
                            <input disabled={ sending } id="name" type="text" value={name} onChange={ (e) => setName( e.target.value ) } name="name" placeholder="" autoComplete="name" className="w-full p-2 mt-1 border border-gray-300 rounded-md" required />
                        </div>
                        <div className="mt-4">
                            <label htmlFor="lastname" className="block text-xs font-semibold text-gray-600 uppercase">Lastname</label>
                            <input disabled={ sending } id="lastname" value={ lastname } onChange={ (e) => setLastname( e.target.value ) } type="text" name="lastname" placeholder="" autoComplete="username" className="w-full p-2 mt-1 border border-gray-300 rounded-md" required />
                        </div>
                        <div className="mt-6">
                            <button disabled={ sending } onClick={handleSubmit} type="submit" className="w-full py-2 px-3 text-white bg-blue-600 rounded-md"> { sending ? "sending..." : "Register" } </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}