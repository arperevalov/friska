import Header from "@/components/Header";
import useLists from "@/hooks/useLists";
import { useMainStore } from "@/store/MainStore";
import { useSettingsStore } from "@/store/SettingsStore";
import { FormEvent, useState } from "react";

export default function Settings() {

    const {daysBeforeSetting, setDaysBeforeSetting} = useSettingsStore(state=>state);
    const {addList} = useMainStore(state=>state);
    const {lists} = useMainStore(state=>state);
    
    const [newListValue, setNewListValue] = useState('')

    useLists()

    const createList = (event: FormEvent) => {
        event.preventDefault();

        addList({
            title: newListValue,
            id: lists.length
        })
        setNewListValue('')
    }

    return <>
    <Header/>
    <main>
        <div className="container">
            <label htmlFor="" className="input">
                <span className="input__label">Best before limit, days</span>
                <input onChange={(event)=>{setDaysBeforeSetting(event.currentTarget.value)}} className="input__input" type='number' value={ daysBeforeSetting } min='0'/>
            </label>
            
            <div className="input">
                <span className="input__label">Categories</span>
                <div className="chips">
                    { lists.length > 0 ? lists.map(list => (
                        <div key={list.id} className="chips__item">
                            {list.title}
                        </div>
                    )) : ''}
                </div>
            </div>
            <form onSubmit={createList}>
                <label htmlFor="" className="input">
                    <span className="input__label">New Category</span>
                    <input className="input__input" value={newListValue} onChange={(event)=>{setNewListValue(event.currentTarget.value)}} type="text" required/>
                </label>
                <button type="submit">Add</button>
            </form>
        </div>
      </main>
    </>
}