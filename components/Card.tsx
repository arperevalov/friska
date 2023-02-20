import { useSettingsStore } from "@/pages/settings";
import { useRef, useState } from "react";
import { Input } from "./Input";

export interface CardInterface {
    title: string,
    category: string,
    expDate: string,
    left: number,
    units: string
}

export const Card = (props: CardInterface) => {
    const { daysBeforeSetting } = useSettingsStore(store => store);
    const [active, setActive] = useState(false);
    const { title, category, expDate, left, units} = props;


    const toggleActive = () => {
        setActive(!active)
    }

    const CompareDates = () => {
        // wrong. Should be rewritten
        return new Date().getDay() - new Date(expDate).getDay() > daysBeforeSetting
    }

    return <>
        <div className={`backdrop ${active ? 'active' : ''}`} onClick={toggleActive}></div>
        <div className={`card ${active ? 'active' : ''} ${CompareDates() ? 'Outdated' : ''}`} 
        onClick={()=>{if (!active)toggleActive()}}>
            <div className="card__container">
                <div className="card__top h4">
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
                    <h3 className='h2'>
                        { title }
                    </h3>
                    <h4 className='h4'>
                        { category }
                    </h4>
                </div>
            </div>

            <form action="#" className={`card__form ${active ? 'active' : ''}`}>
                { active ? <Input type="string" label="asdas" /> : null }
            </form>
        </div>
    </>
}