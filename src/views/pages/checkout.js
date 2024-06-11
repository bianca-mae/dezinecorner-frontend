import App from '../../App'
import {html, render } from 'lit'
import {gotoRoute, anchorRoute} from '../../Router'
import Auth from '../../Auth'
import Utils from '../../Utils'

class CheckoutView {
  init(){
    document.title = 'Checkout'    
    this.render()    
    Utils.pageIntroAnim()
  }

  render(){
    const template = html`
      <style>

      </style>

      <va-app-header title="Checkout" user="${JSON.stringify(Auth.currentUser)}"></va-app-header>
      <div class="checkout-content"> 
        <div class="heading">
          <sl-icon class="back-arrow" name="arrow-left" @click=${() => gotoRoute('/cart')}></sl-icon> 
          <h1>Checkout</h1>
        </div>

        <div class="checkout-steps">
            <p class="current-step">1. Details</p>
            <p>2. Payment</p>
            <p>3. Finalise</p>
        </div>

        <div class="personal-details">
        <p>1. Personal Details</p>
        <form>
            <div class="input-group">
              <sl-input class="input-form" label="Name" type="text" name="name" placeholder="Name"></sl-input>
            </div>
            <br>
             <div class="input-group">
                <sl-input class="input-form" label="Email" type="text" name="email" placeholder="Email"></sl-input>
              </div>
            <br>
            <div class="input-group">
                <sl-input class="input-form" label="Phone" type="text" name="phone number" placeholder="Phone Number"></sl-input>
              </div>
            <br>
            <div class="input-group">
                <sl-input class="input-form" label="Address" type="text" name="address" placeholder="Address"></sl-input>
              </div>
            <br>
          </form>
          <div>
            <sl-button class="next-paybtn" pill >Next</sl-button>
          </div>

        </div>


        
      </div>      
    `
    render(template, App.rootEl)
  }
}


export default new CheckoutView()