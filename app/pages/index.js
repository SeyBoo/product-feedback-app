import Head from 'next/head'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import styles from '../styles/Home.module.css'
import Feedback from '../components/feedback/index'
import Nav from '../components/Nav'
import axios from 'axios'
import Link from 'next/link'


export default function Home() {
  const [data, setData] = useState(false)

  return (
    <div className={styles.container}>
      <Head>
        <title>Home</title>
      </Head>
    <div className={styles.container_inner}>
      <Nav setData={setData} data={data}/>  
      <main className={styles.main}>
        <nav className={styles.nav}>
          <span className={styles.nav_suggestions}>
            <Image src="/suggestions/icon-suggestions.svg" width={25} height={25} alt="#"></Image>
            <p>0 Suggestions</p>
          </span>
          <span>
            <h3>Sort by : <strong>Most Upvotes</strong></h3>
            <i className="fas fa-chevron-down"></i>
          </span>
          <Link styles={styles.feedback_btn} href="/feedback">+ Add Feedback</Link>
        </nav>
        {data? 
          data.map(r => {
            return <Feedback key={r.id} title={r.title} id={r.id} content={r.description} upvotes={r.upvotes} category={r.category} upvoted={JSON.parse(r.upvoted)}></Feedback>
          })
            : <section className={styles.empty}>
          <header className={styles.empty_header}>
            <div className={styles.empty_illustration}>
              <Image src="/suggestions/illustration-empty.svg" alt="#" width="175" height="175"></Image>
            </div> 
            <h1>There is no feedback yet.</h1>
          </header>
          <aside className={styles.empty_content}>
            <p>Got a suggestion? Found a bug that needs to be squashed? We love hearing about new ideas to improve our app.</p>
            <Link styles={styles.feedback_btn} href="/feedback">+ Add Feedback</Link>
          </aside>
        </section>}
      </main> 
      </div>
    </div>
  )
}