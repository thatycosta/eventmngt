import styled from 'styled-components';

export const Container = styled.div`
@media(max-width: 800px) {
  flex-direction: column;
  position: relative;
}`;

export const Header = styled.header`
  padding: 32px 0;
  background: #ffffff;

  @media(max-width: 800px) {
    flex-direction: column;
    position: relative;
  }
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
    color: #4297A0;
    svg {
      color: #4297A0;
      width: 20px;
      height: 20px;
    }
  }

  > a {
    color: #4297A0;
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
    margin-left: 44px;
    line-height: 24px;
    span {
      color: #000000;
    }
    strong {
      color: #4f784e;
    }
  }
`;

export const Content = styled.main`
  max-width: 1120px;
  margin: auto;
  
  h1 {
    font-size: 36px;
    display: block;
    margin-right: auto;
    margin-top: 40px;
    color: #000000;
  }

`;

export const Pagination = styled.div`
margin-top: 1430px;
    bottom: 0;
    width: 100%;
margin-left: 700px;
  display: block;
  min-width: 500px;
  max-width: 900px;
  justify-content: space-between;
  
`;

export const PaginationButton = styled.div`
  display: flex;
`;

export const PaginationItem = styled.div`
  margin: 0 10px;
  cursor: pointer;
  color:	#000000; 
 
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
    margin-left: 30px; //change this after
    margin-right: auto;
    margin-bottom: 10px;
  }

  h3{
    color: #000000;
  }

  button{
    margin-left: -350px;
    margin-top: 10px;
  }

  div {
    
    > div{

      >h3{
        margin-bottom: 1px;
        margin-left: -300px;
        margin-top: 5px;
      }
      
      p{
        margin-top: 10px;
        margin-left: -12px;
        display: flex;
        color: #000000;
    }
    
    -moz-box-shadow: 1px 0px 4px #000000, -1px -1px 4px #000000;
    -webkit-box-shadow: 1px 0px 4px #000000, -1px -1px 4px #000000;
   
    box-shadow: 1px 0px 4px #000000, -1px -1px 4px #000000;

    width: 450px;
    height: 650px;
    display: flex;
    flex-direction: column;
    background: #ffffff;
    display: center;
    align-items: center;
    padding: 16px 24px;
    border-radius: 10px;
    //margin-top: 24px;
    position: relative;
    }
    
    float: left;
    margin-right: 20px;
    margin-bottom: 20px;
    
  
    img {
      box-shadow: 1px px 4px #000000, -1px -1px 4px #000000;
      box-shadow: 1px 4px 4px #000000, -1px -1px 4px #000000;
      max-width:450px;
    max-height:400px;
    width: auto;
    height: auto;
    }  
    }
  }
`;