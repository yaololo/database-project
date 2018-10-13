export function mapArrayToObject(itemsId){
  let mappedObject = {};
  let value = 0
  // let arrayOfObject = [];

  itemsId.forEach(element => {
    if (mappedObject[element] === undefined) {
      mappedObject[element]= 1
    } else {
      mappedObject[element]++;
    }
  });

  console.log(mappedObject)
  // for (let key in mappedObject) {
  //   arrayOfObject.push(mappedObject[key]);
  // }

  // return mappedObject;
}