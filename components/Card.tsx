import { useSettingsStore } from "@/pages/settings";
import { useState } from "react";

export interface CardInterface {
    title: string,
    category: string,
    expDate: string,
    left: number,
    measurement: string
}

export const Card = (props: {
    card: CardInterface
}) => {
    const { daysBeforeSetting } = useSettingsStore(store => store);
    const [active, setActive] = useState(false);
    const { title, category, expDate, left, measurement} = props.card;

    const toggleActive = () => {
        setActive(!active)
    }

    const CompareDates = () => {
        // wrong. Should be rewritten
        return new Date().getDay() - new Date(expDate).getDay() > daysBeforeSetting
    }

    return <>
        <div className={`backdrop ${active ? 'active' : ''}`} onClick={toggleActive}></div>
        <div className={`card ${active ? 'active' : ''} ${CompareDates() ? 'Outdated' : ''}`} onClick={toggleActive}>
          <div className="card__top h4">
            <div className="card__line">
                { expDate }
                <div>exp</div>
            </div>
            <div className="card__line">
                { left + measurement }
                <div>left</div>
            </div>
          </div>
          <div className="card__bottom">
            <h3 className='h2'>
                { title }
            </h3>
            <h4 className='h4'>
                { category }
            </h4>
          </div>
        </div>
    </>
}