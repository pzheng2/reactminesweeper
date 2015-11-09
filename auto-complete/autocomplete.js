var AutoComplete = React.createClass({
  getInitialState: function () {
    return { search: "" };
  },

  updateSearch: function (e) {
    this.setState({ search: e.currentTarget.value });
  },

  fillSearch: function (e) {
    this.setState({ search: e.currentTarget.textContent });
  },


  prefix: function (name) {
    if (this.state.search.length <= name.length) {
      for (var j = 0; j < this.state.search.length; j++) {
        if (name[j].toLowerCase() !== this.state.search[j].toLowerCase()) {
          return false;
        }
      }
      return true;
    }

  },

  render: function () {
    var results = [];
    for (var i = 0; i < this.props.names.length; i++) {
      if (this.prefix(this.props.names[i])) {
        results.push(<li key={i} onClick={this.fillSearch}>{this.props.names[i]}</li>);
      }
    }

    return <div className="autocomplete">
       <input type="text" onChange={this.updateSearch} value={this.state.search}>
       </input>
       <ul>{results}</ul>
     </div>;
  }

});
