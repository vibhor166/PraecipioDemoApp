import { Navbar, Nav, Container, NavDropdown, Badge } from 'react-bootstrap';
import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';
import {LinkContainer} from 'react-router-bootstrap';
import {useSelector, useDispatch} from 'react-redux';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/authSlice';
import { useNavigate } from 'react-router-dom';


const Header = () => {

  
  const { userInfo } = useSelector((state) => state.auth);
  //when we have a mutation/query in an apiSlice, we don't need to use dispatch, we just create it here, but when we have a regular function, we're not making async requests,
  //then we need to call dispatch around it
  const dispatch = useDispatch();
  const [logoutApiCall] = useLogoutMutation();
  const navigate = useNavigate();


  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate('/')
    } catch (err) {
      console.log(err)
    }
  }


  return (
    <header>
      <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
        <Container>
          <LinkContainer to='/'>
          <Navbar.Brand>Praecipio demo app</Navbar.Brand>
          </LinkContainer>
          
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ms-auto'>
              { userInfo ? (
                <>
                  <NavDropdown title={userInfo.name} id='username'>
                    <LinkContainer to='/profile'>
                      <NavDropdown.Item>
                        Profile
                      </NavDropdown.Item>
                    </LinkContainer>

                      <NavDropdown.Item onClick={ logoutHandler}>
                        Logout
                      </NavDropdown.Item>
                   
                  </NavDropdown>
                </>
              ) : (
                <>
                <LinkContainer to='/login'>
                <Nav.Link>
                   <FaSignInAlt /> Sign In
                 </Nav.Link>
                </LinkContainer>
                 <LinkContainer to='/register'>
                 <Nav.Link>
                   <FaSignOutAlt /> Sign Up
                 </Nav.Link>
                 </LinkContainer>
                </>
              ) }

            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;