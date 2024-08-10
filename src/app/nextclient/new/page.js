'use client';

import { CreateCardItem } from "../../../services/nextcard";


import InformationNotification from "../../../components/InformationNotification";
import FormCard from "../../../components/FormCard";

import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';

export default function CardCreteItem(props){


    const router = useRouter();

    const [ title, setTitle ] = useState('');
    const [ description, setDescription ] = useState('');
    const [ loading, setLoading ] = useState(false);

    const [ openInformation, setOpenInformation ] = useState(false);
    const [informationMessage, setInformationMessage] = useState('');


    const handleCreateClick = (e) => {
        e.preventDefault();

        if( title === '' || description === '' ){
            setOpenInformation(true);
            setInformationMessage('Title and Description are required');
            return;
        }

        setLoading(true);
        setOpenInformation(false);
        createAction();

    }


    const UpdateTitle = (e) => {
        setTitle(e.target.value);
    }

    const UpdateDescription = (e) => {
        setDescription(e.target.value);
    }



    //// API ERROR HANDLING ///

    const closeConfirmation = () => {
        setOpen(false);
    }

    const closeOpenInformation = () => {
        setOpenInformation(false);
    }

    //////////////////////


    /////// API CALLS ///////
    const createAction = () => {

        CreateCardItem( title, description).then( (response) => {
            if( response.status != 200 ){
                setOpenInformation(true);
                setInformationMessage('Error with API call server communication');
                return;
            }else{
                router.push('/nextclient');
                setLoading(false);
            }
        });

    }
    //////////////////////



    return(
        <main className="flex min-h-screen flex-col items-center justify-between p-24">

           <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
                <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">

                <InformationNotification 
                    message={informationMessage}
                    open={openInformation}
                    closeConfirmation={closeOpenInformation}
                />


                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                            Create an new Card
                        </h2>
                    </div>

                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <FormCard

                            title={ title }
                            description={ description }
                            UpdateTitle={ UpdateTitle }
                            UpdateDescription={ UpdateDescription }

                            handleCreateClick={ handleCreateClick }

                            loading={ loading }
                            isCreating={ true }

                        />
                    </div>


                </div>
            </div>
        </main>
    )
}