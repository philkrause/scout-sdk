import React, { Component } from 'react'

const _Scout = window.Scout

class Scout extends Component {
  state = {
    solo: [],
    loading: true
  }

  data = []
  componentDidMount() {
    console.log('Component did mount')
  }

  componentWillMount() {
    console.log('Component will mount')
  }

  // componentwillUnmount() {
  //   console.log('component will unmount')
  // }

  static init = async () => {
    console.log('Ajax Started')
    await _Scout.configure({
      clientId: process.env.REACT_APP_CLIENT_ID,
      clientSecret: process.env.REACT_APP_CLIENT_SECRET,
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
    const soloData = await _Scout.players.get(
      fortnite.id,
      playerId,
      'p2.br.m0.weekly'
    )

    return (
      console.log('Ajax Finished'),
      sessionStorage.setItem('stats', JSON.stringify(soloData))
    )
  }

  getData = () => {
    this.data = JSON.parse(sessionStorage.getItem('stats'))
    console.log('function fired')
    this.setState({ solo: this.data })
  }

  // this.setState({ loading: false })

  // added render to the class to create a react component
  render() {
    console.log('Render Fired')
    // const data = JSON.parse(sessionStorage.getItem('stats'))
    return (
      <>
        {console.log('Rendering has begun')}
        <h1>Stats</h1>
        {/* {this.data.stats.map(m => {
          return <Stats def={m.metadata.key} totals={m.value} />
        })} */}
      </>
    )
  }
}

export default Scout
