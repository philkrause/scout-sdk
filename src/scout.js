import React, { Component } from 'react'
import { Link } from 'react-router-dom'
const _Scout = window.Scout

class Scout extends Component {
  state = {
    solo: []
  }

  static async init() {
    await _Scout.configure({
      clientId: '**',
      clientSecret:
        '**',
      scope: 'public.read'
    })

    let titles = await _Scout.titles.list()
    let fortnite = titles.find(t => t.slug === 'fortnite')

    _Scout.players

      .search('Ninja', 'epic', 'pc', fortnite.id, true, true)
      .then(data => {
        var playerId = data.results[0].player.playerId
        const state = {
          solo: []
        }
        _Scout.players
          .get(fortnite.id, playerId, 'p2.br.m0.weekly')
          .then(solo => {
            console.log(solo)
            console.log(this)
            this.setState({
              solo: state.solo
            })

            // sessionStorage.setItem('stats', JSON.stringify(solo.stats))
          })
      })
  }

  // added render to the class to create a react component
  render() {
    return (
      <>
        <h1>test</h1>
        {/* <Link to={{ pathname: '/stats' }}>
          {solo.map(m => {
            return <p>{m.value}</p>
          })}
        </Link> */}
      </>
    )
  }
}

export default Scout
