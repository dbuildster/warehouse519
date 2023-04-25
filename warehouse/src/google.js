import React from 'react';

import { GoogleLogin } from '@react-oauth/google';

const Google = ({ onSignIn, setIsSignedIn }) => {
    const handleSuccess = (credentialResponse) => {
      console.log(credentialResponse);
      setIsSignedIn(true);
      onSignIn(true);
    };
  
    const handleError = () => {
      console.log('Login Failed');
      setIsSignedIn(false);
      onSignIn(false);
    };
  
    return (
      <GoogleLogin
        clientId="your-client-id"
        onSuccess={handleSuccess}
        onFailure={handleError}
      />
    );
  };

export default Google;