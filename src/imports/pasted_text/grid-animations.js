class Grid {
  constructor(el) {
    this.DOM = { el: el };
    this.DOM.items = Array.from(document.querySelectorAll('.grid__item'));
    this.DOM.backBtn = document.querySelector('.content__back');
    
    this.items = this.DOM.items.map(el => new Item(el));
    this.content = new Content(document.querySelector('.content'));
    
    this.state = {
      current: -1,
      background: null
    }
    
    this.onItemClick = this.onItemClick.bind(this);
    this.onBackClick = this.onBackClick.bind(this);
    
    this.bindEvents();
  }
  
  bindEvents() {
    this.DOM.items.forEach(el => el.addEventListener('click', this.onItemClick));
    this.DOM.backBtn.addEventListener('click', this.onBackClick);
  }
  
  onItemClick(e) {
    this.state.current = this.DOM.items.indexOf(e.currentTarget);
    this.state.background = this.items[this.state.current].getBackground();
    this.content.setBackground(this.state.background);
    
    const tl = new TimelineMax();
    tl.fromTo('.background', 0.75, 
      { y: '100%', ease: Power3.easeInOut }, 
      { y: '0%', ease: Power3.easeInOut });
    tl.to('.background', 0.5, { y: '-100%', ease: Power3.easeInOut });
    tl.to('.content', 0.75, { y: '-100%', ease: Power3.easeOut }, '-=0.25');
    
    this.items.forEach(el => el.handleClick());
  }
  
  onBackClick(e) {
    e.preventDefault();
    this.content.handleBackClick();
    this.items.forEach(el => el.handleBackClick());
  }
}

class Item {
  constructor(el) {
    this.DOM = { el: el };
    this.DOM.number = this.DOM.el.querySelector('.grid__number');
    this.DOM.title = this.DOM.el.querySelector('.grid__title');
    this.DOM.image = this.DOM.el.querySelector('.grid__image');
    
    this.state = {
      halfX: window.innerWidth / 2,
      halfY: window.innerHeight / 2,
      offsetX: this.DOM.el.offsetLeft,
      offsetY: this.DOM.el.offsetTop,
      elWidth: this.DOM.el.offsetWidth,
      elHeight: this.DOM.el.offsetHeight,
      mouseX: 0,
      mouseY: 0
    };
    
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleBackClick = this.handleBackClick.bind(this);
    this.getBackground = this.getBackground.bind(this);
  
    this.bindEvents();
  }
  
  bindEvents() {
    this.DOM.el.addEventListener('mousemove', this.onMouseMove);
    this.DOM.el.addEventListener('mouseleave', this.onMouseLeave);
  }
  
  onMouseMove(e) {
    this.state.mouseX = e.clientX - this.state.offsetX - (this.state.elWidth / 2);
    this.state.mouseY = e.clientY - this.state.offsetY - (this.state.elHeight / 2);
    
    TweenMax.to(this.DOM.title, 1, { 
      x: this.state.mouseX * 0.05,
      y: this.state.mouseY * 0.05,
    });
    TweenMax.to(this.DOM.number, 1.25, { 
      x: this.state.mouseX * 0.05,
      y: this.state.mouseY * -0.03,
    });
    TweenMax.to(this.DOM.image, 1, {
      x: this.state.mouseX * 0.03,
      y: this.state.mouseY * 0.03,
    });
  }
  
  onMouseLeave(e) {
    TweenMax.to(this.DOM.title, 1, { x: 0, y: 0 });
    TweenMax.to(this.DOM.number, 1, { x: 0, y: 0 });
    TweenMax.to(this.DOM.image, 1, { x: 0, y: 0 });
  }
  
  handleClick(e) {
    TweenMax.to(this.DOM.el, 0.75 + Math.random() * 0.25, { y: `${-window.innerHeight}px`, ease: Power3.easeIn });
  }
  
  handleBackClick() {
    TweenMax.to(this.DOM.el, 1 + Math.random() * 0.5, { y: `0px`, ease: Power3.easeInOut });
  }
  
  getBackground() {
    return this.DOM.image.style.backgroundImage;
  }
}

class Content {
  constructor(el) {
    this.DOM = { el: el };
    
    this.handleBackClick = this.handleBackClick.bind(this);
    this.setBackground = this.setBackground.bind(this);
  }
  
  handleBackClick() {
    TweenMax.to(this.DOM.el, 0.75, { y: `${window.innerHeight}px`, ease: Power3.easeInOut });
  }
  
  setBackground(url) {
    this.DOM.el.style.backgroundImage = `${url}`;
  }
}

new Grid(document.querySelector('.grid'));