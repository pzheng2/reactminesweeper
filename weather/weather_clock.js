var WeatherClock = React.createClass({
  getInitialState: function () {
    return { date: new Date() };
  },

  componentDidMount: function () {
    this.intervalId = setInterval( function () {
      this.setState( {date: new Date() });
    }.bind(this), 1000);
  },

  componentWillUnmount: function () {
    window.clearInterval(this.intervalId);
  },

  render: function() {
    return <div>{this.state.date.toString()}</div>;
  }
});


var Weather = React.createClass({
  getInitialState: function () {
    return { };
  },

  componentDidMount: function () {
    navigator.geolocation.getCurrentPosition(function (pos) {
      var request = new XMLHttpRequest();
      var latitude = pos.coords.latitude;
      var longitude = pos.coords.longitude;
      request.open('GET', 'http://api.openweathermap.org/data/2.5/weather?lat='+ latitude +'&lon='+ longitude + '&APPID=d178b812c68615f12fa2cf8b79993762', true);
      request.onload = function() {
        if (request.status >= 200 && request.status < 400) {
          var weatherObject = JSON.parse(request.response);
          this.setState({
            temp: weatherObject.main.temp,
            description: weatherObject.weather[0].description
          });
        }
      }.bind(this);

      request.send();
    }.bind(this));
  },


  render: function () {
    return <div>
            <h4>Temp: {this.state.temp}</h4>
            <h4>Weather: {this.state.description}</h4>
           </div>;
  }


});

// http://api.openweathermap.org/data/2.5/weather?lat=35&lon=139&APPID=d178b812c68615f12fa2cf8b79993762
