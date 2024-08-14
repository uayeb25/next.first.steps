'use client';

import { GetCardItem , DeleteCardItem, UpdateCardItem } from "@/services/nextcard";

import DeleteConfirmation from "@/components/DeleteConfirmation";

import InformationNotification from "@/components/InformationNotification";
import SuccessNotification from "@/components/SuccessNotification";

import FormCard from "@/components/FormCard";

import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';

export default function CardItem(props){

    const { id } = props.params;
    const router = useRouter();

    const [ title, setTitle ] = useState('');
    const [ description, setDescription ] = useState('');
    const [ loading, setLoading ] = useState(true);

    const [ open, setOpen ] = useState(false);
    const [ openInformation, setOpenInformation ] = useState(false);
    const [ openSuccess, setOpenSuccess ] = useState(false);


    const [informationMessage, setInformationMessage] = useState('');



    const handleDeleteClick = (e) => {
        e.preventDefault();
        setOpen(true);
    }

    const handleUpdateClick = (e) => {
        e.preventDefault();

        if( title === '' || description === '' ){
            setOpenInformation(true);
            setInformationMessage('Title and Description are required');
            return;
        }

        setLoading(true);
        setOpenInformation(false);
        updateAction();

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

    ///  MESSAGE HANDLING ///
    const closeOpenSuccess = () => {
        setOpenSuccess(false);
    }


    /////// API CALLS ///////
    const deleteAction = () => {

            DeleteCardItem(id).then( (response) => {
                if( response.status != 200 ){
                    setOpenInformation(true);
                    setInformationMessage('Error with API call server communication');
                    setOpen(false);
                    return;
                }else{
                    router.push('/nextclient');
                }
            });
    }


    const updateAction = () => {

            UpdateCardItem(id, title, description).then( (response) => {
                if( response.status != 200 ){
                    setOpenInformation(true);
                    setInformationMessage('Error with API call server communication');
                    return;
                }else{
                    setOpenSuccess(true);
                    setLoading(false);
                }
            });

    }


    //////////////////////


    useEffect(() => {

        GetCardItem(id).then( (response) => {

            if( response.status == 404 || response.status == 422 ){
                router.push('/404');
            }

            setTitle( response.title );
            setDescription( response.description );
            setLoading(false);

        });

    } , [id]);

    return(
        <main className="flex min-h-screen flex-col items-center justify-between p-24">

            <DeleteConfirmation 
                title="Delete Card"
                description="Are you sure you want to delete this card?"
                open={ open }
                closeConfirmation={ closeConfirmation }
                deleteAction={ deleteAction }
            />
            <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
                <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">

                <InformationNotification 
                    message={ informationMessage }
                    open={openInformation}
                    closeConfirmation={closeOpenInformation}
                />

                <SuccessNotification
                    message="Card Updated"
                    open={openSuccess}
                    closeConfirmation={closeOpenSuccess}
                />


                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                            Edit your Card ( { title } )  Information
                        </h2>
                    </div>

                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <FormCard 

                            title={ title }
                            description={ description }
                            UpdateTitle={ UpdateTitle }
                            UpdateDescription={ UpdateDescription }

                            handleDeleteClick={ handleDeleteClick }
                            handleUpdateClick={ handleUpdateClick }

                            loading={ loading }
                            isCreating={ false }
                        />
                    </div>


                </div>
            </div>
        </main>
    )
}