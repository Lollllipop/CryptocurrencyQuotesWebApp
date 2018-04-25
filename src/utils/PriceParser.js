export function priceParser(price){
  let unit;

  if(price === '₩ 0'){
    return '-';
  }
  
  if(price[0] === '₩'){
    price = price.substring(1);
  }

  if(price.indexOf('B') !== -1){
    unit = 1000000000; // 십억
  }else if(price.indexOf('M')  !== -1){
    unit = 1000000; // 백만
  }
  
  if(price.indexOf('.') !== -1){
    price = price.substring(0,price.indexOf('.'));
  }

  price = parseInt(price.replace(/,/g, '')); // 1,000,000 => 1000000

  if(unit){
    price = price*unit;
  }

  price = price.toLocaleString(); // 1000000 => 1,000,000

  price = price + ' 원';

  return price;
} 