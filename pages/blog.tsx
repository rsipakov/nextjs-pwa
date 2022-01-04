import { useState } from 'react'
import BlogPost from 'components/BlogPost'
import { InferGetStaticPropsType } from 'next'
import { pick } from '@/lib/utils'
import { allBlogs } from '.contentlayer/data'
import LayoutWrapper from '@/components/LayoutWrapper'
import Section from '@/components/section'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export default function Blog({
	posts,
	tags,
}: InferGetStaticPropsType<typeof getStaticProps>) {
	const [searchValue, setSearchValue] = useState('')
	const filteredBlogPosts = posts.filter((post) =>
		post.title.toLowerCase().includes(searchValue.toLowerCase())
	)
	const { t } = useTranslation('common')

	return (
		<LayoutWrapper>
			<Section>
				<div className='flex flex-col items-start justify-center max-w-2xl mx-auto mb-16'>
					<h1 className='mb-4 text-3xl font-bold tracking-tight text-black md:text-5xl dark:text-white'>
						{t('blog.title')}
					</h1>
					<p className='mb-4 text-gray-600 dark:text-gray-400'>
						{`I've been writing online since 2014, mostly about web development and tech careers.
            In total, I've written ${posts.length} articles on my blog.
            Use the search below to filter by title.`}
					</p>
					<div className='relative w-full mb-4'>
						<input
							aria-label='Search articles'
							type='text'
							onChange={(e) => setSearchValue(e.target.value)}
							placeholder='Search articles'
							className='block w-full px-4 py-2 text-gray-900 bg-white border border-gray-200 rounded-md dark:border-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-gray-100'
						/>
						<svg
							className='absolute w-5 h-5 text-gray-400 right-3 top-3 dark:text-gray-300'
							xmlns='http://www.w3.org/2000/svg'
							fill='none'
							viewBox='0 0 24 24'
							stroke='currentColor'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth={2}
								d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
							/>
						</svg>
					</div>
					{!searchValue && (
						<>
							<h3 className='mt-8 mb-4 text-2xl font-bold tracking-tight text-black md:text-4xl dark:text-white'>
								Most Popular
							</h3>
							<BlogPost
								title='Everything I Know About Style Guides, Design Systems, and Component Libraries'
								summary="A deep-dive on everything I've learned in the past year building style guides, design systems, component libraries, and their best practices."
								slug='style-guides-component-libraries-design-systems'
							/>
						</>
					)}
					<h3 className='mt-8 mb-4 text-2xl font-bold tracking-tight text-black md:text-4xl dark:text-white'>
						All Tags
					</h3>
					{tags.map((tag) => (
						<span>{tag}</span>
					))}
					<h3 className='mt-8 mb-4 text-2xl font-bold tracking-tight text-black md:text-4xl dark:text-white'>
						All Posts
					</h3>
					{!filteredBlogPosts.length && (
						<p className='mb-4 text-gray-600 dark:text-gray-400'>
							No posts found.
						</p>
					)}
					{filteredBlogPosts.map((post) => (
						<BlogPost key={post.title} {...post} />
					))}
				</div>
			</Section>
		</LayoutWrapper>
	)
}

export async function getStaticProps({ locale }) {
	const posts = allBlogs
		.map((post) =>
			pick(post, ['slug', 'title', 'summary', 'publishedAt', 'locale', 'tags'])
		)
		.filter((post) => post.locale === locale)
		.sort(
			(a, b) =>
				Number(new Date(b.publishedAt)) - Number(new Date(a.publishedAt))
		)

	const tags = [
		...new Set(
			...allBlogs.map((post) => pick(post, ['tags'])).map((x) => x.tags)
		),
	]
	return {
		props: {
			...(await serverSideTranslations(locale, ['common'])),
			posts,
			tags,
		},
	}
}
