import React from 'react';

import Title from '../components/Title';
import SearchBar from '../components/SearchBar';
import Content from '../components/Content';

export default function MainView() {
  return (
    <div className='MainView container'>
      <SearchBar/>
      <Title/>
      <Content/>
    </div>
  );
}
