import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './index.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      campers: []
    };
  }

  componentDidMount() {
    axios.get('https://fcctop100.herokuapp.com/api/fccusers/top/alltime')
    .then(res => {
      this.setState({
        campers: res.data
      });
    });
  }

  sortCampers(property) {
    var sorted = this.state.campers.sort((x, y) => {
      if(x[property] > y[property]) {
        return -1;
      }
      if(x[property] < y[property]) {
        return 1;
      }
      return 0;
    });

    this.setState({
      campers: sorted
    });
  }

  
  render() {
    return (
      <div className="App">
        <h1>FreeCodeCamp's Camper Leaderboard</h1>
        <table>
          <thead>
          <tr>
            <th>#</th>
            <th>Camper Name</th>
            <th className="sort"  onClick={() => this.sortCampers('recent')}>Points in past 30 days</th>
            <th className="sort"  onClick={() => this.sortCampers('alltime')}>All time points</th>
          </tr>
          </thead>
          <tbody>
            {this.state.campers.map((camper, index) => {
              return<Camper key={index} num={index} username={camper.username} img={camper.img} url={'https://freecodecamp.com/' + camper.username}  recent={camper.recent} alltime={camper.alltime} />
            })}
            </tbody>
          </table>
      </div>
    );
  }
}

function Camper(props) {
  return (
    <tr>
      <td>{props.num}</td>
      <td style={{textAlign: 'left'}}><img src={props.img} alt="avatar"/> <a href={props.url} target="__blank">{props.username}</a></td>
      <td>{props.recent}</td>
      <td>{props.alltime}</td>
    </tr>
  )
}


ReactDOM.render(
  <App />,
  document.getElementById('root')
);
