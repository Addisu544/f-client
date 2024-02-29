import React, { useState, useEffect } from "react";
import Menu from "./Menu";
import Categories from "./Categories";

function App() {
  const [menu, setMenu] = useState([]);
  const [menuItems, setMenuItems] = useState(menu);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => {
        setMenu(data.foods);
        setMenuItems(data.foods);
        console.log("data from server", data.foods);
        const allCategories = [
          "all",
          ...new Set(data.foods.map((item) => item.category)),
        ];
        setCategories(allCategories);
      });
  }, []);

  const filterItems = (category) => {
    console.log("click", category);
    if (category === "all") {
      setMenuItems(menu);
      return;
    }

    const newItems = menu.filter((item) => item.category === category);
    setMenuItems(newItems);
  };

  console.log("data from browser", menu);

  return (
    <main>
      <section className="menu section">
        <div className="title">
          <h2>our menu</h2>
          <div className="underline" />
        </div>
        <Categories categories={categories} filterItems={filterItems} />
        <Menu items={menuItems} />
      </section>
    </main>
  );
}

export default App;
