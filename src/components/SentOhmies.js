import React, {useState} from 'react'
import OhmiCard from './OhmiCard'



export default function SentOhmies() {
    const [ohmiData, setOhmiData] = useState([
        {
            "id": 1,
            "to": "John",
            "from": "Ben",
            "title": "free car ride",
            "desc": "thanks for walking my dog"
        },
        {
            "id": 2,
            "to": "Joe",
            "from": "Jim",
            "title": "lunch with yours truly",
            "desc": "<3"
        },
        {
            "id": 3,
            "to": "Tim",
            "from": "Sam",
            "title": "you, me, tonight",
            "desc": ";)"
        }
    ])
    
    const handleClick = (id) => (e) => {
        setOhmiData(ohmiData.filter(ohmi => ohmi.id != id))
    }

    return (
        <div>
            <h1>Sent Ohmies</h1>
            <div style={{display: "flex"}}>
            {ohmiData.map(ohmi =>
                <OhmiCard
                    to={ohmi.to}
                    from={ohmi.from}
                    title={ohmi.title}
                    desc={ohmi.desc}
                    handleClick={handleClick(ohmi.id)}
                />
            )}
            </div>
        </div>
    )
}