"use client";

import useLists from "@/hooks/useLists";
import useCards from "@/hooks/useCards";
import List from "@/components/List";
import Header from "@/components/Header";
import Link from "next/link";

export default function Home() {
    const { lists } = useLists();
    const { cards } = useCards();

    if (!lists) return <></>;
    if (lists.length === 0)
        return (
            <>
                <Header />
                <main>
                    <div className="container">
                        <h1 className="h1">There are no lists!</h1>
                        <Link href="/settings" className="link link--primary">
                            Create new at settings
                        </Link>
                    </div>
                </main>
            </>
        );

    return (
        <>
            <Header />
            <main>
                <div className="container">
                    {lists.map((list) => {
                        return <List key={list.id} id={list.id} title={list.title} cards={cards} />;
                    })}
                </div>
            </main>
        </>
    );
}
