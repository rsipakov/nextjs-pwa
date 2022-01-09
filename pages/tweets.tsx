import LayoutWrapper from '@/components/LayoutWrapper'
import Section from '@/components/section'
import Tweet from 'components/Tweet'
import { getTweets } from 'lib/twitter'

export default function Tweets({ tweets }) {
	return (
		<LayoutWrapper>
			<Section>
				<div className='flex flex-col justify-center items-start max-w-2xl mx-auto mb-16'>
					<h1 className='font-bold text-3xl md:text-5xl tracking-tight mb-4 text-black dark:text-white'>
						Tweets
					</h1>
					<p className='text-gray-600 dark:text-gray-400 mb-4'>
						This is a collection of tweets I've enjoyed. I use Twitter quite a
						bit, so I wanted a place to publicly share what inspires me, makes me
						laugh, and makes me think.
					</p>
					{tweets.map((tweet) => (
						<Tweet key={tweet.id} {...tweet} />
					))}
				</div>
			</Section>
		</LayoutWrapper>
	)
}

export async function getStaticProps() {
	const tweets = await getTweets([
		'1479924556265672708',
		'1315428840366387204',
		'1479593486953287681',
		'1478774776990781444'

	])

	return { props: { tweets } }
}
