import Head from 'next/head'
import { Icon } from '@iconify/react';
import Card from './_cards';
import { useEffect } from 'react';
import { motion } from 'framer-motion';


export default function Home() {

  const toggleDarkMode = () => {
    const html = document.querySelector('html');
    const themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon')!;
    const themeToggleLightIcon = document.getElementById('theme-toggle-light-icon')!;

    // Toggle the "dark" class on the <html> element and change the icon visibile
    if (localStorage.getItem('color-theme') === 'dark') {
      html!.classList.remove('dark');
      localStorage.removeItem('color-theme');
      themeToggleDarkIcon.classList.remove('hidden');
      themeToggleLightIcon.classList.add('hidden');
    } else {
      html!.classList.add('dark');
      localStorage.setItem('color-theme', 'dark');
      themeToggleDarkIcon.classList.add('hidden');
      themeToggleLightIcon.classList.remove('hidden');
    }
  };

  // set the intial color theme on load based on the user's preference
  useEffect(() => {
    const html = document.querySelector('html');
    const themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon')!;
    const themeToggleLightIcon = document.getElementById('theme-toggle-light-icon')!;
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    const userPrefersDark = prefersDarkScheme.matches;
    const userHasUsedToggle = localStorage.getItem('color-theme');

    if (userHasUsedToggle) {
      html!.classList.add('dark');
      themeToggleDarkIcon.classList.add('hidden');
      themeToggleLightIcon.classList.remove('hidden');
    } else if (userPrefersDark) {
      html!.classList.add('dark');
      themeToggleDarkIcon.classList.add('hidden');
      themeToggleLightIcon.classList.remove('hidden');
    } else {
      html!.classList.remove('dark');
      themeToggleDarkIcon.classList.remove('hidden');
      themeToggleLightIcon.classList.add('hidden');
    }
  }, []);

  const Header: React.FC<{ toggleDarkMode: () => void }> = ({ toggleDarkMode }) => (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/90 dark:bg-vscode-sidebar/95 shadow-md">
      <nav className="px-4 sm:px-6 py-4 border-b-2 border-vscode-accent/20">
        <div className="container flex flex-wrap mx-auto items-center justify-between">
          <motion.a
            href="#"
            className="flex items-center gap-1"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.img
              src="/fish_logo.webp"
              className="h-8 sm:h-12"
              alt="Sea of Thieves Cooking Timer Logo"
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            />
            <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-vscode-accent to-blue-400 bg-clip-text text-transparent dark:from-vscode-accent dark:to-blue-300">
              SoT Cooking Timer
            </span>
          </motion.a>
          <div className="flex items-center gap-2 sm:gap-3">
            <motion.button
              id="theme-toggle"
              onClick={toggleDarkMode}
              type="button"
              className="p-2.5 rounded-lg bg-gray-200 dark:bg-vscode-highlight hover:bg-gray-300 dark:hover:bg-vscode-border transition-colors duration-200"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg id="theme-toggle-dark-icon" className="hidden w-5 h-5 text-gray-800" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path></svg>
              <svg id="theme-toggle-light-icon" className="hidden w-5 h-5 text-vscode-text" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" fillRule="evenodd" clipRule="evenodd"></path></svg>
            </motion.button>
            <motion.a
              href='https://github.com/mrciolino/SoT_Fishing_Timer'
              title="Github Repo"
              className="p-2.5 rounded-lg bg-gray-200 dark:bg-vscode-highlight hover:bg-gray-300 dark:hover:bg-vscode-border transition-colors duration-200 text-gray-800 dark:text-vscode-text"
              whileHover={{ scale: 1.1, rotate: 360 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <Icon icon="mdi:github" className="w-5 h-5" />
            </motion.a>
            <motion.a
              href='https://i.imgur.com/JduEMsl.png'
              title="Fishing Guide"
              className="p-2.5 rounded-lg bg-gray-200 dark:bg-vscode-highlight hover:bg-gray-300 dark:hover:bg-vscode-border transition-colors duration-200 text-gray-800 dark:text-vscode-text"
              whileHover={{ scale: 1.1, y: -3 }}
              whileTap={{ scale: 0.9 }}
            >
              <Icon icon="ph:fish" className="w-5 h-5" />
            </motion.a>
          </div>
        </div>
      </nav>
    </header>
  );

  const InfoBanner: React.FC = () => (
    <motion.div
      className='bg-vscode-accent/10 dark:bg-vscode-highlight border-b border-vscode-accent/30 p-2 text-center'
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <p className='text-xs sm:text-sm font-medium text-gray-700 dark:text-vscode-text'>
        <span className="opacity-80">Click:</span> Start/Pause
        <span className="mx-2 opacity-50">•</span>
        <span className="opacity-80">Double:</span> Reset
      </p>
    </motion.div>
  );

  const CardGrid: React.FC = () => (
    <div className="container mx-auto max-w-7xl">
      <motion.div
        className="grid gap-2 sm:gap-2 grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Card title="Fish" image="/fish.webp" duration={40} />
        <Card title="Trophy" image="/trophy.webp" duration={90} />
        <Card title="Chicken" image="/chicken.webp" duration={60} />
        <Card title="Pork" image="/pork.webp" duration={60} />
        <Card title="Snake" image="/snake.webp" duration={60} />
        <Card title="Shark" image="/shark.webp" duration={60} />
        <Card title="Meg" image="/meg.webp" duration={120} />
        <Card title="Kraken" image="/kraken.webp" duration={120} />
      </motion.div>
    </div>
  );

  const Footer: React.FC = () => (
    <footer className='bg-gray-200 dark:bg-vscode-sidebar text-gray-800 dark:text-vscode-text py-8 px-4 border-t-2 border-vscode-border'>
      <div className="container mx-auto max-w-7xl">
        <motion.div
          className='text-center space-y-4'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className='flex justify-center items-center flex-wrap gap-3 text-xs sm:text-sm text-vscode-textMuted'>
            <span className="inline-flex items-center gap-1">
              <Icon icon="mdi:tailwind" className="w-4 h-4 opacity-60" />
              Tailwind CSS
            </span>
            <span className="opacity-50">•</span>
            <span className="inline-flex items-center gap-1">
              <span className="opacity-80">Single Click:</span>
              Start/Pause
            </span>
            <span className="opacity-50">•</span>
            <span className="inline-flex items-center gap-1">
              <span className="opacity-80">Double Click:</span>
              Reset
            </span>
          </div>
          <div className='flex justify-center items-center gap-2 text-xs sm:text-sm text-vscode-textMuted'>
            <span>by Matthew Ciolino</span>
            <a aria-label="Matthew Ciolino" href="https://www.matthewciolino.com/" className="underline underline-offset-4 decoration-vscode-border hover:text-vscode-text transition-colors">
              Portfolio
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  );

  return (
    <>
      <Head>
        <title>Sea of Thieves Cooking Timer</title>
        <meta name="description" content="Modern and responsive Sea of Thieves Cooking Timer web application. Provides countdown until cooked." />
        <meta name="keywords" content="sea of thieves, cooking, fishing, cooking timer, fishing timer, cooking countdown" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/fish_logo.webp" />
      </Head>

      <div className='min-h-screen bg-gray-100 dark:bg-vscode-bg'>
        <Header toggleDarkMode={toggleDarkMode} />

        {/* Info banner */}
        <InfoBanner />

        {/* Main content */}
        <main className='p-2 sm:p-3 md:p-4 lg:py-8 lg:px-4 xl:py-10 xl:px-8 bg-white dark:bg-vscode-bg min-h-[calc(100vh-200px)]'>
          <CardGrid />
        </main>
      </div>
    </>
  )
}
