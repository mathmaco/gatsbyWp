// Import necessary hooks and styled-components
import React from 'react';
import styled from 'styled-components';

const Container = styled.section`
  min-height: 100vh;
  height: 100vh;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
`;

const Loop = ({ children }) => {
  const handleScroll = (e) => {
    const { scrollHeight, scrollTop, clientHeight } = e.target;
    const isAtBottom = scrollHeight - scrollTop === clientHeight;
    if (isAtBottom) {
      if (scrollHeight <= clientHeight) {
        // For less content, you might want to disable scroll reset or handle differently
        e.target.scrollTop = 1; // Small adjustment to prevent stuck at the bottom
      } else {
        e.target.scrollTop = 0; // Reset scroll to top
      }
    }
  }

  return <Container onScroll={handleScroll}>{children}</Container>;
};

export default Loop;
