import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
    height: 100vh;

    display: flex;
    align-items: stretch;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  place-content: center;
  width: 100%;
  max-width: 700px;
  img {width:290px;}
  form {
    margin: 10px 0;
    width: 340px;
    text-align: center;


    h1 {
      margin-bottom: 24px;
      color: #000000;
    }
    
      a {
          color: #f4ede8;
          display: block;
          margint-top: 24px;
          text-decoration: none;
          transition: color 0.2s;
       
        &:hover {
            background: ${shade(0.2, '#f4ede8')};
        }
      }
}

> a {
          color: #4297A0;
          display: block;
          margin-top: 24px;
          text-decoration: none;
          transition: color 0.2s;

          display: flex;
          align-items: center;
       
          svg {
              margin-right: 16px;
          }

          &:hover {
            color: ${shade(0.2, '#253824')};
        }
}
`;

export const Background = styled.div`
    flex: 1;
    background-color: #F4EAE6;
    
    background-size: cover;
`;
