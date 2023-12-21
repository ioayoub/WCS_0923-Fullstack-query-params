import { useLoaderData, useSearchParams } from "react-router-dom";

export default function HomePage() {
  const articles = useLoaderData();

  const [filters, setFilters] = useSearchParams();

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

  const handleRangeChange = (e) => {
    const params = new URLSearchParams(filters);
    params.set("pricemax", e.target.value);

    setFilters(params);
  };

  return (
    <div>
      <h1 className="text-4xl my-16 text-center ">Articles</h1>
      <div className="flex flex-row justify-center my-12">
        <select onChange={handleSelectChange}>
          <option value="all">All</option>
          <option value="asc">ASC</option>
          <option value="desc">DESC</option>
        </select>

        <input
          type="range"
          min={0}
          max={200}
          step={5}
          onChange={handleRangeChange}
        />
      </div>
      <div className="flex flex-row gap-4 justify-center">
        <button type="button" className="bg-blue-600 text-white p-2">
          Appliquer les filtres
        </button>
        <button
          type="button"
          onClick={() => setFilters("")}
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
