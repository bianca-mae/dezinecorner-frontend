import { LitElement, html, css } from 'lit'
import {anchorRoute, gotoRoute} from './../Router'
import Auth from './../Auth'
import App from './../App'

customElements.define('va-app-header', class AppHeader extends LitElement {
  constructor(){
    super()    
  }

  static get properties(){
    return {
      title: {
        type: String
      },
      user: {
        type: Object
      }
    }
  }

  firstUpdated(){
    super.firstUpdated()
    this.navActiveLinks()    
  }

  navActiveLinks(){ 
    const currentPath = window.location.pathname
    const navLinks = document.querySelectorAll('.app-top-nav a, .app-side-menu-items a')
    navLinks.forEach(navLink => {
      if(navLink.href.slice(-1) == '#') return
      if(navLink.pathname === currentPath){   
        navLink.classList.add('active')
      }
    })
  }

  hamburgerClick(){  
    const appMenu = document.querySelector('.app-side-menu')
    appMenu.show()
  }
  
  menuClick(e){
    e.preventDefault()
    const pathname = e.target.closest('a').pathname
    const appSideMenu = document.querySelector('.app-side-menu')
    // hide appMenu
    appSideMenu.hide()
    appSideMenu.addEventListener('sl-after-hide', () => {
      // goto route after menu is hidden
      gotoRoute(pathname)
    })
  }

  createRenderRoot(){
    return this
  }

  render(){    
    return html`
    <style>      
      * {
        box-sizing: border-box;
      }
      .app-header {
        /* background: var(--brand-color); */
        border-bottom: 2px solid #AD9D43;
        position: fixed;
        top: 0;
        right: 0;
        left: 0;
        height: var(--app-header-height);
        color: #fff;
        display: flex;
        z-index: 9;
        background-color: #fff
        /* padding-bottom: 4.5em; */
        /* box-shadow: 4px 0px 10px rgba(0,0,0,0.2); */
        /* align-items: center; */
      }
      
      .app-header-main {
        flex-grow: 1;
        display: flex;
        align-items: center;
      }

      .app-header-main::slotted(h1){
        color: #fff;
        padding: 1em;
      }

      .app-logo a {
        color: #fff;
        text-decoration: none;
        font-weight: bold;
        font-size: 1.2em;
        padding: .6em;
        display: inline-block;
      }

      .app-logo img {
        width: 90px;
      }
      
      /* .hamburger-btn, .app-header-main, .app-side-menu{
        display: none;
      }*/ 
      .hamburger-btn{
        position: relative;
        left: 1em;
        top: 0.3em;
      }
      
      .hamburger-btn::part(base) {
        color: #AD9D43;
        font-size: 1.2em;
      }

      .app-top-nav {
        display: flex;
        height: 100%;
        align-items: center;
        padding-top: 4em;
        padding-bottom: 4.5em;
        position: relative;
        top: -7.5em;
        right: 1em;
        display:block;
      }

      .app-top-nav a {
        display: inline-block;
        padding: 1.5em;
        text-decoration: none;
        color: #000;
        position: relative;
        top: -2.5em;
      }

      .app-top-nav a:hover {
        color: #AD9D43;
      }

      .app-top-nav img{
        width: 6em;
        margin-bottom: 1em;
        position: relative;
        top: 3.2em;
        left: -50em;
        cursor: pointer;
      }
      
      /* .home-logo {
        width: 6em;
        margin-bottom: 1em;
        position: relative;
        top: -2.5em;
        left: -45em;
        cursor: pointer;
      }*/ 
      
      .app-side-menu-items a {
        display: block;
        position: relative;
        top: 3em;
        padding: 1em;
        text-decoration: none;
        font-size: 1.3em;
        color: #333;
      }

      .app-side-menu-logo {
        width: 120px;
        margin-bottom: 1em;
        position: absolute;
        top: 2em;
        left: 1.5em;
        cursor: pointer;
      }

      .page-title {
        color: var(--app-header-txt-color);
        margin-right: 0.5em;
        margin-bottom: 0em;
        font-size: var(--app-header-title-font-size);
      }

      /* active nav links */
      .app-top-nav a.active,
      .app-side-menu-items a.active {
        font-weight: bold;
      }

      /* RESPONSIVE - MOBILE ------------------- */
      /* @media all and (max-width: 768px){       
        
        .app-top-nav {
          display: none;
        }
      } */ 
      @media only screen and (min-width: 768px){
        /* .hamburger-btn, .app-header-main, .app-side-menu{
          display: none;
        }*/
        /* .app-top-nav{
          display:none;
        }*/
      }


    </style>

    <header class="app-header">
      <sl-icon-button class="hamburger-btn" name="list" @click="${this.hamburgerClick}" style="font-size: 1.5em;"></sl-icon-button>       
      
      <div class="app-header-main">
        ${this.title ? html`
          <!-- <h1 class="page-title">${this.title}</h1> -->
        `:``}
        <slot></slot>
      </div>
      

      <nav class="app-top-nav">
        <div>
          <img class="home-logo" src="/images/logo.svg" @click="${() => gotoRoute('/')}">
        </div>
        <a href="/" @click="${anchorRoute}">Home</a>
        ${this.user.accessLevel == 2 ? html `
          <a href="/newEvent" @click="${anchorRoute}">Create Event</a>
        ` : ''}  
        <a href="/events" @click="${anchorRoute}">Events</a>
        <a href="/cart" @click="${anchorRoute}">Cart</a>
        <a href="/contact" @click="${anchorRoute}">Contact</a>
    
        <sl-dropdown>
          <a slot="trigger" href="#" @click="${(e) => e.preventDefault()}">
            <sl-avatar style="--size: 24px;" image=${(this.user && this.user.avatar) ? `${App.apiBase}/images/${this.user.avatar}` : ''}></sl-avatar> ${this.user && this.user.firstName}
          </a>
          <sl-menu>            
            <sl-menu-item @click="${() => gotoRoute('/profile')}">Profile</sl-menu-item>
            <sl-menu-item @click="${() => gotoRoute('/editProfile')}">Edit Profile</sl-menu-item>
            <sl-menu-item @click="${() => Auth.signOut()}">Sign Out</sl-menu-item>
          </sl-menu>
        </sl-dropdown>
      </nav>
    </header>

    <sl-drawer class="app-side-menu" placement="start" class="drawer">
      <img class="app-side-menu-logo" src="/images/logo.svg" @click="${() => gotoRoute('/')}">
      <nav class="app-side-menu-items">
        <a href="/" @click="${this.menuClick}">Home</a>
        ${this.user.accessLevel == 2 ? html `
          <a href="/newEvent" @click="${this.menuClick}">Create Event</a>
        ` : ''}
        <a href="/events" @click="${this.menuClick}">Events</a>
        <a href="/cart" @click="${this.menuClick}">Cart</a>
        <a href="/contact" @click="${this.menuClick}">Contact</a>
        <a href="/profile" @click="${this.menuClick}">Profile</a>
        <a href="#" @click="${() => Auth.signOut()}">Sign Out</a>
      </nav>  
    </sl-drawer>
    `
  }
  
})

