import Head from 'next/head';
import { gql, useQuery, useMutation } from '@apollo/client';
import styles from '../styles/Home.module.css';

const GET_CHANNELS = gql`
  query Channels {
    channels {
      name
    }
  }
`;

const ADD_CHANNEL = gql`
  mutation addChannel($name: String!) {
    channel(name: $name) {
      id
      name
    }
  }
`;

export default function Home() {

  const { channels, loading, error } = useQuery(GET_CHANNELS);
  const [addChannel, { data }] = useMutation(ADD_CHANNEL);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div className={styles.container}>
      <Head>
        <title>GQL Chat</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">GQL Chat</a>
        </h1>

        <p className={styles.description}>
          Get started by choosing a channel
        </p>

        <div className={styles.grid}>
          {
            channels.map(({ id, name }) => (
              <a key={id} href="#" className={styles.card}>
                <h2>{name}</h2>
                {/* <p>...</p> */}
              </a>
            ))
            }
        </div>
        <button onClick={()=>addChannel({ name: 'test' })} className={styles.button}>New Channel</button>
      </main>
    </div>
  )
}
