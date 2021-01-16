import React from 'react'
import OhmiCard from './OhmiCard'



export default function ReceivedOhmies() {
    const ohmiData = [
        {
            "to": "John",
            "from": "Ben",
            "title": "free car ride",
            "desc": "thanks for walking my dog"
        },
        {
            "to": "Joe",
            "from": "Jim",
            "title": "lunch with yours truly",
            "desc": "<3"
        },
        {
            "to": "Tim",
            "from": "Sam",
            "title": "you, me, tonight",
            "desc": ";)"
        }
    ]
    return (
        <div>
            <h1>Received Ohmies</h1>
            <div style={{display: "flex"}}>
            {ohmiData.map(ohmi =>
                <OhmiCard
                    to={ohmi.to}
                    from={ohmi.from}
                    title={ohmi.title}
                    desc={ohmi.desc}
                />
            )}
            </div>
        </div>
    )
}