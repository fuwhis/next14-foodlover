/* eslint-disable @next/next/no-img-element */
"use client";
import logoImg from '@/assets/logo.png';
import Image from "next/image";
import Link from "next/link";
import { usePathname } from 'next/navigation';
import classes from './main-header.module.css';
import NavLink from './nav-link';

export default function MainHeader() {
  const path = usePathname()

  return (
    <>
      <header className={classes.header}>
        <Link className={classes.logo} href='/'>
          <Image src={logoImg} alt="A plate with food on it" priority />
          NextLevel Food
        </Link>

        <nav className={classes.nav}>
          <ul>
            <li><NavLink href='/meals'>Browse Meals</NavLink></li>
            <li><NavLink href='/community'>Foodies Community</NavLink></li>
          </ul>
        </nav>
      </header>
    </>
  );
}
