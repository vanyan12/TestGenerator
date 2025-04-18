import * as React from 'react';
import { AppProvider } from '@toolpad/core/AppProvider';
import { SignInPage } from '@toolpad/core/SignInPage';
import { useTheme } from '@mui/material/styles';

const providers = [{ id: 'credentials', name: 'Email and password' }];

const signIn = async (provider, formData) => {
//   const promise = new Promise((resolve) => {
//     setTimeout(() => {
//       const email = formData?.get('email');
//       const password = formData?.get('password');
//       alert(
//         `Signing in with "${provider.name}" and credentials: ${email}, ${password}`,
//       );
//       // preview-start
//       resolve({
//         type: 'CredentialsSignin',
//         error: 'Invalid credentials.',
//       });
//       // preview-end
//     }, 300);
//   });
//   return promise;
    try{
        const username = formData?.get('email');
        const password = formData?.get('password');
        
        const response = await fetch('http://127.0.0.1:8000/login',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                username: username,
                password: password,
            }),
        })
    
        const result = await response.json()
    
        if (!response.ok) {
            throw new Error(result.error || 'Something went wrong')
        }
    
        return{
            type: 'CredentialsSignin',
            error: null,
            data: result,
        }
    
    } catch (error){
        console.error('Sign-in error:', error);
        // return {
        //     type: 'CredentialsSignin',
        //     error: error.message,
        // };
    }


};

export default function NotificationsSignInPageError() {
  const theme = useTheme();
  return (
    // preview-start
    <AppProvider theme={theme}>
      <SignInPage
        signIn={signIn}
        providers={providers}
        slotProps={{ emailField: { autoFocus: false }, form: { noValidate: true } }}
      />
    </AppProvider>
    // preview-end
  );
}
