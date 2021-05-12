import Head from 'next/head'
import Image from 'next/image'
import { gql } from "@apollo/client";
import client from "../lib/apollo-client";
import styles from '../styles/Home.module.css'

export async function getStaticProps() {
  const { data } = await client.query({
    query: gql`
      query Channels {
        channels {
          name
        }
      }
    `,
  });

  return {
    props: {
      channels: data.channels
    },
 };
}

export default function Home({ channels }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>GQL Chat</title>
        <meta name="description" content="A chat application built with NextJS, GraphQL, MongoDB and NodeJS" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="/">GQL Chat</a>
        </h1>

        <p className={styles.description}>
          Select a channel to join
        </p>

        <div className={styles.grid}>
          {
            channels.map(({ name }) => (
              <a href="#" className={styles.card}>
                <h2>{name}</h2>
                {/* <p>...</p> */}
              </a>
            ))
          }          
        </div>
      </main>

      {/* <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer> */}
    </div>
  )
}
