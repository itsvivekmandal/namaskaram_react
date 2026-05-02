import React from "react";
import UserContext from "../utils/UserContext";

class UserClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: {
        name: 'test',
        bio: 'bio test',
        company: 'company',
        // avatar_url: 'avatar_url'
      }
    };
  };

  // componentDidMount is used for APIs call same as useEffect in functional component
  async componentDidMount() {
    const userData = await fetch('https://api.github.com/users/itsvivekmandal');
    const userInfo = await userData.json();
    // console.log(userInfo);
    this.setState({
      userInfo: userInfo
    });
    // Use setUserImage from context
    const { setUserImage } = this.context;
    setUserImage(userInfo.avatar_url);
  };

  render() {
    const {name, avatar_url, bio, company} = this.state.userInfo;
      return (
        <UserContext.Consumer>
          {({loggedInUser, setUserName}) => (
            <div className="w-4/12 my-4 mx-auto p-8 shadow-2xl text-center border-2 items-center">
              <img className="w-60 p-4 mb-4 mx-auto rounded-full" src={avatar_url} alt="avtar" />
              <div className="p-2">Name: {name}</div>
              <div className="p-2">Profession: {bio}</div>
              <div className="p-2">Company: {company}</div>
              <div className="p-2 font-bold">UserName: {loggedInUser}</div>
              <div className="flex items-center m-4">
                <label className="font-bold">Context example</label>
                <input type="text" className="shadow-lg border-2 px-4 py-2 mx-2 rounded-lg hover:bg-gray-200 focus:outline-none"
                    value={loggedInUser}
                    onChange={(e) => {
                      setUserName(e.target.value);
                    }}
                  />
              </div>
            </div>
          )}
        </UserContext.Consumer>
    )
  };
};
UserClass.contextType = UserContext;
export default UserClass;