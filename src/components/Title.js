import React from 'react';
// import io from 'socket.io-client';

export default function Title() {
  // const socket = io('wss://streamer.cryptocompare.com');
  // const socket2 = io('wss://streamer.cryptocompare.com');
  // const socket3 = io('wss://streamer.cryptocompare.com');
  /**
   * 2 : current
   * Poloniex : Exchange Name
   * BTC : Coin Name
   * USD : 코인을 어떤 화폐가치로 나타낼 것인지 (USD:달러)
   * 
   * Current나 CurrentAgg 둘 중 하나를 사용하거나 둘 다 사용하거나 해야할 듯
   * CurrentAgg가 더 업데이트가 잘되긴 함
   * 그리고 첫번째 response에서는 가장 최신께 일단 response되고 그 후에는 업데이트시 response됨
   * 즉, 페이지 로딩시에도 그냥 socket을 통해 받아온 데이터를 사용하면 될듯
   * 
   * ['5~CCCAGG~BTC~KRW'] 
   * 이 타입을 사용해야 할 듯 한국으로 change하기 위해선
   */
  // socket.emit('SubAdd', { subs: ['5~CCCAGG~BTC~KRW'] } );
  // socket.on('m', function (message) { // event는 m으로 약속되어 있는듯
  //   console.log(message);
  // });
  // socket2.emit('SubAdd', { subs: ['5~CCCAGG~BTC~USD'] } );
  // socket2.on('m', function (message) { // event는 m으로 약속되어 있는듯
  //   console.log(message);
  // });
  return (
    <div className="Title">
      <div className='col'> <h1>코인 리스트</h1> </div>
    </div>
  );
}