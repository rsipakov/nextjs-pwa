import Link from 'next/link'
import kebabCase from '@/lib/kebabCase'

const Tag = ({ text }) => {
	return (
		<Link href={`/tag/${kebabCase(text)}`}>
			<a className="mr-2 text-sm font-medium uppercase text-indigo-500 dark:text-indigo-400 hover:text-zinc-900 dark:hover:text-zinc-50">
				{text.split(' ').join('-')}
			</a>
		</Link>
	)
}

export default Tag
