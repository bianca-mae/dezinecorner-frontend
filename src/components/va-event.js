import { LitElement, html, render } from 'lit'
import {anchorRoute, gotoRoute} from './../Router'
import Auth from './../Auth'
import App from './../App'
import UserAPI from './../UserAPI'
import Toast from './../Toast'

customElements.define('va-event', class Event extends LitElement {
  constructor(){
    super()    
  }

  static get properties(){
    return {
      id: {
        type: String
      },
      eventName: {
        type: String
      },
      eventType: {
        type: String
      },
      price: {
        type: String
      },  
      host: {
        type: String
      },
      date: {
        type: String
      },
      location: {
        type: String
      },
      description: {
        type: String
      },
      image: {
        type: String
      },
      user: {
        type: Object
      }

    }
  }

  firstUpdated(){
    super.firstUpdated()
  }

  moreInfoHandler(){
    //alert("more info")
    // create sl-dialog
    const dialogEl = document.createElement('sl-dialog')
    // add className
    dialogEl.className = 'event-dialog'

    // sl-dialog content
    const dialogContent = html`
    <style>
        .wrap {
          display: flex;
          background: #AD9D43;
        }
        sl-dialog::part(panel){
          background: #AD9D43;
        }

        h1, p {
          color: #F5F5F5;
        }

        h1 {
          font-weight: normal;
        }

        p{
          font-family: "Instrument Sans", sans-serif;
        }

        .image {
            width: 40%;
        }
        .image img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
        .content {
            padding-left: 1em;
        }

        .price {
            font-size: 1em;
        }

        @media only screen and (max-width: 768px){
          .wrap{
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            text-align: center;
            height: 140vh;
            position: relative;
            top: -8em;
          }
          .image img{
            width: 35em;
            height: 45em;
            position: relative;
            left: -8.5em;
            align-items: center;
          }
          .content{
            position: relative;
            top: 15em;
          }
          .add-cart{
            position: relative;
            left: -47em;
            top: 3em;
          }
          sl-button.add-cart::part(base){
            font-size: 1.5em;
          }
        }


    </style>
    
     <div class="wrap">
        <div class="image">
            <img src="${App.apiBase}/images/${this.image}" alt="${this.eventName}"/>
        </div>
        <div class="content">
            <h1>${this.eventName}</h1>
            <p>${this.eventType}</p>
            <p class="price">$${this.price} per person</p>
            <p>Host - ${this.host}</p>
            <p>Date: ${this.date}</p>
            <p>Location: ${this.location}</p>
            <p class="description">Description <br> ${this.description}</p> 
            <br>
            <p> <i>See you there!<i> <p>

            <sl-button class="add-cart" @click=${this.addToCartHandler.bind(this)} pill >
              <sl-icon slot="prefix" name="cart3"></sl-icon>
              Add to Cart
            </sl-button>
        </div>
    </div>
    `
    render(dialogContent, dialogEl)

    // append to document.body
    document.body.append(dialogEl)

    // show sl-dialog
    dialogEl.show()

    // on hide delete dialogEl
    dialogEl.addEventListener('sl-after-hide', () => {
        dialogEl.remove()
    })
  }

  async addToCartHandler(){    
    try {
      await UserAPI.addEventCart(this.id)
      Toast.show('Event added to cart')
    }catch(err){
      Toast.show(err, 'error')
    }
  }
  
  render(){    
    return html`
    <style>

        .cart-btn {
            font-size: 1.5em;
        }

        sl-card::part(image){
          width: 28em;
          height: 40em;
        }

        h2, h3, p{
          font-family: "Instrument Sans", sans-serif;
          font-optical-sizing: auto;
          font-weight: normal;
          font-style: normal;
          font-variation-settings:
            "wdth" 100;
        }

        @media only screen and (max-width: 1366px) {
          sl-card::part(image){
            width: 26.5em;
            height: 35em;
            object-fit: cover;
          }
        }

        @media only screen and (max-width: 768px) {
          sl-card::part(image){
            width: 30em;
            height: auto;
            object-fit: cover;
          }

          sl-card::part(base){
            width: 30em;
            height: auto;
          }
        }

    </style>

    <sl-card class="event-cards">
          <img slot="image" src="${App.apiBase}/images/${this.image}"/>
        <h2>${this.eventName}</h2>
        <h3>$${this.price}</h3>
        <p>${this.date}</p>
        <sl-button @click=${this.moreInfoHandler.bind(this)}>More Info</sl-button>
        <sl-icon-button class="cart-btn" name="cart3" label="Add to Cart" @click=${this.addToCartHandler.bind(this)}></sl-icon-button>
    </sl-card>

    `
  }
  
})