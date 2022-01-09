import { useState } from 'react'
import BlogPost from '@/components/BlogPost'
import { InferGetStaticPropsType } from 'next'
import { pick } from '@/lib/utils'
import { allBlogs } from '@/.contentlayer/data'
import LayoutWrapper from '@/components/LayoutWrapper'
import Section from '@/components/section'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Tag from '@/components/Tag'
import path from 'path'
import kebabCase from '@/lib/kebabCase'
import CustomLink from '@/components/CustomLink'


export default function IndexNews({
																		posts,
																		tags,
																	}: InferGetStaticPropsType<typeof getStaticProps>) {
	const [searchValue, setSearchValue] = useState('')

	const filteredBlogPosts = posts.filter((post) =>
		post.title.toLowerCase().includes(searchValue.toLowerCase())
	)

	const { t } = useTranslation('common')

	const sortedTags = Object.keys(tags).sort((a, b) =>
		tags[b] - tags[a]
	)

	return (
		<LayoutWrapper>
			<Section>
				<div className='flex flex-col items-start justify-center max-w-2xl mx-auto mb-16'>
					<h1 className='mb-4 text-3xl font-bold tracking-tight text-black md:text-5xl dark:text-white'>
						{t('news.title')}
					</h1>
					<p className='mb-4 text-zinc-600 dark:text-zinc-400'>
						I have written <span className='font-bold'>{`${posts.length}`}</span> articles on my blog.
						Use the search below to filter by title.
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
					<h3 className='mt-4 mb-4 text-2xl font-bold tracking-tight text-black md:text-4xl dark:text-white'>
						All Tags
					</h3>

					{/* #region //*=== Display getBlogTags (solution based on 'tailwind-nextjs-starter-blog') === */}
					<div className="flex flex-wrap">
						{Object.keys(tags).length === 0 && 'No tags found.'}
						{sortedTags.map((ts) => {
							return (
								<div key={ts} className="mt-2 mb-2 mr-5">
									<Tag text={ts} />
									<CustomLink
										href={`/tags/${kebabCase(t)}`}
										className="-ml-2 text-sm font-semibold text-gray-600 uppercase dark:text-gray-300"
									>
										{` (${tags[ts]})`}
									</CustomLink>
								</div>
							)
						})}
					</div>
					{/*//#endregion */}

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

//#region  //*==== getBlogTags (solution based on 'segunadebayo/adebayosegun.com') ===
//* Get tags of each post
// export function getBlogTags(data = allBlogs) {
// 	const values = data.flatMap((blog) => blog.tags);
//	return Array.from(new Set(values));
// }
//#endregion

//#region  //*=== getBlogTags (solution based on theodorusclarence/theodorusclarence.com) ===
// import countBy from 'lodash/countBy';
// import map from 'lodash/map';
// import sortBy from 'lodash/sortBy';
// import toPairs from 'lodash/toPairs';
//* Get tags of each post and remove duplicates
// export function getBlogTags(data = allBlogs) {
//	const values = data.flatMap((blog) => blog.tags);
//	return map(sortBy(toPairs(countBy(values)), 1), 0).reverse();
// }
//#endregion

//#region //* Get tags of each post === (solution based on 'tailwind-nextjs-starter-blog') ===
export function getBlogTags(data = allBlogs) {

	const values = data.flatMap((blog) => blog.tags)
	let tagCount = {}
	// Iterate through each post, putting all found tags into `tags`
	values.forEach((tag) => {
			const formattedTag = kebabCase(tag)
			if (formattedTag in tagCount) {
				tagCount[formattedTag] += 1
			} else {
				tagCount[formattedTag] = 1
			}
		}
	)
	return tagCount
}
//#endregion

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
	// Accumulate tags
	const tags = getBlogTags();
	return {
		props: {
			...(await serverSideTranslations(locale, ['common'])),
			posts,
			tags
		},
	}
}
