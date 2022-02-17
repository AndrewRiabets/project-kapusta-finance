import AuthPageTitle from "../../components/AuthPageTitle";
import AuthForm from "../../components/AuthForm";
import Container from "../../components/Container/ContainerAuth";
import {  slideInRight} from "react-animations";
import styled, { keyframes } from 'styled-components';

import style from "./AuthPage.module.css";

const AuthPage = () => {
  const SlideInRight = styled.div`animation: 2s ${keyframes`${slideInRight}`} `;
  return (
    <>
      <Container>
        <div className={style.authContainer}>
          <AuthPageTitle />
        
          <SlideInRight>
            <AuthForm />
</SlideInRight>
            
    
          
        </div>
      </Container>
    </>
  );
};

export default AuthPage;