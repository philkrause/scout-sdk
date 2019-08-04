import React, { useState, useEffect } from 'react'

export default function Stats() {
  const [stats, setStats] = useState()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setStats(JSON.parse(sessionStorage.getItem('stats')))
    setLoading(false)
  }, [])
  console.log(stats)

  const rt = () => {
    if (!loading) {
      return (
        <>
          {stats.map(m => {
            return <h3>{m.value}</h3>
          })}
        </>
      )
    } else {
      return (
        <>
          <h1>loading...</h1>
        </>
      )
    }
  }

  return (
    <>
      <div>{rt()}</div>
    </>
  )
}
