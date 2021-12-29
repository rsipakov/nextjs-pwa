/**
 * Main layout component
 *
 * The Layout component wraps around each page and template.
 * It also provides the header, footer as well as the main
 * styles, and meta data for each page.
 *
 */

import Head from 'next/head'
import BottomNav from '@/components/bottom-nav'
import NavBarSearch from '@/components/NavBarSearch'
import React from 'react'

interface Props {
	title?: string
	children: React.ReactNode
}

const LayoutWrapper = ({ title, children }: Props) => (
	<>
		{/* The main header section on top of the screen */}
			{title ? (
				<Head>
					<title>Rice Bowl | {title}</title>
				</Head>
			) : null}
			<NavBarSearch />
		{/* The main content area */}
		<main className='mx-auto px-safe pt-20 pb-16 sm:pb-0 max-w-screen-lg'>
			{/* All the main content gets inserted here, index.js, post.js */}
			<div className='p-6'>{children}</div>
		</main>
		{/* The footer at the very bottom of the mobile screen */}
		<BottomNav />
	</>
)

export default LayoutWrapper
