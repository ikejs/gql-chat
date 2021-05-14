import Head from 'next/head';
import { gql } from "@apollo/client";
import client from "../lib/apollo-client";
import styles from '../styles/Home.module.css';

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
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <p className={styles.description}>
          Get started by editing{' '}
          <code className={styles.code}>pages/index.js</code>
        </p>

        <div className={styles.grid}>
          {
            channels.map(({ name }, i) => (
              <a key={i} href="#" className={styles.card}>
                <h2>{name}</h2>
                {/* <p>...</p> */}
              </a>
            ))
            }
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  )
}
