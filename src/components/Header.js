// import {useEffect} from 'react';
// import {View, Text} from 'react-native';
// import {Appbar} from 'react-native-paper';
// import {useDispatch, useSelector} from 'react-redux';
// import {NavLink} from 'react-router-dom';
// import {useGetUserDetailsQuery} from '../app/services/auth/authService';
// import {logout, setCredentials} from '../features/auth/authSlice';
// import '../styles/header.css';

// const Header = () => {
//   const {userInfo} = useSelector(state => state.auth);
//   const dispatch = useDispatch();

//   // automatically authenticate user if token is found
//   const {data, isFetching} = useGetUserDetailsQuery('userDetails', {
//     pollingInterval: 900000, // 15mins
//   });

//   useEffect(() => {
//     if (data) {
//       dispatch(setCredentials(data));
//     }
//   }, [data, dispatch]);

//   return (
//     <Appbar.Header>
//       <View className="header-status">
//         <Text>
//           {isFetching
//             ? `Fetching your profile...`
//             : userInfo !== null
//             ? `Logged in as ${userInfo.email}`
//             : "You're not logged in"}
//         </Text>
//         <View className="cta">
//           {userInfo ? (
//             <button className="button" onClick={() => dispatch(logout())}>
//               Logout
//             </button>
//           ) : (
//             <NavLink className="button" to="/login">
//               Login
//             </NavLink>
//           )}
//         </View>
//       </View>
//       <NavLink to="/">Home</NavLink>
//       <NavLink to="/login">Login</NavLink>
//       <NavLink to="/register">Register</NavLink>
//       <NavLink to="/user-profile">Profile</NavLink>
//     </Appbar.Header>
//   );
// };
// export default Header;