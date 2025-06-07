import CountdownTimer from "@/components/CountdownTimer";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Countdown Timer</title>
        <meta name="description" content="Countdown Timer" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="App">
       <h1>Countdown Timer</h1>
    <CountdownTimer/>
    </div>
    </>
  );
}
