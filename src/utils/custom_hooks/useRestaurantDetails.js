import { useState, useEffect } from "react";
import menus from "../jsons/menus.json";

const  useRestaurantDetails = (id) => {
  const [restuarantDetail, setRestaurantDetails] = useState([]);

  useEffect(() => {
    fetchDetails();
  }, []);

  const fetchDetails = async() => {
    // const url = `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=19.0759837&lng=72.8776559&restaurantId=${id}&catalog_qa=undefined&submitAction=ENTER`;




// https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=19.0759837&lng=72.8776559&restaurantId=787747&catalog_qa=undefined&submitAction=ENTER
    
    // const resDetails = await fetch(url);

    // if (!resDetails.ok) {
    //     console.error("Request failed:", resDetails.status);
    //     return;
    // }

    // const contentType = resDetails.headers.get("content-type");

    // if (!contentType || !contentType.includes("application/json")) {
    //     console.error("Not JSON response");
    //     return;
    // }

    // const details = await resDetails.json();
    // console.log(details);

    // setRestaurantDetails(details?.data);
    setRestaurantDetails(menus?.[id]?.data);
  };
  return restuarantDetail;
};

export default useRestaurantDetails;