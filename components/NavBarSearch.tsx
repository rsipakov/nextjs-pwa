import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { BellIcon, MenuIcon, XIcon } from '@heroicons/react/outline'
import ThemeToggle from '@/components/ThemeToggle'
import LocaleSelect from '@/components/LocaleSelect'
import Link from 'next/link'
import { useRouter } from 'next/router'

function classNames(...classes) {
	return classes.filter(Boolean).join(' ')
}

const links = [
	{ label: 'Story', href: '/story' },
	{ label: 'Recipes', href: '/recipes' },
	{ label: 'Blog', href: '/blog'}
]

export default function NavBarSearch() {
	const router = useRouter()

	return (
		<header className='pt-safe w-full bg-zinc-900 fixed top-0 left-0'>
			<Disclosure as='nav' className='px-safe bg-zinc-100 border-b dark:bg-zinc-900 dark:border-zinc-800'>
				{({ open }) => (
					<>
						<div className='max-w-screen-lg mx-auto px-2 sm:px-4 lg:px-8'>
							<div className='flex justify-between h-16'>

								{/*Left side view*/}
								<div className='flex px-2 lg:px-0'>
									<div className='flex-shrink-0 flex items-center'>

										{/* Logo in mobile view */}
										{/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
										<a href="/">
											{/* eslint-disable-next-line @next/next/no-img-element */}
											<img
												className='block lg:hidden h-8 w-auto'
												src='https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg'
												alt='Workflow'
											/>
										</a>

										{/* Logo in large view */}
										{/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
										<a href="/">
											{/* eslint-disable-next-line @next/next/no-img-element */}
											<img
												className='hidden lg:block h-8 w-auto'
												src='https://tailwindui.com/img/logos/workflow-logo-indigo-600-mark-gray-800-text.svg'
												alt='Workflxow'
											/>
										</a>

									</div>

									{/*Menu in large view */}
									<div className='hidden lg:ml-6 lg:flex lg:space-x-8 space-x-6 flex items-center'>
										{links.map(({ label, href }) => (
											<Link key={label} href={href}>
												<a
													className={`items-center px-1 pt-1 border-b-2 text-base font-medium ${
														router.pathname === href
															? 'text-indigo-500 dark:text-indigo-400 border-indigo-500'
															: 'text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50 border-transparent hover:border-zinc-300'
													}`}
												>
													{label}
												</a>
											</Link>
										))}
									</div>

								</div>

								{/*Uncomment below if you need for search panel at navigation menu*/}
								{/*
								<div className='flex-1 flex items-center justify-center px-2 lg:ml-6 lg:justify-end'>
									<div className='max-w-lg w-full lg:max-w-xs'>
										<label htmlFor='search' className='sr-only'>
											Search
										</label>
										<div className='relative'>
											<div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
												<SearchIcon className='w-5 h-5 text-zinc-900 dark:text-zinc-50' aria-hidden='true' />
											</div>
											<input
												id='search'
												name='search'
												className='block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
												placeholder='Search'
												type='search'
											/>
										</div>
									</div>
								</div>
								*/}

								{/*Right side view in large screen*/}
								<div className='hidden lg:ml-4 lg:flex lg:items-center'>
									<div className='px-4'>
									<LocaleSelect />
									</div>
									{/*Theme toggle in large view*/}
									<ThemeToggle />
									<button
										type='button'
										className='ml-4 flex-shrink-0 bg-white p-1 text-gray-400 rounded-full hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
									>
										<span className='sr-only'>View notifications</span>
										<BellIcon className='h-6 w-6' aria-hidden='true' />
									</button>
									{/* Profile dropdown */}
									<Menu as='div' className='ml-4 relative flex-shrink-0'>
										<div>
											<Menu.Button
												className='bg-white rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
												<span className='sr-only'>Open user menu</span>
												{/* eslint-disable-next-line @next/next/no-img-element */}
												<img
													className='h-8 w-8 rounded-full'
													src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
													alt=''
												/>
											</Menu.Button>
										</div>
										<Transition
											as={Fragment}
											enter='transition ease-out duration-100'
											enterFrom='transform opacity-0 scale-95'
											enterTo='transform opacity-100 scale-100'
											leave='transition ease-in duration-75'
											leaveFrom='transform opacity-100 scale-100'
											leaveTo='transform opacity-0 scale-95'
										>
											<Menu.Items
												className='origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none'>
												<Menu.Item>
													{({ active }) => (
														<a
															href='#'
															className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
														>
															Your Profile
														</a>
													)}
												</Menu.Item>
												<Menu.Item>
													{({ active }) => (
														<a
															href='#'
															className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
														>
															Settings
														</a>
													)}
												</Menu.Item>
												<Menu.Item>
													{({ active }) => (
														<a
															href='#'
															className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
														>
															Sign out
														</a>
													)}
												</Menu.Item>
											</Menu.Items>
										</Transition>
									</Menu>
								</div>

								{/* Right side view in Mobile screen*/}
								<div className='flex items-center lg:hidden'>
									{/*Theme toggle in mobile menu*/}
									<div className='flex items-center px-2'>
										<ThemeToggle />
									</div>
									{/* Mobile menu button */}
									<Disclosure.Button
										className='w-9 h-9 bg-gray-200 rounded-lg dark:bg-zinc-400 flex items-center justify-center  hover:ring-2 ring-zinc-400  transition-all'>
										<span className='sr-only'>Open main menu</span>
										{open ? (
											<XIcon className='w-5 h-5 text-zinc-900 dark:text-zinc-50' aria-hidden='true' />
										) : (
											<MenuIcon className='w-5 h-5 text-zinc-900 dark:text-zinc-50' aria-hidden='true' />
										)}
									</Disclosure.Button>
								</div>

							</div>
						</div>

						<Disclosure.Panel className='lg:hidden'>
							<div className='pt-2 pb-3 space-y-1'>
								{links.map(({ label, href }) => (
									<Disclosure.Button key={label} href={href}
																		 as='a'
																		 className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
																			 router.pathname === href
																				 ? 'bg-indigo-50 border-indigo-500 text-indigo-500 dark:text-indigo-400'
																				 : 'border-transparent hover:bg-zinc-50 hover:border-zinc-300 text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50'
																		 }`}
									>
										{label}
									</Disclosure.Button>
								))}

							</div>
							<div className='pt-4 pb-3 border-t border-gray-200'>
								<div className='flex items-center px-4'>
									<div className='flex-shrink-0'>
										{/* eslint-disable-next-line @next/next/no-img-element */}
										<img
											className='h-10 w-10 rounded-full'
											src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
											alt=''
										/>
									</div>
									<div className='ml-3'>
										<div className='text-base font-medium text-gray-800'>Tom Cook</div>
										<div className='text-sm font-medium text-gray-500'>tom@example.com</div>
									</div>
									<button
										type='button'
										className='ml-auto flex-shrink-0 bg-white p-1 text-gray-400 rounded-full hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
									>
										<span className='sr-only'>View notifications</span>
										<BellIcon className='h-6 w-6' aria-hidden='true' />
									</button>
								</div>
								<div className='mt-3 space-y-1'>
									<Disclosure.Button
										as='a'
										href='#'
										className='block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100'
									>
										Your Profile
									</Disclosure.Button>
									<Disclosure.Button
										as='a'
										href='#'
										className='block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100'
									>
										Settings
									</Disclosure.Button>
									<Disclosure.Button
										as='a'
										href='#'
										className='block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100'
									>
										Sign out
									</Disclosure.Button>
								</div>
							</div>
						</Disclosure.Panel>
					</>
				)}
			</Disclosure>
		</header>
	)
}
