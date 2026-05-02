import useRestaurant from "../utils/custom_hooks/useRestaurant";

const Contact = () => {

  const Restaurants = useRestaurant();
  console.log(Restaurants);
  
  return (
    <div>
      <h1>This is Contact Us Page</h1>
    </div>
  );
};

export default Contact;