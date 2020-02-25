import React, {useState} from 'react';
import styled from 'styled-components';
import {Grid} from './components/Grid';
import {Item} from './components/Item';
import * as colors from './colors';

const Wrapper = styled.div`
  height: 100vh;
  padding: 50px;
  background: ${colors.backgroundSecondary};
    border: ${colors.background};
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  padding-top: 50px;
  max-width: 500px;
  margin: auto;
`;

const Button = styled.button`
  color: ${props => props.IE ? `${colors.secondary}` : `${colors.primary}`};
  border: ${props => props.IE ? `2px solid ${colors.secondary}` : `2px solid ${colors.primary}`};
  background: none;
  font-size: 18px;
  padding: 10px 20px;
  text-align: center;
  font-weight: bold;
  transition: ease 0.3s;
`;

const App = () => {

  const [columns, setColumns] = useState(false);
  const [IEColumns, setIEColumns] = useState(false);
  const [repeatColumns, setRepeatColumns] = useState(false);
  const [IERepeatColumns, setIERepeatColumns] = useState(false);
  const [gridGap, setGridGap] = useState(false);
  const [fakeGridGap, setFakeGridGap] = useState(false);

  const handleColumns = (e) => {
    setColumns(!columns);
  };

  const handleIEColumns = (e) => {
    setIEColumns(!IEColumns);
  };

  const handleRepeatColumns = (e) => {
    setRepeatColumns(!repeatColumns);
  };

  const handleIERepeatColumns = (e) => {
    setIERepeatColumns(!IERepeatColumns);
  };

  const handleGripGap = (e) => {
    setGridGap(!gridGap);
  }

  const handleFakeGripGap = (e) => {
    setFakeGridGap(!fakeGridGap);
  }

  return (
    <Wrapper>
      <Grid
        columns={columns}
        IEColumns={IEColumns}
        repeat={repeatColumns}
        IERepeat={IERepeatColumns}
        gridGap={gridGap}
        fakeGridGap={fakeGridGap}
      >
        <Item className="first">I am content</Item>
        <Item className="second"></Item>
        <Item className="third">I am some longer content that wants to take up more space</Item>
      </Grid>
      <ButtonWrapper>
        <Button onClick={handleColumns}>Columns {columns && '✓'}</Button>
        <Button IE onClick={handleIEColumns}>IE11 Columns {IEColumns && '✓'}</Button>
      </ButtonWrapper>
      <ButtonWrapper>
        <Button onClick={handleRepeatColumns}>Repeat Columns {repeatColumns && '✓'}</Button>
        <Button IE onClick={handleIERepeatColumns}>IE Repeat Columns {IERepeatColumns && '✓'}</Button>
      </ButtonWrapper>
      <ButtonWrapper>
        <Button onClick={handleGripGap}>Grid Gap {gridGap && '✓'}</Button>
        <Button IE onClick={handleFakeGripGap}>Fake Grid Gap {fakeGridGap && '✓'}</Button>
      </ButtonWrapper>
    </Wrapper>
  );
}

export default App;
