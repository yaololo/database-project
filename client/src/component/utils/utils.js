export function addToCart (itemId, customerId, quantity){
  fetch('/api/update_cart', {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      itemId: itemId,
      customerId: customerId,
      quantity: quantity
    })
  }).then(response => {
    if (response.ok) {
      console.log('successfully add to cart');
    } else {
      console.log('something wrong during updating cart table');
    }
  });
}

export function getItemDetails(productList, token, cartSessionInfo){
  fetch('/api/my_cart_details', {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      token: token,
      productList: productList 
    })
  }).then(response => {
    if (response.ok) {
      response.json().then(json => {
        cartSessionInfo.updateCartProductInfoList(json.productInfoList)
      });
    } else {
      console.log('something wrong during getting product details');
    }
  });
}