'use client';

import { useState } from 'react'
import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Link from 'next/link';
import Image from 'next/image';

export default function HeaderApp({
    username
    , mainAction = { name: 'logout', href: '/login' }
    , mainmenu = false
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="bg-white">
      <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between gap-x-6 p-6 lg:px-8">
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">One Teaching Design</span>
            <img alt="" src="/images/logo.png" className="h-8 w-auto" />
          </Link>
        </div>

        { mainmenu && (<div className="flex flex-1 items-center justify-center gap-x-6">
          <Link href="/" className="hidden lg:inline-flex items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 px-5 py-3 text-sm font-medium text-white shadow-lg transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
            Cards
          </Link>
          <Link href="/new" className="hidden lg:inline-flex items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 px-5 py-3 text-sm font-medium text-white shadow-lg transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
            Create Card
          </Link>
          <Link href="/team" className="hidden lg:inline-flex items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 px-5 py-3 text-sm font-medium text-white shadow-lg transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
            Team
          </Link>
        </div>)}

        <div className="flex flex-1 items-center justify-end gap-x-6">
          <div className="hidden lg:block lg:text-sm lg:font-semibold lg:leading-6 lg:text-gray-900">
             { username.length === 0 ? '' : `Welcome, ${username}` }
          </div>
          <Link
            href={ mainAction.href }
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            { mainAction.name }
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="h-6 w-6" />
          </button>
        </div>
      </nav>
      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
        <div className="fixed inset-0 z-10" />
        <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center gap-x-6">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img
                alt=""
                src="/images/logo.png"
                className="h-8 w-auto"
              />
            </a>
            <Link
              href={ mainAction.href }
              className="ml-auto rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              { mainAction.name }
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              { mainmenu && (<div className="py-6">
                <div
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900"
                >
                  { username.length === 0 ? 'One Teaching Design' : `Welcome, ${username}` }
                </div>
                <Link href="/" className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900">
                  Cards
                </Link>
                <Link href="/new" className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900">
                  Create Card
                </Link>
                <Link href="/team" className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900">
                  Team
                </Link>
              </div>)}
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  )
}