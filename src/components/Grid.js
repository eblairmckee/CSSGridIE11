import styled from 'styled-components';

export const Grid = styled.div`
    display: grid;
    justify-content: center;
    align-items: center;
    ${({columns}) =>
        columns &&
        `
            grid-template-columns: auto 1fr 300px;
        `
    };
    ${({IEColumns}) =>
        IEColumns &&
        `
            display: -ms-grid;
           -ms-grid-columns: auto 1fr 300px;
           .first {
               -ms-grid-column: 1;
           }
           .second {
                -ms-grid-column: 2;
           }
           .third {
                -ms-grid-column: 3;
           }
        `
    };
    ${({repeat}) =>
        repeat &&
        `
            grid-template-columns: repeat(3, 100px 200px);
        `
    };
    ${({IERepeat}) =>
        IERepeat &&
        `
            display: -ms-grid;
            -ms-grid-columns: (100px 200px)[3];
        `
    };
    ${({gridGap}) =>
        gridGap &&
        `
            display: grid;
            grid-gap: 20px;
        `
    };
    ${({fakeGridGap}) =>
        fakeGridGap &&
        `
            display: -ms-grid;
            -ms-grid-columns: auto 20px 1fr 20px 300px;
        `
    };
`;
