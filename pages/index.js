import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Hello from '@/components/Hello/Hello'
export default function Home() {
  return (
    <>
    <Hello />
    </>
  )
}
