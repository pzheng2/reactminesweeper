var Game = React.createClass({

  getInitialState: function () {
    return {
      board: new Minesweeper.Board(8, 10),
      winner: false,
      over: false
    };
  },

  restartGame: function () {
    this.setState({ board: new Minesweeper.Board(8,10),
                    winner: false,
                    over: false
                  });
  },

  updateGame: function (tile, flagged) {
    if (flagged) {
      tile.toggleFlag();
    } else {
      tile.explore();
    }
    var winstate = false;
    var overstate = false;
    if (this.state.board.won()) {
      winstate = true;
      this.restartGame();
    } else if (this.state.board.lost()) {
      overstate = true;
      this.restartGame();
    }
    this.setState({winner: winstate, over: overstate});
  },


  render: function () {
    var message = "";
    if (this.state.winner) {
      message = "You win!";
    } else if (this.state.over) {
      message = "You lost!";
    }

    var modal = "";
    if (this.state.winner || this.state.over ) {
      modal = <section id="modal" className="modal is-active">
          <article className="modal-content">
            <span className="modal-close js-hide-modal"></span>

            <h1>{message}</h1>

          </article>
          <div className="modal-screen js-hide-modal"></div>
        </section>;
    }

    return <div>{modal}<Board board={this.state.board.grid} game={this.updateGame}/></div>;
  }


});

var Board = React.createClass ({

  render: function () {
    var board = [], tiles = [];
    board = this.props.board.map(function (row, rowIndex) {

      tiles = row.map(function (tile, tileIndex) {
        return <div id={tileIndex}><Tile tile={tile} game={this.props.game}/></div>;
      }.bind(this));

      return <div id={rowIndex}><ul className="group">{tiles}</ul></div>;
    }.bind(this));

    return <div>{board}</div>;
  }

});

var Tile = React.createClass ({

  getInitialState: function () {
    return {
      bombs: 0,
      bombed: false,
      flagged: false,
      revealed: false
    };
  },

  click: function (e) {
    this.props.game(this.props.tile, e.altKey);
  },

  tileStatus: function () {
    var tile = this.props.tile;
    if (tile.bombed) {
      this.setStatus({ bombed: true });
    } else if (tile.explored) {
      this.setStatus({ revealed: true });
      if (tile.adjacentBombCount() > 0) {
        this.setStatus({ bombs: tile.adjacentBombCount() });
      }
    } else if (tile.flagged) {
      this.setStatus({ flagged: true });
    }
  },

  classString: function () {
    var state = "tile";
    var tile = this.props.tile;
    if (tile.bombed) {
      state += " bombed";
    }
    if (tile.explored) {
      state += " revealed";
    }
    if (tile.flagged) {
      state += " flagged";
    }

    return state;
  },

  render: function () {
    var tile = this.props.tile;
    var classString = this.classString();
    var symbol = "";
    if (tile.flagged) {
      symbol = "F";
    } else if (tile.bombed && tile.explored) {
      symbol = "*";
    } else if ((tile.adjacentBombCount() > 0) && tile.explored) {
      symbol = tile.adjacentBombCount();
    }
    return <li onClick={this.click} className={classString}>{symbol}</li>;
  }



});
