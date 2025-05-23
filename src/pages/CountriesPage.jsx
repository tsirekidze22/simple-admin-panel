import { useEffect, useState } from "react";
import "./CountriesPage.scss";

function CountriesPage() {
  const [countries, setCountries] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [currencyFilter, setCurrencyFilter] = useState("");
  const [independentOnly, setIndependentOnly] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 15;

  //   Fetches countries data and saves in state
  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((res) => res.json())
      .then((data) => {
        setCountries(data);
        setFiltered(data);
      })
      .catch((err) => alert("Error fetching countries: " + err.message));
  }, []);

  //  Filters data based on currencies & independent only
  useEffect(() => {
    let filteredData = [...countries];

    if (independentOnly) {
      filteredData = filteredData.filter((c) => c.independent);
    }

    if (currencyFilter) {
      filteredData = filteredData.filter(
        (c) =>
          c.currencies && Object.keys(c.currencies).includes(currencyFilter)
      );
    }

    setFiltered(filteredData);
    setCurrentPage(1);
  }, [independentOnly, currencyFilter, countries]);

  const totalPages = Math.ceil(filtered.length / perPage);
  const start = (currentPage - 1) * perPage;
  const currentData = filtered.slice(start, start + perPage);

  return (
    <div className="container countries-page mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Countries</h2>
      </div>

      <div className="row mb-3 g-3 align-items-center">
        <div className="col-auto">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="independentCheck"
              checked={independentOnly}
              onChange={() => setIndependentOnly(!independentOnly)}
            />
            <label className="form-check-label" htmlFor="independentCheck">
              Independent Only
            </label>
          </div>
        </div>
        <div className="col-auto">
          <select
            className="form-select"
            value={currencyFilter}
            onChange={(e) => setCurrencyFilter(e.target.value)}
          >
            <option value="">All Currencies</option>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
          </select>
        </div>
      </div>

      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Region</th>
            <th>Country</th>
            <th>Capital</th>
            <th>Currency</th>
            <th>Language</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((country) => (
            <tr key={country.cca3}>
              <td>{country.region}</td>
              <td>{country.name?.common}</td>
              <td>{country.capital?.[0] || "N/A"}</td>
              <td>
                {country.currencies
                  ? Object.values(country.currencies)
                      .map((cur) => cur.name)
                      .join(", ")
                  : "N/A"}
              </td>
              <td>
                {country.languages
                  ? Object.values(country.languages).join(", ")
                  : "N/A"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <nav>
        <ul className="pagination justify-content-center">
          {[...Array(totalPages)].map((_, i) => (
            <li
              key={i}
              className={`page-item ${i + 1 === currentPage ? "active" : ""}`}
            >
              <button
                className="page-link"
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

export default CountriesPage;
