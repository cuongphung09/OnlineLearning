import  React from 'react';
export const users = {
  guest: {
    email: 'abc@xyz.com',
    name: 'ABC'
  }
}
const AuthContext = React.createContext(null);
export default AuthContext
// export function useAuth() {
//   return useContext(AuthContext);
// }