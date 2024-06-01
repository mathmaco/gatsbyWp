import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';

const Container = styled.section`
  min-height: 100vh;
  height: 100vh;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
`;

const Loop = ({ children }) => {
  const containerRef = useRef(null);
  const [contentList, setContentList] = useState([children]);

  //const handleScroll = () => {
  //  const { scrollHeight, scrollTop, clientHeight } = containerRef.current;
  //  if (scrollTop + clientHeight >= scrollHeight - 100) {
  //    // 末尾に近づいたら、同じコンテンツをリストに追加
  //    setContentList(prev => [...prev, children]);
  //  }
  //};

  const MAX_ELEMENTS = 10;

  const handleScroll = () => {
    const { scrollHeight, scrollTop, clientHeight } = containerRef.current;
    if (scrollTop + clientHeight >= scrollHeight - 100) {
      setContentList(prev => {
        const newList = [...prev, children];
        if (newList.length > MAX_ELEMENTS) {
          newList.shift(); // 最初の要素を削除
        }
        return newList;
      });
    }
  };

  //const handleScroll = () => {
  //  const { scrollHeight, scrollTop, clientHeight } = containerRef.current;
  //  if (scrollTop + clientHeight >= scrollHeight - 100) {
  //    // 末尾に近づいたら、最初の要素を削除し、新しい要素を末尾に追加
  //    setContentList(prev => {
  //      const newList = [...prev.slice(1), children];
  //      return newList;
  //    });
  //  }
  //};

  useEffect(() => {
    const container = containerRef.current;
    container.addEventListener('scroll', handleScroll);
    return () => {
      container.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Container ref={containerRef}>
      {contentList.map((item, index) => (
        <div key={index}>{item}</div>
      ))}
    </Container>
  );
};

export default Loop;
