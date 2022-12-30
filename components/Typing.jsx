import React from 'react'; // Import the desired words
import Typed from 'typed.js';

const words = ['DIGITAL', 'TRAVAIL INDÉ', 'NATURE'];

class Typing extends React.Component {
  componentDidMount() {
    const options = {
      strings: words,
      typeSpeed: 50,
      backSpeed: 50,
      loop: true,
      cursorChar: '|',
    };
    // this.el refers to the <span> in the render() method
    this.typed = new Typed(this.el, options);
  }
  componentWillUnmount() {
    // Please don't forget to cleanup animation layer
    this.typed.destroy();
  }

  render() {
    return (
      <span
        style={{ whiteSpace: 'pre' }}
        ref={(el) => {
          this.el = el;
        }}
      />
    );
  }
}
export default Typing;
