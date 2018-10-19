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
      cartInfoContext.noOfItems += Number(quantity);
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
        console.log(json.productInfoList)
        cartSessionInfo.updateCartProductInfoList(json.productInfoList)
      });
    } else {
      console.log('something wrong during getting product details');
    }
  });
}

export function bookMarkItem(itemId, sessionContext, messageContext){
  fetch('/api/book_mark_item', {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      productId: itemId,
      customerId: sessionContext.user.id,
      token: sessionContext.token
    })
  }).then(response => {
    if (response.ok) {
      response.json().then(json => {
        messageContext.setSuccessMessages(json.msg)
      })
    } else {
      console.log('something wrong during getting product details');
    }
  });
}

export function placeOrder(addressInfo, sessionContext, messageContext, productInfoList){
  let correctAddressInfo ={
    address: addressInfo.street,
    postcode: addressInfo.postcode,
    country: addressInfo.country,
  }

  fetch('/api/book_mark_item', {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      addressInfo: addressInfo,
      customerId: sessionContext.user.id,
      token: sessionContext.token,
      productInfoList: productInfoList
    })
  }).then(response => {
    if (response.ok) {
      response.json().then(json => {
        messageContext.setSuccessMessages(json.msg)
      })
    } else {
      console.log('something wrong during getting product details');
    }
  });
}

