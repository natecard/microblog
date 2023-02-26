import {createClient} from '@supabase/supabase-js';
import {Auth, ThemeMinimal} from '@supabase/auth-ui-react';

const supabaseUrl = import.meta.env.VITE_REACT_APP_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_REACT_APP_SUPABASE_ANON_KEY;

export const AuthUi = Auth;
export const authTheme = ThemeMinimal;
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
