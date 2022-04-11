import React, { useEffect, useRef } from "react";

export default function Categories(props) {
  let category = props.products.map((product) => {
    return product.categories[0]?.name;
  });
  const { categoryFilterHandler } = props;
  const inputEL = useRef(null);
  category = new Set(category);
  category = Array.from(category).filter((category) => category);
  const categoryFilterValidator = (e) => {
    if (e.target.checked) {
      categoryFilterHandler(e.target.name);
    } else {
      categoryFilterHandler("");
    }
  };
  useEffect(() => {
    inputEL.current.checked = true;
  }, []);

  const categoryList = category.map((list, idx) => {
    return (
      <div className="flex mt3 " key={idx}>
        <div>
          <input
            type="checkbox"
            name={list}
            id={list}
            onChange={(e) => {
              const inputsSelector = document.querySelectorAll(
                ".categories-container input"
              );
              for (let input of inputsSelector) {
                input.checked = false;
              }
              e.target.checked = !e.target.checked;
              categoryFilterValidator(e);
            }}
          />
        </div>
        <div className="">
          <label className="ml3 " htmlFor={list}>
            {list}
          </label>
        </div>
      </div>
    );
  });

  return (
    <div className="categories-container  shadow-1 pa2">
      <h2>Categories</h2>
      <div className="flex mt3 ">
        <div>
          <input
            type="checkbox"
            name="all"
            id="all"
            ref={inputEL}
            onChange={(e) => {
              const inputsSelector = document.querySelectorAll(
                ".categories-container input"
              );
              for (let input of inputsSelector) {
                input.checked = false;
              }
              e.target.checked = true;
              categoryFilterValidator(e);
            }}
          />
        </div>
        <div className="">
          <label className="ml3 " htmlFor="all">
            All
          </label>
        </div>
      </div>
      {categoryList}
    </div>
  );
}
