import React from "react";
import PropTypes from "prop-types";
import { formatPrice } from "../helpers";
import { TransitionGroup, CSSTransition } from "react-transition-group";

class Order extends React.Component {
   static propTypes = {
      fishes: PropTypes.object,
      order: PropTypes.object,
      removeFromOrder: PropTypes.func
   }
   // Render out each type of fish in the order.
   renderOrder = (key) => {
      const fish = this.props.fishes[key];
      const count = this.props.order[key];
      // Check for fish and the status of available.
      const isAvailable = fish && fish.status === 'available';
      const transitionOptions = {
         classNames: "order",
         key: key,
         timeout: { enter: 500, exit: 500 }
      }
      // this is to keep the page looking nice until a fish is added, or a previous order is loaded.
      if(!fish) return null;

      // Check to see if the fish is available.
      if (!isAvailable) {
         return (
            <CSSTransition {...transitionOptions} >
               <li key={key}>
                  Sorry {fish ? fish.name : 'fish'} is no longer available.
               </li>
            </CSSTransition>
         )
      }
      return (
         <CSSTransition {...transitionOptions} >
            <li key={key}>
               <span>
                  <TransitionGroup component="span" className="count">
                     <CSSTransition
                        classNames="count"
                        key={count}
                        timeout={{ enter: 500, exit: 500 }}
                     >
                        <span>{ count }</span>
                     </CSSTransition>
                  </TransitionGroup>
                  lbs { fish.name }
                  {formatPrice(count * fish.price)}
               </span>
               <button onClick={() => {this.props.removeFromOrder(key)}} >
                  &times;
               </button>
            </li>
         </CSSTransition>
      )
   }

   // render out the total cost of the order
   render() {
      const orderIds = Object.keys(this.props.order);
      const total = orderIds.reduce((prevTotal, key) => {
         const fish = this.props.fishes[key];
         const count = this.props.order[key];
         const isAvailable = fish && fish.status === 'available';
         if (isAvailable) {
            return prevTotal + (count * fish.price);
         }
         return prevTotal;

      }, 0);

      return (
         <div className="order-wrap">
            <h2>Order 🐠</h2>
            <TransitionGroup component="ul" className="order">
               {orderIds.map(this.renderOrder)}
            </TransitionGroup>
            <div className="total">
               Total:
               <strong>{formatPrice(total)}</strong>
            </div>
         </div>
      )
   }
}

export default Order;