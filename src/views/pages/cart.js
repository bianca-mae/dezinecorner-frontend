import App from '../../App'
import {html, render } from 'lit'
import {gotoRoute, anchorRoute} from '../../Router'
import Auth from '../../Auth'
import Utils from '../../Utils'
import Toast from './../../Toast'
import UserAPI from './../../UserAPI'

class CartView {
  init(){
    document.title = 'Cart'
    this.cartEvent = null  
    this.render()    
    Utils.pageIntroAnim()
    this.getEventCart()
  }

  async getEventCart(){
    try {
      const currentUser = await UserAPI.getUser(Auth.currentUser._id)
      this.cartEvent = currentUser.eventCart
      console.log(this.cartEvent)
      this.render()
    }catch(err){
      Toast.show(err, 'error')
    }
  }

  render(){
    const template = html`
      <va-app-header title="Cart" user="${JSON.stringify(Auth.currentUser)}"></va-app-header>
      <div class="page-content cart">        
        <h1> <i>Your Cart <i> </h1>

        <div class="next-btnc">
            <sl-button class="next-btn" size="medium" pill @click=${() => gotoRoute('/checkout')}>Checkout</sl-button>
        </div>

        <div class="events-grid">
          ${this.cartEvent == null ? html`
            <sl-spinner></sl-spinner>
          ` : html`
            ${this.cartEvent.map(event => html`
              <va-event class="event-card"
                id="${event._id}"
                eventName="${event.eventName}"
                eventType="${event.eventType}"
                price="${event.price}"
                host="${event.host}"
                date="${event.date}"
                location="${event.location}"
                description="${event.description}"
                image="${event.image}"
                user="${JSON.stringify(event.user)}"
              >        
              </va-event>

            `)}
          `}

        </div>
        
      </div>      
    `
    render(template, App.rootEl)
  }
}


export default new CartView()