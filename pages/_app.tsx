import '@/styles/globals.css'
import "@/styles/tailwind.css";
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes'
import Meta from '@/components/meta'
import { appWithTranslation } from 'next-i18next';

const App = ({ Component, pageProps }: AppProps) => {
	return (
		<ThemeProvider
			attribute='class'
			defaultTheme='system'
			disableTransitionOnChange
		>
			<Meta />
			<Component {...pageProps} />
		</ThemeProvider>
	)
}

export default appWithTranslation(App);
