import React from 'react'
import styled from 'styled-components';
import * as colors from '../colors';

export const StyledItem = styled.div`
    background: ${colors.primary};
    min-width: 100px;
    min-height: 100px;
    /* width: 100%; */
    border: 3px solid ${colors.secondary};
    color: white;
    font-size: 24px;
    display: flex;
    align-items: center;
`;

export const Item = ({children, className}) => {
    return <StyledItem className={className}>{children}</StyledItem>
}
