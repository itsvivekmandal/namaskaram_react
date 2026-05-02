import UserFunction from './UserFunction';
import UserClass from './UserClass';
import UserContext from '../utils/UserContext';
import { useContext } from 'react';

const About = () => {
  const {loggedInUser} = useContext(UserContext);
  return (
    <div>
     <h1>About Us</h1>
     <h1 className='font-bold p-4'>{`I am ${loggedInUser}`}</h1>
     <UserClass name="Vivek Mandal (Calss)" age="30" profession="Software Engineer" />
     <UserFunction name="Vivek Mandal (Function)" age="30" profession="Software Engineer"/>
    </div>
  );
};

export default About;