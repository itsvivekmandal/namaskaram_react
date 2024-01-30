import {productImgPath} from "../utils/constants";

const RestaurantCard = (props) => {
  const {cardData} = props;
  const {name, cloudinaryImageId, avgRating, sla, cuisines, costForTwo} = cardData?.info;
  const {slaString} = sla;
  return (
    <div className="res-card">
      <img className="food-img" src={productImgPath + cloudinaryImageId}></img>
      <h2 className="restaurant-name text-2xl font-bold text-500">{name}</h2>
      <div className="restaurant-name">
        <span className="cardleft rating">⭐ {avgRating}</span>
        <span className="cardright">{slaString}</span>
      </div>
      <div className="cuisinesprice">
        <span className="cardleft">{cuisines.join(', ')}</span>
        <span className="cardright">{costForTwo}</span>
      </div>
    </div>
  );
};

export default RestaurantCard;