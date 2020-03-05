import React from "react";
import PropTypes from "prop-types";
import Header from "./Header";
import Order from "./Order";
import Inventory from "./Inventory";
import sampleFishes from "../sample-fishes";
import Fish from "./Fish";
import base from "../base";

class App extends React.Component {

   state = {
      fishes: {},
      order: {}
   };

   static propTypes = {
      match: PropTypes.object
   }

   componentDidMount() {
      const { params } = this.props.match;
      // Reinstate local storage, so that it is not wiped out when the page is reloaded.
      const localStorageRef = localStorage.getItem(params.storeId);
      if (localStorageRef) {
         this.setState({ order: JSON.parse(localStorageRef) })
      }
      // Store this.ref, so that it can be removed when the component is unmounted.
      this.ref = base.syncState(`${params.storeId}/fishes`, {
         context: this,
         state: "fishes"
      });
   }

   componentDidUpdate() {
      console.log(this.state.order);
      localStorage.setItem(this.props.match.params.storeId,
         JSON.stringify(this.state.order));
      console.log("it updated");
   }

   componentWillUnmount() {
      base.removeBinding(this.ref);
   }

   addFish = fish => {
      // console.log("adding a fish")
      // Copy the existing state
      const fishes = { ...this.state.fishes };
      // add new fish to the variable
      fishes[`fish${Date.now()}`] = fish;
      // Set the new fishes object to state
      this.setState({ fishes });
   };

   updateFish = (key, updatedFish) => {
      // Copy current state
      const fishes = { ...this.state.fishes };
      // Update state
      fishes[key] = updatedFish;
      // Set it to state.
      this.setState({ fishes });
   }

   deleteFish = key => {
      // copy state
      const fishes = { ...this.state.fishes };
      // Update state by removing the fish
      fishes[key] = null;
      // Set the updated fishes object to state
      this.setState({ fishes });
   }

   loadSampleFishes = () => {
      this.setState({ fishes : sampleFishes });
   };

   addToOrder = (key) => {
      // Copy the existing State
      const order = { ...this.state.order };
      // Either add to the order, or update the number in our order.
      order[key] = order[key] + 1 || 1;
      // Call setState to update our state object
      this.setState({ order });
   }

   removeFromOrder = key => {
      // Copy state
      const order = { ...this.state.order };
      // Remove the fish from the order
      delete order[key];  // Can use the delete keyword because this is not being mirrored to firebase.
      // Update state with the updated order
      this.setState({ order });
   }

   render() {

      return (
         <div className="catch-of-the-day">
            <div className="menu">
               <Header tagline="Fresh Seafood Market"/>
               <ul className="fishes">
                  {Object.keys(this.state.fishes).map(key => (
                     <Fish
                        key={key}
                        index={key}
                        details={this.state.fishes[key]}
                        addToOrder={this.addToOrder}
                     />
                  ))}
               </ul>
            </div>
            {/* <Order {...this.state} /> */}
            <Order
               fishes={this.state.fishes}
               order={this.state.order}
               removeFromOrder={this.removeFromOrder}
            />
            <Inventory
               addFish={this.addFish}
               loadSampleFishes={this.loadSampleFishes}
               fishes={this.state.fishes}
               updateFish={this.updateFish}
               deleteFish={this.deleteFish}
               storeId={this.props.match.params.storeId}
            />
         </div>
      );
   }
}

export default App;