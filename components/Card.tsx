import { useState } from "react";
import CardInterface from "@/interfaces/Card";
import { useSettingsStore } from "@/store/SettingsStore";
import Link from "next/link";
import { useMainStore } from "@/store/MainStore";

export const Card = (props: CardInterface) => {
    const { daysBeforeSetting } = useSettingsStore(store => store);
    const { removeCard } = useMainStore(store => store);
    const [active, setActive] = useState(false);
    const { id, title, expDate, left, units, listId} = props;

    const toggleActive = () => {
        setActive(!active)
    }

    const checkExpired = () => {
        const daysBeforeInMillisec = daysBeforeSetting * 24 * 60 * 60 * 1000
        const date = new Date()
        const oldDate = new Date(expDate);
        return (date.getTime() - oldDate.getTime()) > daysBeforeInMillisec;
    }
    return <>
        <div className={`list__item${active ? ' active' : ''}`}>
            <div className={`card${active ? ' active' : ''}${checkExpired() ? ' outdated' : ''}`} >
                <div className="card__container" onClick={()=>{toggleActive()}}>
                    <div className="card__top">
                        <div className="card__line">
                            { expDate }
                            <div>exp</div>
                        </div>
                        <div className="card__line">
                            { left + units }
                            <div>left</div>
                        </div>
                    </div>
                    <div className="card__bottom">
                        <h3 className='card__title'>
                            { title }
                        </h3>
                    </div>
                </div>
                <div className="card__options">
                    <Link href={`update/${id}`} className="link link--primary link--centered">Edit</Link>
                    <button type="button" className="link link--secondary link--centered" onClick={()=>{removeCard(id)}}>Remove</button>
                    <div className="card__btns">
                        <button type="button" className="btn btn--sm btn--secondary">-1</button>
                        <button type="button" className="btn btn--sm btn--primary">+1</button>
                    </div>
                </div>
            </div>
        </div>
    </>
}