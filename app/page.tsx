"use client";

import useLists from "@/hooks/useLists";
import useCards from "@/hooks/useCards";
import List from "@/components/List";
import Header from "@/components/Header";

export default function Home() {
    const { lists } = useLists();
    const { cards } = useCards();

    if (!lists) return <></>;
    if (lists.length === 0) return <></>;

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
