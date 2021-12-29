import { useTheme } from 'next-themes'

export default function ThemeChanger() {
	const { theme, setTheme } = useTheme()
	return (
			<div className="py-5 flex flex-col items-center justify-center">
				<button
					className="px-4 py-2 text-zinc-50 dark:text-zinc-900 bg-zinc-900 dark:bg-zinc-50 font-semibold rounded-md"
					onClick={() => {
						setTheme(theme === 'light' ? 'dark' : 'light')
					}}
				>
					Change Theme
				</button>
			</div>

	)
}
