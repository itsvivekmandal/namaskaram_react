import React from "react"
import { useState } from "react";

const UserFunction = ({name, age, profession}) => {

  const [count, setCount] = useState(0);
  const [count2, setCount2] = useState(1);

    return (
      <div className="about">
        <h1>count - {count}</h1>
        <h1>count2 - {count2}</h1>
        <h1>Name: {name}</h1>
        <h1>Age: {age}</h1>
        <h1>Profession: {profession}</h1>
      </div>
    )
};

export default UserFunction;