import Head from 'next/head'
import NextScript from 'next/script'
import { Inter } from '@next/font/google'
import { Icon } from '@iconify/react';
import Card from './_cards';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
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

      <header className="box-content">
        <nav className="bg-white px-2 sm:px-4 py-2.5 dark:bg-gray-900 w-full z-20 border-b border-gray-200 dark:border-gray-600">
          <div className="container flex flex-wrap items-center justify-between mx-auto">
            <a href="#" className="flex items-center">
              <img src="/fish_logo.webp" className="h-6 mr-3 sm:h-9" alt="Sea of Thieves Cooking Timer Logo" />
              <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">SoT Cooking Timer</span>
            </a>
            <div className="flex text-3xl gap-5">
              <a href='https://github.com/mrciolino/SoT_Fishing_Timer' title="Github Repo"><Icon icon="mdi:github" /></a>
              <a href='https://i.imgur.com/JduEMsl.png' title="Fishing Guide"><Icon icon="ph:fish" /></a>
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

      <div className='flex justify-center items-center bg-slate-100 dark:bg-gray-900 select-none'>
        <div className="container bg-slate-100 p-4 grid gap-5 grid-cols-2 lg:grid-cols-4">
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

      <footer className='box-content bg-slate-300 text-sm text-gray-800 p-5 text-center items-center dark:text-gray-400'>
        <div>
          <strong> Single Click - Start Timer | Double Click - Reset Timer </strong>
        </div>
        <div className='flex justify-center items-center flex-wrap'>
          Made with Next.js &nbsp; <a aria-label="NextJS" href="https://nextjs.org/" className="ml-1"><Icon icon="simple-icons:nextdotjs" /></a> &nbsp;
          and TailWindCSS &nbsp; <a aria-label="TailWindCSS" href="https://tailwindcss.com/" className="ml-1"><Icon icon="mdi:tailwind" /></a> &nbsp;
          by Matthew Ciolino &nbsp;<a aria-label="Matthew Ciolino" href="https://www.matthewciolino.com/"> <img src="/portfolio.webp" alt="Portfolio Logo" className="h-5 inline" /></a>
        </div>
      </footer>

    </>
  )
}
