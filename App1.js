import React, { useState, useEffect } from "react";

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        console.log("the prev", data.foods);
      });
  }, []);

  return (
    <div className="App">
      {data === null ? (
        <p>loading</p>
      ) : (
        data.foods.map((food, i) => (
          <div key={i}>
            <img src={food.image} alt={food.name} />
            <p>Food Name: {food.name}</p>
            <p>Price: {food.price}</p>
            <p>Likes: {food.likes}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default App;
