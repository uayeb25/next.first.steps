import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { EllipsisHorizontalIcon } from '@heroicons/react/20/solid'
import { useRouter } from "next/navigation";

import { Link } from "next/link";

export default function CardApp({
    key, title, description, author, date, access, cardid, totalfiles, openFileMenu
}) {
    const router = useRouter();
    return (
        <li key={key} className="overflow-hidden rounded-xl border border-gray-200">
          <div className="flex items-center gap-x-4 border-b border-gray-900/5 bg-gray-50 p-6">
            <img
              src='/images/logo.png'
              className="h-12 w-12 flex-none rounded-lg bg-white object-cover ring-1 ring-gray-900/10"
            />
            <div className="text-sm font-medium leading-6 text-gray-900">{title}</div>
            { ( access === "Mine" ) && (<Menu as="div" className="relative ml-auto">
              <MenuButton className="-m-2.5 block p-2.5 text-gray-400 hover:text-gray-500">
                <span className="sr-only">Open options</span>
                <EllipsisHorizontalIcon aria-hidden="true" className="h-5 w-5" />
              </MenuButton>
              <MenuItems
                transition
                className="absolute right-0 z-10 mt-0.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
              >

                <MenuItem>
                  <a onClick={ (e) => router.push(`/card/${cardid}`) } className="block px-3 py-1 text-sm leading-6 text-gray-900 data-[focus]:bg-gray-50">
                    Edit<span className="sr-only">, {title}</span>
                  </a>
                </MenuItem>
              </MenuItems>
            </Menu>)}
          </div>
          <dl className="-my-3 divide-y divide-gray-100 px-6 py-4 text-sm leading-6 bg-white ">
            <div className="flex justify-between gap-x-4 py-3">
              <dt className="text-gray-500">Published Date</dt>
              <dd className="text-gray-700">
                <time dateTime={date}>{date}</time>
              </dd>
            </div>
            <div className="flex justify-between gap-x-4 py-3">
              <dt className="text-gray-500">Description</dt>
              <dd className="flex items-start gap-x-2">
                <div className="font-medium text-gray-900">{description}</div>
              </dd>
            </div>
            <div className="flex justify-between gap-x-4 py-3">
              <dt className="text-gray-500">Author</dt>
              <dd className="text-gray-700">
                <div className="font-medium text-gray-900">{author}</div>
              </dd>
            </div>
            <div className="flex justify-between items-center gap-x-4 py-3">
              <dt className="text-gray-500">Total Files</dt>
              <dd className="flex items-center text-gray-700">
                <div className="font-medium text-gray-900 mr-2">{totalfiles}</div>
                {totalfiles > 0 ? (
                  <button
                    onClick={ () => openFileMenu(cardid) }
                    className="inline-flex items-center justify-center rounded-full bg-indigo-600 px-3 py-1 text-sm font-medium text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
                  >
                    View Files
                  </button>
                ) : (
                  <span className="text-gray-500">No files available</span>
                )}
              </dd>
            </div>
          </dl>
        </li>
    );
}