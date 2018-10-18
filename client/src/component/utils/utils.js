export function addToCart (itemId, sessionContext, quantity, messageContext, cartInfoContext){
  fetch('/api/add_to_cart', {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      productId: itemId,
      customerId: sessionContext.user.id,
      quantity: quantity,
      token: sessionContext.token
    })
  }).then(response => {
    if (response.ok) {
      cartInfoContext.noOfItems += quantity;
      cartInfoContext.updateNoOfItemInCart(cartInfoContext.noOfItems);
      response.json().then(json => {
        messageContext.setSuccessMessages(json.msg)
      })
    } else {
      response.json().then(json => {
        messageContext.setErrorMessages(json.msg)
      })
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