import React from 'react';
import {Line} from 'react-chartjs-2';
import {ActivityIndicator} from "react-native";

class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
    };

  }
  chart = {
    options: {
      legend:{
        display:false,
      },
      title:{
        display:true,
        text:'Moisture Level',
        fontSize:20
      },
      scales: {
        xAxes: [{
          type: 'time',
          distribution: 'linear'
        }]
      },
    },
    data : {
    labels: [],
    datasets: [
      {
        label: 'Moisture',
        fill: false,
        backgroundColor: 'rgba(0,0,0,1)',
        borderColor: '#4dc9f6', // was rgba(0,0,0,1)
        borderWidth: 2,
        data: []
      }
    ]
    }
  };

  componentDidMount() {
    fetch("https://api.rootlynk.com/v1/device/get_data/24:0A:C4:00:F3:B6/moisture?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHBpcmF0aW9uX2RhdGUiOiIyMDIwLTA4LTIzIDAxOjE4OjIyLjkxMDgxNyIsInNlbGYiOiJ1c2VycyIsImlkIjoxfQ.pOCAFWExTCRCLa8onFfyR6GhvqxOokojRQPGNxCkOsI")
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result);
          this.setState({
            isLoaded: true,
          });
          result['24:0A:C4:00:F3:B6'].map(data => {
            this.chart.data.datasets[0].data.push(data.data);
            this.chart.data.labels.push(data.timestamp)
          })
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <ActivityIndicator />;
    } else {
      return (
        <Line
          data={this.chart.data}
          options={this.chart.options}
        />
      );
    }
  }
}

export default MyComponent