import { useState } from 'react'
import OhmiCard from './OhmiCard'
import { data } from '../testing'

export default function SentOhmies () {
  const [ohmiData] = useState(data)

  return (
    <div>
      <h1>Sent Ohmies</h1>
      <div style={{ display: 'flex' }}>
        {ohmiData.map(ohmi =>
          <OhmiCard
            to={ohmi.to}
            from={ohmi.from}
            title={ohmi.title}
            desc={ohmi.desc}
          />,
        )}
      </div>
    </div>
  )
}