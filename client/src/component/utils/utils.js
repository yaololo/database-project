export function updateCart (itemId, customerId, quantity){
  fetch('/api/updateCart', {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      itemId: itemId,
      customerId: customerId,
      quantity: quantity
    })
  }).then(response => {
    if (response.ok) {
      response.json().then(json => {
        this.setState({
          data: json.data
        });
      });
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