"use client";
import { useGSAP } from "@gsap/react";
import gsap from 'gsap';

const rows = [
    [
        {
            left_count:2,
            title:'Milk',
            units:'lk',
            exp_date:new Date().toLocaleDateString(),
        },
        {
            left_count:2,
            title:'Milk',
            units:'lk',
            exp_date:new Date().toLocaleDateString(),
        },
        {
            left_count:2,
            title:'Milk',
            units:'lk',
            exp_date:new Date().toLocaleDateString(),
        },
        {
            left_count:2,
            title:'Milk',
            units:'lk',
            exp_date:new Date().toLocaleDateString(),
        },
    ],
    [
        {
            left_count:2,
            title:'Milk',
            units:'lk',
            exp_date:new Date().toLocaleDateString(),
        },
        {
            left_count:2,
            title:'Milk',
            units:'lk',
            exp_date:new Date().toLocaleDateString(),
        },
        {
            left_count:2,
            title:'Milk',
            units:'lk',
            exp_date:new Date().toLocaleDateString(),
        },
        {
            left_count:2,
            title:'Milk',
            units:'lk',
            exp_date:new Date().toLocaleDateString(),
        },
    ],
    [
        {
            left_count:2,
            title:'Milk',
            units:'lk',
            exp_date:new Date().toLocaleDateString(),
        },
        {
            left_count:2,
            title:'Milk',
            units:'lk',
            exp_date:new Date().toLocaleDateString(),
        },
        {
            left_count:2,
            title:'Milk',
            units:'lk',
            exp_date:new Date().toLocaleDateString(),
        },
        {
            left_count:2,
            title:'Milk',
            units:'lk',
            exp_date:new Date().toLocaleDateString(),
        },
    ],
]

export default function IntroCards() {
    useGSAP(()=>{
        const timeline = gsap.timeline()
        .to('.intro-cards__row', {
            translateX: (self) => self % 2 === 0 ? -100 : 100,
            duration: 2
        })
        .to('.intro-cards__row', {
            translateX: (self) => self % 2 === 0 ? 100 : -100,
            duration: 2
        })
        .to('.intro-cards__row', {
            translateX: (self) => self % 2 === 0 ? 0 : 0,
            duration: 2
        }).repeat(-1);

        return () => {
            timeline.kill();
        }
    })



    return <>
        <div className="intro-cards">
            <div className="intro-cards__container">
                {rows.map((item, index) => {
                    return <div key={index} className="intro-cards__row">
                        {
                            item.map((rowItem, index) => {
                                return <Card key={index} left_count={rowItem.left_count} title={rowItem.title} units={rowItem.units} exp_date={rowItem.exp_date}/>
                            })
                        }
                    </div>
                })}
            </div>
        </div>
    </>
}

interface CardInterface {
    left_count: number, 
    title: string, 
    units: string, 
    exp_date: string
}

function Card({ left_count, title, units, exp_date}: CardInterface) {
    return <>
        <div className={`intro-cards__item`}>
            <div className={`card`}>
                <div
                    className="card__container">
                    <div className="card__top">
                        <div className="card__line">
                            {exp_date}
                            <div>exp</div>
                        </div>
                        <div className="card__line">
                            {`${left_count} ${units}`}
                            <div>left</div>
                        </div>
                    </div>
                    <div className="card__bottom">
                        <h3 className="card__title">{title}</h3>
                    </div>
                </div>
            </div>
        </div>
    </>
}