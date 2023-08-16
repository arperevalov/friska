import { useEffect, useState } from "react";
import { Input } from "./Input";
import { Select } from "./Select";
import CardInterface from "@/interfaces/Card";
import { useSettingsStore } from "@/store/SettingsStore";
import { useMainStore } from "@/store/MainStore";

export const Card = (props: CardInterface) => {
    const { daysBeforeSetting } = useSettingsStore(store => store);
    const { updateCard, lists } = useMainStore(store => store);
    const [active, setActive] = useState(false);
    const { id, title, expDate, left, units, listId} = props;
    const [formData, setFormData] = useState({...props});
    const [category, setCategory] = useState('');

    useEffect(()=>{
        const category = () => {
            const index =  lists.findIndex(list => {
                return list.id === listId
            })
            return  lists[index].title
        }
        setCategory(category)
    },[])

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
        <div className={`list__item${active ? ' active' : ''}`}>
            <div className={`card${active ? ' active' : ''}${checkExpired() ? ' outdated' : ''}`} 
            onClick={()=>{if (!active)toggleActive()}}>
                <div className="card__container">
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
            </div>
        </div>
    </>
}