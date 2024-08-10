import { ExclamationTriangleIcon , XMarkIcon } from '@heroicons/react/20/solid'

export default function InformationNotification({
    message
    , open
    , closeConfirmation
}) {
  return (
    <>
        { open && (<div className="border-l-4 border-yellow-400 bg-yellow-50 p-4">
            <div className="flex">
                <div className="flex-shrink-0">
                <ExclamationTriangleIcon aria-hidden="true" className="h-5 w-5 text-yellow-400" />
                </div>
                <div className="ml-3">
                <p className="text-sm text-yellow-700">
                    { message }
                </p>
                </div>
                <div className="ml-auto pl-3">
                <div className="-mx-1.5 -my-1.5">
                    <button
                        type="button"
                        className="inline-flex rounded-md bg-yellow-50 p-1.5 text-yellow-500 hover:bg-yellow-100 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-green-50"
                        onClick={closeConfirmation}
                    >
                    <span className="sr-only">Dismiss</span>
                    <XMarkIcon aria-hidden="true" className="h-5 w-5" />
                    </button>
                </div>
                </div>
            </div>
        </div>) }
    </>
    
  )
}
