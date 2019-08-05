import React, { Component } from 'react'
import Stats from './Stats'
import { Link } from 'react-router-dom'
const _Scout = window.Scout

class Scout extends Component {
  state = {
    solo: [],
    loading: true
  }

  static init = async () => {
    await _Scout.configure({
      clientId: 'af2ef8ea-a458-434e-8c00-26fb8f938eb1',
      clientSecret:
        '10dcae04dca819ab4dd0505fa6dc8b923242bd61230c612a1eaf3377987a4a59',
      scope: 'public.read'
    })

    const titles = await _Scout.titles.list()
    const fortnite = titles.find(t => t.slug === 'fortnite')
    const players = await _Scout.players.search(
      'Ninja',
      'epic',
      'pc',
      fortnite.id,
      true,
      true
    )

    const playerId = players.results[0].player.playerId
    console.log('playerid', playerId)
    const soloData = await _Scout.players.get(
      fortnite.id,
      playerId,
      'p2.br.m0.weekly'
    )

    return sessionStorage.setItem('stats', JSON.stringify(soloData))
  }

  componentDidMount() {
    const data = JSON.parse(sessionStorage.getItem('stats'))
    this.setState({ solo: data.stats })
    this.setState({ loading: false })
  }
  // added render to the class to create a react component
  render() {
    return (
      <>
        {console.log(this.state.solo)}
        <h1>Stats</h1>
        {this.state.loading ? (
          <h1>Loading...</h1>
        ) : (
          this.state.solo.map(m => {
            return <Stats def={m.metadata.key} totals={m.value} />
          })
        )}
      </>
    )
  }
}

export default Scout
