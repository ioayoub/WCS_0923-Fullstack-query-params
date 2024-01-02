import { useState, useRef } from "react";
import { useLoaderData, useSearchParams } from "react-router-dom";

import axios from "axios";

export default function HomePage() {
  const data = useLoaderData();
  const [articles, setArticles] = useState(data);
  const formRef = useRef(null);

  const [filters, setFilters] = useSearchParams({
    orderby: "",
    pricemax: "",
    limit: "",
  });

  /**
   * Handles the change event of the select input.
   * Updates the filters state based on the selected value.
   * If the selected value is "all", it removes the "orderby" parameter from the filters.
   * Otherwise, it sets the "orderby" parameter to the selected value.
   * @param {Event} e - The change event object.
   */
  const handleSelectChange = (e) => {
    const params = new URLSearchParams(filters);

    if (e.target.value === "all") {
      params.delete("orderby");
      setFilters(params);
      return;
    }

    params.set("orderby", e.target.value);
    setFilters(params);
  };

  /**
   * Handles the change event of the range input.
   * Updates the "pricemax" parameter in the filters object and sets the updated filters.
   * @param {Event} e - The change event object.
   */
  const handleRangeChange = (e) => {
    const params = new URLSearchParams(filters);
    params.set("pricemax", e.target.value);

    setFilters(params);
  };

  /**
   * Handles the change event for the limit input field.
   * Updates the limit parameter in the filters object and sets it as the new filters state.
   * @param {Event} e - The event object.
   */
  const handleLimitChange = (e) => {
    const params = new URLSearchParams(filters);
    params.set("limit", e.target.value);

    setFilters(params);
  };

  /**
   * Handles the click event and sends a GET request to retrieve articles based on the filters.
   */
  const handleClick = () => {
    axios
      .get(`http://localhost:8000/api/articles/?${filters.toString()}`)
      .then((res) => setArticles(res.data));
  };

  /**
   * Resets the filters and fetches all articles from the API.
   */
  const handleReset = () => {
    axios
      .get("http://localhost:8000/api/articles")
      .then((res) => setArticles(res.data));

    setFilters("");
    formRef.current.reset();
  };

  return (
    <div>
      <h1 className="text-4xl my-16 text-center ">Articles</h1>
      <div className="flex flex-row justify-center my-4 gap-8">
        <form ref={formRef}>
          <select onChange={handleSelectChange} className="border">
            <option value="all">All</option>
            <option value="ASC">ASC</option>
            <option value="DESC">DESC</option>
          </select>

          <input
            type="range"
            min={0}
            max={200}
            step={5}
            onChange={handleRangeChange}
          />

          <input
            type="number"
            min={0}
            className="border"
            placeholder="limit"
            onChange={handleLimitChange}
          />
        </form>
      </div>
      <div className="flex flex-row gap-4 justify-center my-8">
        <button
          type="button"
          className="bg-blue-600 text-white p-2"
          onClick={handleClick}
        >
          Appliquer les filtres
        </button>
        <button
          type="button"
          onClick={handleReset}
          className="bg-black text-white p-2"
        >
          Reset
        </button>
      </div>

      <ul>
        {articles.map((article) => (
          <li key={article.id} className="text-center">
            {article.title} {article.price}
          </li>
        ))}
      </ul>
    </div>
  );
}
