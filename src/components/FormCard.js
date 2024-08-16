import {  useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

function noop() {}

export default function FormCard({

    title
    , UpdateTitle
    , description
    , UpdateDescription
    , files = []
    , UpdateFiles = noop

    , loading

    , handleCreateClick = noop
    , handleUpdateClick = noop
    , handleDeleteClick = noop

    , isCreating = true

}) {

    const onDrop = useCallback((acceptedFiles) => {
        UpdateFiles(acceptedFiles);
    }, [UpdateFiles]);

    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    return(
        <form className="space-y-6">
            <div>
                <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">
                    Title
                </label>
                <div className="mt-2">
                    <input
                        id="title"
                        name="title"
                        required
                        autoComplete="title"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        value={ title }
                        onChange={ UpdateTitle }
                        disabled={ loading }
                    />
                </div>
            </div>

            <div>
                <div className="flex items-center justify-between">
                    <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
                    Description
                    </label>
                </div>
                <div className="mt-2">
                    <textarea
                        id="about"
                        name="about"
                        rows={5}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        defaultValue={''}
                        value={ description }
                        onChange={ UpdateDescription }
                        disabled={ loading }
                    />
                </div>
            </div>

            { !isCreating && (<>
                <div {...getRootProps()} className="mt-4 flex justify-center rounded-md border-2 border-dashed border-gray-300 p-4 text-center">
                    <input {...getInputProps()} />
                    <p className="text-sm text-gray-600">Drag & drop some files here, or click to select files</p>
                </div>
                <div className="mt-2">
                    {files.map((file) => (
                        <p key={file.path} className="text-sm text-gray-600">
                        {file.path} - {file.size} bytes
                        </p>
                    ))}
                </div>
            </>)}

            { isCreating && (<div>
                <button
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    disabled={ loading }
                    onClick={ handleCreateClick }
                >
                        { loading ? "loading" : "Create Card" }
                </button>
            </div>) }

            { !isCreating && (<div>
                <button
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    disabled={ 
                        loading
                    }
                    onClick={ handleUpdateClick }
                >
                        { loading ? "loading" : "Update Card" }
                </button>
            </div>) }

            { !isCreating && (<div>
                <button
                    className="flex w-full justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    onClick={ handleDeleteClick }
                    disabled={
                        loading
                    }

                >
                    { loading ? "loading" : "Delete Card" }
                </button>
            </div>)}

        </form>
    )
}