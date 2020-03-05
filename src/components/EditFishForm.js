import React from 'react';
import PropTypes from "prop-types";

class EditFishForm extends React.Component {

   static propTypes = {
      fish: PropTypes.shape({
         image: PropTypes.string,
         name: PropTypes.string,
         desc: PropTypes.string,
         status: PropTypes.string,
         price: PropTypes.number
      }),
      index: PropTypes.string,
      updateFish: PropTypes.func
   }

   handleChange = event => {
      //console.log(event.currentTarget.value);
      // Update fish
      // copy the current fish
      const updatedFish = {
         ...this.props.fish,
         // Computed Property names
         [event.currentTarget.name]: event.currentTarget.value
       };
       // Send the updated fish back up string!
       this.props.updateFish(this.props.index, updatedFish);
   }

   render() {
      return <div className="fish-edit">
         <input
            type="text"
            name="name" // used to ... Computed Property Names.
            onChange={this.handleChange}
            value={this.props.fish.name} />
         <input
            type="text"
            name="price" // used to ... Computed Property Names.
            onChange={this.handleChange}
            value={this.props.fish.price} />
         <select
            type="text"
            name="status" // used to ... Computed Property Names.
            onChange={this.handleChange}
            value={this.props.fish.status} >
               <option value="available">Fresh!</option>
               <option value="unavailable">Sold Out!</option>
         </select>
         <textarea
            name="desc" // used to ... Computed Property Names.
            onChange={this.handleChange}
            value={this.props.fish.desc} />
         <input
            type="text"
            name="image" // used to ... Computed Property Names.
            onChange={this.handleChange}
            value={this.props.fish.image} />
         <button onClick={ () => this.props.deleteFish(this.props.index) }>Remove Fish</button>
      </div>;
   }

}

export default EditFishForm;