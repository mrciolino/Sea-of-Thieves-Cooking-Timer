import Head from 'next/head'
import NextScript from 'next/script'
import { Icon } from '@iconify/react';
import Card from './_cards';
import { useEffect } from 'react';


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

  return (
    <>
      <Head>
        <title>Sea of Thieves Cooking Timer</title>
        <meta name="description" content="Simple and responsive Sea of Thieves Cooking Timer web application. Provides countdown until cooked." />
        <meta name="keywords" content="sea of thieves, cooking, fishing, cooking timer, fishing timer, cooking countdown" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/fish_logo.webp" />
        <NextScript src="node_modules/flowbite/dist/flowbite.min.css"></NextScript>
      </Head>

      <div className='h-screen bg-slate-300 dark:bg-gray-900'>
        <header className="box-content">
          <nav className="bg-white px-2 sm:px-4 py-2.5 w-full z-20 border-b border-gray-200 dark:bg-gray-900 dark:border-gray-600">
            <div className="container flex flex-wrap mx-auto md:justify-between justify-center">
              <a href="#" className="flex items-center">
                <img src="/fish_logo.webp" className="h-6 mr-3 sm:h-9" alt="Sea of Thieves Cooking Timer Logo" />
                <span className="self-center text-xl font-semibold whitespace-nowrap text-gray-800 dark:text-white">SoT Cooking Timer</span>
              </a>
              <div className="flex text-3xl gap-3 text-gray-800 dark:text-gray-200">
                <button id="theme-toggle" onClick={toggleDarkMode} type="button" className="text-gray-1000 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5">
                  <svg id="theme-toggle-dark-icon" className="hidden w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path></svg>
                  <svg id="theme-toggle-light-icon" className="hidden w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" fillRule="evenodd" clipRule="evenodd"></path></svg>
                </button>
                <a href='https://github.com/mrciolino/SoT_Fishing_Timer' title="Github Repo" className="text-gray-1000 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg p-2.5"><Icon icon="mdi:github" /></a>
                <a href='https://i.imgur.com/JduEMsl.png' title="Fishing Guide" className="text-gray-1000 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg p-2.5"><Icon icon="ph:fish" /></a>
              </div>
            </div>
          </nav>
        </header>

        {/* Cooking Time (in seconds)
        Food	              Under-cooked	Cooked	Burnt
        Fish	              30s	          40s	    80s
        Trophy Fish	        80s	          90s	    180s
        Meat	              50s	          60s	    120s
        Kraken & Megalodon	100s	        120s	  240s */}

        <div className='flex justify-center items-center bg-slate-100 select-none dark:bg-gray-700'>
          <div className="container bg-slate-100 p-4 grid gap-5 grid-cols-2 lg:grid-cols-4 dark:bg-gray-700">
            <Card title="Fish" image="/fish.webp" duration={40} />
            <Card title="Trophy" image="/trophy.webp" duration={90} />
            <Card title="Chicken" image="/chicken.webp" duration={60} />
            <Card title="Pork" image="/pork.webp" duration={60} />
            <Card title="Snake" image="/snake.webp" duration={60} />
            <Card title="Shark" image="/shark.webp" duration={60} />
            <Card title="Meg" image="/meg.webp" duration={120} />
            <Card title="Kraken" image="/kraken.webp" duration={120} />
          </div>
        </div>

        <footer className='box-content bg-slate-300 text-sm text-gray-800 p-5 text-center items-center dark:text-gray-200 dark:bg-gray-900'>
          <div>
            <strong> Single Click - Start Timer | Double Click - Reset Timer </strong>
          </div>
          <div className='flex justify-center items-center flex-wrap'>
            Made with Next.js &nbsp; <a aria-label="NextJS" href="https://nextjs.org/" className="ml-1"><Icon icon="simple-icons:nextdotjs" /></a> &nbsp;
            and TailWindCSS &nbsp; <a aria-label="TailWindCSS" href="https://tailwindcss.com/" className="ml-1"><Icon icon="mdi:tailwind" /></a> &nbsp;
            by Matthew Ciolino &nbsp;<a aria-label="Matthew Ciolino" href="https://www.matthewciolino.com/"> <img src="/portfolio.webp" alt="Portfolio Logo" className="h-5 inline" /></a>
          </div>
        </footer>
      </div>
    </>
  )
}
