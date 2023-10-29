import { Component } from 'react';

interface PersonCardProps {
  name: string,
  gender: string,
  hairColor: string,
  birthYear: string
}

class PersonCard extends Component<PersonCardProps> {
  render(){
    return (
      <div className='card'>
        <h4><span>name:</span> {this.props.name}</h4>
        <p><span>gender:</span> {this.props.gender}</p>
        <p><span>hair color:</span> {this.props.hairColor}</p>
        <p><span>birth year:</span> {this.props.birthYear}</p>
      </div>
    )
  }
}

export default PersonCard
