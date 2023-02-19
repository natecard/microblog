import { auth } from '../../App';
export const SignOutButton = (props) => {
  const handleClick = () => {
    auth.signOut();
  };
  return (
    <button onClick={handleClick} type="button" className="btn normal-case">
      Sign Out
    </button>
  );
};
