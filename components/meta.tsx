import Head from 'next/head'
import siteMetadata from '@/data/siteMetaData'
import { useRouter } from 'next/router'

const Meta = () => {
	const { locale } = useRouter()

	return (
		<Head>
			<title>{siteMetadata.siteName[locale]}</title>
			<meta charSet='utf-8' />
			<meta name='mobile-web-app-capable' content='yes' />
			<meta name='apple-mobile-web-app-capable' content='yes' />
			<meta
				name='apple-mobile-web-app-status-bar-style'
				content='black-translucent'
			/>
			<meta name='apple-mobile-web-app-title' content='Rice Bowl' />
			<meta name='application-name' content='Rice Bowl' />
			<meta name='description' content='Bring your own ingredients' />
			<meta
				name='theme-color'
				content='#f4f4f5'
				media='(prefers-color-scheme: light)'
			/>
			<meta
				name='theme-color'
				content='#18181b'
				media='(prefers-color-scheme: dark)'
			/>
			<meta
				name='viewport'
				content='width=device-width, initial-scale=1, user-scalable=0, viewport-fit=cover'
			/>
			{/*favicons*/}
			<link rel='apple-touch-icon' sizes='180x180' href='/static/favicons/apple-touch-icon.png' />
			<link rel='icon' type='image/png' sizes='32x32' href='/static/favicons/favicon-32x32.png' />
			<link rel='icon' type='image/png' sizes='16x16' href='/static/favicons/favicon-16x16.png' />
			<link rel='manifest' href='/static/favicons/site.webmanifest' />
			<link rel='mask-icon' href='/static/favicons/safari-pinned-tab.svg' color='#5bbad5' />
			<meta name='msapplication-TileColor' content='#da532c' />
			<meta name='theme-color' content='#ffffff' />
		</Head>
	)
}

export default Meta
