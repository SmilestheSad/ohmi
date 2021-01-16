import {useState} from 'react'
import OhmiCard from './OhmiCard'
import {data} from '../testing'


export default function ReceivedOhmies() {
    const [ohmiData, setOhmiData] = useState(data)

    const handleClick = (id) => () => {
      setOhmiData(ohmiData.filter(ohmi => ohmi.id !== id))
    }

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
                    handleClick={handleClick(ohmi.id)}
                />
            )}
            </div>
        </div>
    )
}