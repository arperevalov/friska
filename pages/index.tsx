import Head from "next/head";
import Header from "@/components/Header";
import { useMainStore } from "@/store/MainStore";
import useLists from "@/hooks/useLists";
import useCards from "@/hooks/useCards";
import List from "@/components/List";

export default function Home() {
    const { lists, cards } = useMainStore();

    useLists();
    useCards();

    return (
        <>
            <Head>
                <title>Friska</title>
                <meta name="description" content="" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            <main>
                <div className="container">
                    {lists.map((list) => {
                        return (
                            <List key={list.id} id={list.id} title={list.title} cards={cards}/>
                        );
                    })}
                </div>
            </main>
        </>
    );
}
