export function priceUSD2KRW(price, priceKind) {
  let unit;

  if (price === '₩ 0') {
    return '-';
  }
  
  if (price[0] === '₩') {
    price = price.substring(2);
  }

  if (price.indexOf('B') !== -1) {
    unit = 1000000000; // 십억
  } else if(price.indexOf('M')  !== -1) {
    unit = 1000000; // 백만
  } else if(price.indexOf('K')  !== -1) {
    unit = 1000; // 천
  }
  
  if (price.indexOf(',') !== -1) {
    price = parseInt(price.replace(/,/g, '')); // 1,000,000 => 1000000
  } else {
    price = parseInt(price);
  }

  if (unit) {
    price = price * unit;
  }
  
  if (priceKind) { // marketCap의 경우만 인자 넘김
    if (price > 100000000) { // 1억보다 크면
      price = parseInt(price / 100000000).toString();
      if (price.length > 4) {
        price = price.slice(0, price.length - 4) + '조 ' + price.slice(price.length - 4) + '억';
      } else {
        price = price + '억';
      }
      return price;
    } else {
      price = price.toLocaleString(); // 1000000 => 1,000,000
      price = price + ' 원';
      return price;
    }
  } else {
    price = price.toLocaleString(); // 1000000 => 1,000,000
    price = price + ' 원';
    return price;
  }
} 