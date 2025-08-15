import React, { useState, useEffect, useCallback } from 'react';
import type { UserProfile } from './types';
import LoginScreen from './components/LoginScreen';
import ProfileScreen from './components/ProfileScreen';

// In a real application, this would be stored in an environment variable
// and not hardcoded.
// IMPORTANT: Replace this with your own Google Cloud Client ID.
const GOOGLE_CLIENT_ID = "7837238009-vqrbak2pblkimkv8iecvma2pibvupd9a.apps.googleusercontent.com";

// Extend the Window interface to include the `google` object from the GSI library
declare global {
  interface Window {
    google?: any;
  }
}

const App: React.FC = () => {
  const [user, setUser] = useState<UserProfile | null>(null);

  const handleCredentialResponse = useCallback((response: any) => {
    try {
      const idToken = response.credential;
      // This is a simplified way to decode a JWT for demonstration purposes.
      // In a real production app, you should send the token to your backend
      // for secure verification.
      const base64Url = idToken.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      
      const decodedProfile: UserProfile = JSON.parse(jsonPayload);
      setUser(decodedProfile);
      
    } catch (error) {
      console.error("Error decoding JWT:", error);
      // Handle error, maybe show a notification to the user
    }
  }, []);

  const handleSignOut = useCallback(() => {
    setUser(null);
    // This function disables the One Tap prompt for the current session.
    // It's useful to call on sign-out to prevent the prompt from
    // appearing again immediately.
    if (window.google) {
      window.google.accounts.id.disableAutoSelect();
    }
  }, []);

  useEffect(() => {
    // Check if the Google Identity Services library has loaded.
    if (window.google && window.google.accounts && window.google.accounts.id) {
      window.google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: handleCredentialResponse
      });

      const signInButtonContainer = document.getElementById('google-signin-button');
      
      if (signInButtonContainer) {
        window.google.accounts.id.renderButton(
          signInButtonContainer,
          { theme: "outline", size: "large", type: "standard", text: "signin_with", shape: "pill" }  // customization attributes
        );
      }

      // This displays the One Tap prompt or automatic sign-in.
      // It will not be shown if disableAutoSelect() has been called.
      // window.google.accounts.id.prompt();
    } else {
        // You might want to add a retry mechanism or a timeout here
        console.warn("Google Identity Services library not loaded yet.");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handleCredentialResponse]);

  return (
    <>
      {user ? (
        <ProfileScreen user={user} onSignOut={handleSignOut} />
      ) : (
        <LoginScreen />
      )}
    </>
  );
};

export default App;
