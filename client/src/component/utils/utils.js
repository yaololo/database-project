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

export function getItemDetails(itemId, cartItems){
  fetch('/api/getItemDetails', {
    method: 'get',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      itemId: itemId 
    })
  }).then(response => {
    if (response.ok) {
      response.json().then(json => {
        cartItems.push(json.itemDetails)
      });
    } else {
      console.log('something wrong during getting product details');
    }
  });
}