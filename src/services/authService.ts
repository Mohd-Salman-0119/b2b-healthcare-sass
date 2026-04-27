import { auth, signInWithEmailAndPassword, signOut } from '../config/firebase';

export const login = async (email: string, password: string) => {
  try {
    if (auth.app.options.apiKey === 'mock-api-key') {
      // Fallback for demo without real Firebase keys
      if (email === 'admin@demo.com' && password === 'admin123') {
        return { uid: 'demo-uid-123', email, displayName: 'Demo Admin' };
      }
      throw new Error('Invalid demo credentials. Use admin@demo.com / admin123');
    }
    
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const logout = async () => {
  if (auth.app.options.apiKey === 'mock-api-key') {
    return Promise.resolve();
  }
  return signOut(auth);
};
