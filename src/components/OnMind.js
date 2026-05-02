import { Link } from "react-router-dom";
import {productImgPath} from "../utils/constants";

const OnMind = ({data}) => {
  return (
    <div className="flex-none w-44 bg-gray-200 mx-4">
        <Link to={`/dish/${data.id}`}>
          <img src={productImgPath + data.imageId}></img>
        </Link>
    </div>
  );
};

export default OnMind;