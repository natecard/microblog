import { createClient } from '@supabase/supabase-js';
import { Auth, ThemeMinimal } from '@supabase/auth-ui-react';

const supabaseUrl = import.meta.env.VITE_REACT_APP_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_REACT_APP_SUPABASE_ANON_KEY;
// const options = {
//   db: {
// schema: 'posts',
//   },
//   auth: {
// autoRefreshToken: true,
// persistSession: true,
// detectSessionInUrl: true,
//   },
//   global: {
//     headers: {
//   authorization: 'Bearer ',
// },
//   },
// };
export const AuthUi = Auth;
export const authTheme = ThemeMinimal;
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
