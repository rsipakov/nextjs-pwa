import LayoutWrapper from '@/components/LayoutWrapper'
import Section from '@/components/section'
import ThemeChanger from '@/components/ThemeChanger'
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const Index = () => {
	const { t } = useTranslation('common');
	return (
		<LayoutWrapper>
			<Section>
				<ThemeChanger />
				<h2 className='text-xl font-semibold text-zinc-800 dark:text-zinc-200'>
					{t('index.title')}
				</h2>
				<div className='mt-2'>
					<p className='text-zinc-600 dark:text-zinc-400'>
						You love rice, and so does the rest of the world. In the crop year
						2008/2009, the milled rice production volume amounted to over{' '}
						<span className='font-medium text-zinc-900 dark:text-zinc-50'>
						448 million tons
					</span>{' '}
						worldwide.
					</p>
					<br />
					<p className='text-sm text-zinc-600 dark:text-zinc-400'>
						<a
							href='https://github.com/mvllow/next-pwa-template'
							className='underline'
						>
							Source
						</a>
					</p>
				</div>
			</Section>
		</LayoutWrapper>
	)
}

export default Index

export const getStaticProps = async ({ locale }:{ locale:any }) => ({
	props: {
		...await serverSideTranslations(locale, ['common']),
	},
})
