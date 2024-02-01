import { useRouteError } from "react-router-dom";
import { Link } from "react-router-dom";

const Error = () => {
  
  const err = useRouteError();
  console.log(err);
  return (
      <div className="error">
        <h1>{err.status}</h1>
        <h1>{err.statusText}</h1>
        <h2 className="backBtn"><a href="/">Back</a></h2>
      </div>
  );
};

export default Error;