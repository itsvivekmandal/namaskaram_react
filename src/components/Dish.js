import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Dish = (props) => {
  const [dishList, setDishList] = useState([]);
  const [link, setLink] = useState([]);
  const [heading, setHeading] = useState(null);
  const {id} = useParams();
  // console.log(id);
  // const heading = props?.text;
  // const url = props?.link;

  useEffect(() => {
    fetchData();
    // console.log(link);
    fetchData1();
  }, []);

  const fetchData = async() => {
    const url = "https://www.swiggy.com/dapi/restaurants/list/v5?lat=19.0759837&lng=72.8776559&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING";
    const data = await fetch(url);
    const response = await data.json();

    let details = response?.data?.cards[0]?.card?.card?.gridElements?.infoWithStyle?.info;
    const filteredDetails = details.filter(ele => {
      return ele.id === id;
    });

    const url1 = filteredDetails[0]?.action?.link;
    // console.log(url1);
    // const dish = await fetch('https://www.swiggy.com/dapi/restaurants/list/v5?lat=19.0759837&lng=72.8776559&collection=83637&tags=layout_CCS_Burger&sortBy=&filters=&type=rcv2&offset=0&page_type=null');
    // const dish = await fetch(url1);
    // const dishDetails = await dish.json();
    // console.log(dishDetails);

    setLink(url1);
    // setHeading(filteredDetails?.header?.title);
    // return url1;
  };

  const fetchData1 = async() => {
    console.log(link);
    // const url = "https://www.swiggy.com/dapi/restaurants/list/v5?lat=19.0759837&lng=72.8776559&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING";
    // const data = await fetch(link);
    // const response = await data;
    // console.log(data);
    // setDishList(response);
  };

  
  // console.log(dishList);

  return (
    <div className="p-4 m-4">
      <div className="text-[30px] font-bold">This is dish page</div>
    </div>
  );
};

export default Dish;