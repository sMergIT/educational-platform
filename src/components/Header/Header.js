import React from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import NavigationTopStudent from './NavItemsStudent';
import NavigationTopTeacher from './NavItemsTeacher';
import NavigationTopAdmin from './NavItemsAdmin';

const useStyles = makeStyles({
  root: {
    width: 'max-content',
    background: 'none',
  },
  header: {
    backgroundColor: '#f0f0f0',
    height: 'max-content',
    padding: '10px 30px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    top: 0,
    left: 0,
    zIndex: 100,
  },
  logo: {
    fontSize: '22px',
    width: 'max-content',
    color: '#3f51b5'
  }
});

const Header = () => {
  let role = 0;
  const { user } = useSelector(state => state.userReducer);
  console.log(user);
  if (user) {
    role = user.role;
    console.log('role', role)

  }

  const classes = useStyles();

  return (
    <div className={classes.header}>
      <div className={classes.logo}>ODU Project</div>
      {role === 3 && <NavigationTopStudent />}
      {role === 2 && <NavigationTopTeacher />}
      {role === 1 && <NavigationTopAdmin />}
    </div>
  )
}

export default Header;
