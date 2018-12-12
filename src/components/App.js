import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  onChangeType = (e) => {
    this.setState({
      filters: {
        type: e.target.value
      }
    })
  }

  onAdoptPet = (id) => {
    const pets = this.state.pets.map(p => {
      return p.id === id ? { ...p, isAdopted: true } : p
    })
    this.setState({ pets })
  }

  onFindPetsClick = () => {
    if (this.state.filters.type === "all")  {
      return fetch('/api/pets').then(r => r.json()).then(pets => this.setState({ pets }))
  } else if (this.state.filters.type === "cat") {
      return fetch('/api/pets?type=cat').then(r => r.json()).then(pets => this.setState({ pets }))
  } else if (this.state.filters.type === "dog") {
      return fetch('/api/pets?type=dog').then(r => r.json()).then(pets => this.setState({ pets }))
  } else if (this.state.filters.type === "micropig") {
      return fetch('/api/pets?type=micropig').then(r => r.json()).then(pets => this.setState({ pets }))
  }
  }

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onChangeType={this.onChangeType} onFindPetsClick={this.onFindPetsClick} />
            </div>
            <div className="twelve wide column">
              <PetBrowser onAdoptPet={this.onAdoptPet} pets={this.state.pets} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
