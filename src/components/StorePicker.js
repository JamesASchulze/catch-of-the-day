import React from 'react';
import PropTypes from "prop-types";
import { getFunName } from "../helpers";

class StorePicker extends React.Component {

   static propTypes = {
      history: PropTypes.object
   }

   myInput = React.createRef();

   goToStore = (event) => {
      // Stop the form from submitting
      event.preventDefault();
      // get the text from the input
      const storeName = this.myInput.current.value;
      // change the page to /store/whatever-they-entered
      this.props.history.push(`/store/${storeName}`);
   }

   render() {
      return (
         <form className="store-selector" onSubmit={this.goToStore}>
            {/* Comment here */}
            <h2>Please Enter A Store</h2>
            <input
               type="text"
               ref={this.myInput}
               required
               placeholder="Store Name"
               defaultValue={getFunName()}
            />
            <button type="submit">Visit Store 👉</button>
         </form>
      )
   }
}

export default StorePicker;