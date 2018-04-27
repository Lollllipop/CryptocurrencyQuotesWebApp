export function priceUSD2Number(price, selectedListHead) {
  let unit;

  if (selectedListHead === 'CHANGEPCT24HOUR') {
    return parseFloat(price);
  } else {
    if (price === '₩ 0') {
      return -1;
    }

    if (price[0] === '₩') {
      price = price.substring(2);
    }

    if (price.indexOf('B') !== -1) {
      unit = 1000000000; // 십억
      price = price.substring(0, price.indexOf('B') - 1);
    } else if(price.indexOf('M')  !== -1) {
      unit = 1000000; // 백만
      price = price.substring(0, price.indexOf('M') - 1);
    } else if(price.indexOf('K')  !== -1) {
      unit = 1000; // 천
      price = price.substring(0, price.indexOf('K') - 1);
    }

    if (price.indexOf(',') !== -1) {
      price = parseInt(price.replace(/,/g, '')); // 1,000,000 => 1000000
    } else {
      price = parseInt(price);
    }

    if (unit) {
      price = price * unit;
    }

    return price;
  }    
}

