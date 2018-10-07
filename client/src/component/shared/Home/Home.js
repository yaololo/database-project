import React, { Component } from 'react';
import LayoutTemplate from '../../LayoutTemplate/LayoutTemplate';

class Home extends Component {
  constructor(props) {
    super();
    this.state = {
      data: props.data,
      isGoodResponse: props.data
    };
  }
  render() {
    return (
      <div>
        <LayoutTemplate data={this.props.data} />
      </div>
    );

    // if (this.props.data !== undefined && this.props.data[0].length > 0) {
    //   return (
    //     <div className="product-list">
    //       {this.props.data[0].map((element, i) => {
    //         return (
    //           <div key={i} className="content">
    //             <div className="picture">
    //               <img src={element.image.split(',')[0]} alt="" />
    //             </div>
    //             <div className="short-description">
    //               {`$${element.shortDescription}`}
    //             </div>
    //             <div className="price">{element.price}</div>
    //             <div className="purchase-button">
    //               <button className="order-button" type="button">
    //                 Add to cart
    //               </button>
    //             </div>
    //           </div>
    //         );
    //       })}
    //     </div>
    //   );
    // } else {
    //   return (
    //     <div>
    //       {/* <ReactLoading
    //         type={'spin'}
    //         color={'#ffffff'}
    //         height={'5%'}
    //         width={'5%'}
    //       /> */}
    //     </div>
    //   );
    // }
  }
}

export default Home;