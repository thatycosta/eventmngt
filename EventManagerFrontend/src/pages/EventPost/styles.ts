import styled from 'styled-components';

export const Container = styled.div`
@media(max-width: 800px) {
  flex-direction: column;
  position: relative;
}`;

export const Header = styled.header`
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
    color: #4f784e;
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
 
`;

export const ShareDiv = styled.div`
background: #cc99ff;
  width: 24em;
  border-radius: 0.6em;
  margin: 1em;
  overflow: hidden;
  cursor: pointer;
  box-shadow: 0 13px 27px -5px hsla(240, 30.1%, 28%, 0.25), 0 8px 16px -8px hsla(0, 0%, 0%, 0.3), 0 -6px 16px -6px hsla(0, 0%, 0%, 0.03);
  transition: all ease 200ms;
` 



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
    margin-left: -1200px;
    margin-top: 500px;
  }

  div {
    
    > div{

      >h3{
        margin-bottom: 1px;
        margin-left: -300px;
        margin-top: -150px;
        display: flex;
      }
      
      p{
        margin-top: 10px;
        margin-left: -12px;
        display: flex;
        color: #000000;
        display: flex;
    }
    
    -moz-box-shadow: 1px 0px 4px #000000, -1px -1px 4px #000000;
    -webkit-box-shadow: 1px 0px 4px #000000, -1px -1px 4px #000000;
   
    box-shadow: 1px 0px 4px #000000, -1px -1px 4px #000000;

    width: 1500px;
    height: 850px;
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
    
    float: center;
    margin-right: 10px;
    margin-left: -100px;
    margin-bottom: 20px;
    display: flex;
    
  
    img {
      box-shadow: 1px px 4px #000000, -1px -1px 4px #000000;
      box-shadow: 1px 4px 4px #000000, -1px -1px 4px #000000;
      max-width:450px;
    max-height:500px;
    width: auto;
    height: auto;
     margin-left: -800px;
     display: flex;
    
     
    }  

    }
  }
`;


