import React, { Component } from "react";
import PropTypes from "prop-types";
import ReactImageFallback from "react-image-fallback";
import FormInlineMessage from "./FormInlineMessage";

class GameForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _id : null,
      name: "",
      description: "",
      price: 0,
      duration: 0,
      players: "",
      featured: false,
      publisher: 0,
      thumbnail: "",
      errors: {}
    };
    this.bindEvents();
  }

  
  componentDidMount() {
    if(this.props.gameForEdit._id){
      const { _id ,name, description, price, duration, players, featured, publisher, thumbnail} = this.props.gameForEdit;
      this.setState({ 
        _id,name,description,price,duration,players,featured,publisher,thumbnail
      });
    }
  }
  

  bindEvents() {
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleNumberChange = this.handleNumberChange.bind(this);
    this.handleStringChange = this.handleStringChange.bind(this);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
  }
  handleNumberChange(e) {
    this.setState({
      [e.target.name]: parseInt(e.target.value)
    });
  }
  handleStringChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  handleCheckboxChange(e) {
    this.setState({
      [e.target.name]: e.target.checked
    });
  }
  validate(gameinfo) {
    const errors = {};
    if (!gameinfo.name) {
      errors.name = "Title can't be blank";
    }
    if (!gameinfo.description) {
      errors.description = "Description is required";
    }
    if (gameinfo.price <= 0) {
      errors.price = "Too cheap, don't you think so?";
    }
    if (gameinfo.duration <= 0) {
      errors.duration = "Too short, isn't it?";
    }
    if (!gameinfo.players) {
      errors.players = "Specify the range of players";
    }
    if (!gameinfo.publisher) {
      errors.publisher = "Publisher is required";
    }
    if (!gameinfo.thumbnail) {
      errors.thumbnail = "Image URL cannot be blank";
    }

    return errors;
  }
  handleSubmit(e) {
    e.preventDefault();
    // console.log({
    //     title : this.name.value
    // });
    const {
      name,
      description,
      price,
      duration,
      players,
      featured,
      publisher,
      thumbnail
    } = this.state;
    const errors = this.validate({
      name,
      description,
      price,
      duration,
      players,
      publisher,
      thumbnail
    });

    if (Object.keys(errors).length === 0) {
      //no errors
      this.props.handleAdd( {
      name,
      description,
      price,
      duration,
      players,
      featured,
      publisher,
      thumbnail
    } );
    } else {
      this.setState({ errors });
    }
  }

  render() {
    const {
      name,
      description,
      price,
      duration,
      players,
      featured,
      publisher,
      thumbnail,
      errors
    } = this.state;
    const { publishers, hideGameForm} = this.props;
    return (
      <form className="ui form" onSubmit={this.handleSubmit}>
        <div className="ui grid">
          <div className="twelve wide column">
            <div className={errors.name ? "field error" : "field"}>
              <label htmlFor="name">Game Title</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Full Game Title"
                //   ref={input => this.name = input}
                value={name}
                onChange={this.handleStringChange}
              />
              <FormInlineMessage content={errors.name} type="error" />
            </div>
            <div className={errors.description ? "field error" : "field"}>
              <label htmlFor="description">Game Description</label>
              <textarea
                id="description"
                name="description"
                placeholder="Full Game Description"
                cols="30"
                rows="10"
                value={description}
                onChange={this.handleStringChange}
              />
              <FormInlineMessage content={errors.description} type="error" />
            </div>
          </div>
          <div className="four wide column">
            {/* {thumbnail ? (
              <img src={thumbnail} alt="Thumbnail" className="ui image" />
            ) : (
              <img
                src="http://via.placeholder.com/250x250"
                alt="Thumbnail"
                className="ui image"
              />
            )} */}
            <ReactImageFallback
              src={thumbnail}
              fallbackImage="http://via.placeholder.com/250x250"
              alt="Thumbnail"
              className="ui image"
            />
          </div>
        </div>
        <div className={errors.thumbnail ? "field error" : "field"}>
          <label htmlFor="thumbnail">Full Game Thumbnail</label>
          <input
            type="text"
            id="thumbnail"
            name="thumbnail"
            placeholder="Full Game Thumbnail"
            value={thumbnail}
            onChange={this.handleStringChange}
          />
          <FormInlineMessage content={errors.thumbnail} type="error" />
        </div>
        <div className="three fields">
          <div className={errors.price ? "field error" : "field"}>
            <label htmlFor="price">Price (cents)</label>
            <input
              type="number"
              id="price"
              name="price"
              placeholder="Full Game Price"
              value={price}
              onChange={this.handleNumberChange}
            />
            <FormInlineMessage content={errors.price} type="error" />
          </div>
          <div className={errors.duration ? "field error" : "field"}>
            <label htmlFor="duration">Full Game Duration</label>
            <input
              type="number"
              id="duration"
              name="duration"
              placeholder="Full Game Duration"
              value={duration}
              onChange={this.handleNumberChange}
            />
            <FormInlineMessage content={errors.duration} type="error" />
          </div>
          <div className={errors.players ? "field error" : "field"}>
            <label htmlFor="players">Maximum Players</label>
            <input
              type="text"
              id="players"
              name="players"
              placeholder="Maximum Players"
              value={players}
              onChange={this.handleStringChange}
            />
            <FormInlineMessage content={errors.players} type="error" />
          </div>
        </div>
        <div className="inline field">
          <input
            type="checkbox"
            id="featured"
            name="featured"
            checked={featured}
            onChange={this.handleCheckboxChange}
          />
          <label htmlFor="featured">Featured?</label>
        </div>

        <div className={errors.publisher ? "field error" : "field"}>
          <label htmlFor="">Publisher</label>
          <select
            name="publisher"
            value={publisher}
            onChange={this.handleNumberChange}
          >
            <option value="0">Choose Option</option>
            {publishers.map(publisher => (
              <option value={publisher._id} key={publisher._id}>
                {publisher.name}
              </option>
            ))}
          </select>
          <FormInlineMessage content={errors.publisher} type="error" />
        </div>

        <div className="ui fluid buttons">
          <button className="ui primary button" type="submit">
            Create
          </button>
          <div className="or" />
          <a className="ui button" onClick={hideGameForm}>
            Cancel
          </a>
        </div>
      </form>
    );
  }
}
GameForm.propTypes = {
  publishers: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired
    })
  ).isRequired,
  hideGameForm: PropTypes.func.isRequired,
  handleAdd : PropTypes.func.isRequired,
  gameForEdit : PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
    thumbnail : PropTypes.string,
    players : PropTypes.string,
    price : PropTypes.number,
    featured: PropTypes.bool,
    duration : PropTypes.number
  }).isRequired,
};

GameForm.defaultProps = {
  publishers: []
};

export default GameForm;
