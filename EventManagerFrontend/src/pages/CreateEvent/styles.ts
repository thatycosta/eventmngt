import styled from 'styled-components';

export const Container = styled.div``;

export const Header = styled.header`
@media(max-width: 800px) {
  flex-direction: column;
  position: relative;
}
  padding: 32px 0;
  background: #ffffff;
`;

export const HeaderContent = styled.div`
  max-width: 1120px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  > img {
    height: 130px;
  }
  button {
    margin-left: auto;
    background: transparent;
    border: 0;
    color:#4f784e;
    svg {
      color: #4f784e;
      width: 20px;
      height: 20px;
    }
  }

  > a {
    color: #4f784e;
    display: block;
    margint-top: 24px;
    margin-left: 150px;
    text-decoration: none;
    transition: color 0.2s;

    display: flex;
    align-items: center;
 
    svg {
        margin-right: 16px;
    }
`;

export const Profile = styled.div`
  display: flex;
  align-items: center;
  margin-left: 80px;
  img {
    width: 56px;
    height: 56px;
    border-radius: 50%;
  }
  div {
    display: flex;
    flex-direction: column;
    margin-left: 16px;
    line-height: 24px;
    span {
      color: #000000;
    }
    strong {
      color: #4f784e;
    }
  }
`;

export const Content  = styled.main`
  max-width: 1120px;
  margin: auto;
  
  h1 {
    font-size: 36px;
    margin-bottom: 20px;
    display: block;
    margin-right: auto;
    margin-top: 40px;
    color: #000000;
  }

`;  

export const Event = styled.div`
margin-top: 44px;
  > strong {
    color: #000000;
    font-size: 20px;
    font-weight: 400;
  }

  h2 {
    font-size: 20px;
    display: flex;
  }

  p{
      margin-top: 10px;
      display: flex;
      color: #000000;
  }

  h2{
    color: #000000;
    margin-left: 380px; //change this after
    margin-right: auto;
  }

  h3{
    color: #000000;
  }

  div {
    background: #ffffff;
    display: center;
    align-items: center;
    padding: 16px 24px;
    border-radius: 10px;
    margin-top: 24px;
    position: relative;
  
    img {
      width: 400px;
      height: 480px;
      border-radius: 0%;
      background: #ff9000;
      display: block;
      margin-left: auto;
      margin-right: auto;
      margin-bottom: 50px;
    }  
    }
  }
`;