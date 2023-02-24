import { useSettingsStore } from "@/pages/settings";
import { useMainStore } from "@/pages/index";
import { useState } from "react";
import { Input } from "./Input";

export interface CardInterface {
    id: number,
    title: string,
    category: string,
    expDate: string,
    left: number,
    units: string
}

export const Card = (props: CardInterface) => {
    const { daysBeforeSetting } = useSettingsStore(store => store);
    const { updateCard } = useMainStore(store => store);
    const [active, setActive] = useState(false);
    const { id, title, category, expDate, left, units} = props;
    const [formData, setFormData] = useState({...props});


    const toggleActive = () => {
        setActive(!active)
    }

    const checkExpired = () => {
        const daysBeforeInMillisec = daysBeforeSetting * 24 * 60 * 60 * 1000
        const date = new Date()
        const oldDate = new Date(expDate);
        return (date.getTime() - oldDate.getTime()) > daysBeforeInMillisec;
    }

    const updateCardOnSubmit = () => {
        updateCard(formData);
        setActive(!active);
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
                    <h3 className='card__title h2'>
                        { title }
                    </h3>
                    <h4 className='h4'>
                        { category }
                    </h4>
                </div>
            </div>

            <form action="#" className={`card__form ${active ? 'active' : ''}`} 
                  onSubmit={(event: React.FormEvent)=>{
                    event.preventDefault()
                    updateCardOnSubmit()
                }}>
                <Input type="string" label="Title" defaultValue={title} setFormData={setFormData} formKey="title"/>
                <Input type="string" label="Category" defaultValue={category} setFormData={setFormData} formKey="category"/>
                <Input type="string" label="Best Before" defaultValue={expDate} setFormData={setFormData} formKey="expDate"/>
                <Input type="string" label="Left" defaultValue={left} setFormData={setFormData} formKey="left"/>
                <Input type="string" label="Units" defaultValue={units} setFormData={setFormData} formKey="units"/>

                <button className="btn btn--primary" type="submit">Save</button>
            </form>
        </div>
    </>
}