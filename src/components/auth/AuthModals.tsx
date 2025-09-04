import React, { useState } from 'react';
import LoginModal from './LoginModal';
import SignupModal from './SignupModal';

interface AuthModalsProps {
  children: (openLogin: () => void, openSignup: () => void) => React.ReactNode;
}

const AuthModals: React.FC<AuthModalsProps> = ({ children }) => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);

  const openLogin = () => {
    setIsLoginOpen(true);
    setIsSignupOpen(false);
  };

  const openSignup = () => {
    setIsSignupOpen(true);
    setIsLoginOpen(false);
  };

  const closeAll = () => {
    setIsLoginOpen(false);
    setIsSignupOpen(false);
  };

  return (
    <>
      {children(openLogin, openSignup)}
      
      <LoginModal
        isOpen={isLoginOpen}
        onClose={closeAll}
        onSwitchToSignup={openSignup}
      />
      
      <SignupModal
        isOpen={isSignupOpen}
        onClose={closeAll}
        onSwitchToLogin={openLogin}
      />
    </>
  );
};

export default AuthModals;