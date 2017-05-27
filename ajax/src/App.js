import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const CategoryList = ({items}) => (
  <ul>
    {items.map(item => <li>{item.label}</li>)}
  </ul>
)


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: [],
      status: 'init',
      error: null
    }
  }
  componentDidMount() {
    this.setState({
      status: 'pending'
    })

    fetch('http://localhost:3500/categories')
    .then(res => res.json())
    .then(categories => {
     console.log(categories)
      this.setState({
        status: 'success',
        categories: categories
      })
    })
    .catch(error => {
      this.setState({
        status: 'failure',
        error: error.message
      })
    })
  }
  render() {
    const {error, categories, status} = this.state;
    return (
      <div className="App">
        <h1>AJAX Example</h1>
        {status === 'init' && <div>Init...</div>}
        {status === 'pending' && <div>Loading...</div>}
        {status === 'failure' && <div>Error: {error}</div>}
        {status === 'success' && <CategoryList items={categories} />}
      </div>
    );
  }
}

export default App;
