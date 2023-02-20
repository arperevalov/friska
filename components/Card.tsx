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

    const checkExpired = () => {
        const daysBeforeInMillisec = daysBeforeSetting * 24 * 60 * 60 * 1000
        const date = new Date()
        const oldDate = new Date(expDate);
        return (date.getTime() - oldDate.getTime()) > daysBeforeInMillisec;
    }

    return <>
        <div className={`backdrop ${active ? 'active' : ''}`} onClick={toggleActive}></div>
        <div className={`card ${active ? 'active' : ''} ${checkExpired() ? 'outdated' : ''}`} 
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
                <Input type="string" label="Title" defaultValue={title} />
                <Input type="string" label="Category" defaultValue={category} />
                <Input type="string" label="Exp" defaultValue={expDate} />
                <Input type="string" label="Left" defaultValue={left} />
                <Input type="string" label="units" defaultValue={units} />
            </form>
        </div>
    </>
}