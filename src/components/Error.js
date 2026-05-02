import { useNavigate, useRouteError } from "react-router-dom";
import { Link } from "react-router-dom";

const Error = () => {
  const navigate = useNavigate();
  const err = useRouteError();

  const back = () => {
    navigate(-1);
  };
  // console.log(err);
  return (
      <div className="w-2/12 border-2 shadow-lg mx-auto my-14 p-6 text-center">
        <div className="p-4 text-4xl font-bold">{err.status}</div>
        <div className="p-4 text-4xl font-bold">{err.statusText}</div>
        <button className="px-4 py-2 my-4 bg-black rounded-md text-white font-bold" onClick={back}>Back To Previous Page</button>
      </div>
  );
};

export default Error;