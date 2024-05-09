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

  const handleScroll = () => {
    const { scrollHeight, scrollTop, clientHeight } = containerRef.current;
    if (scrollTop + clientHeight >= scrollHeight - 100) {
      // 末尾に近づいたら、同じコンテンツをリストに追加
      setContentList(prev => [...prev, children]);
    }
  };

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
