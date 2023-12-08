import Layout from "@/components/Layout";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Categories() {
  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    fetchCategories();
  }, []);

  function fetchCategories() {
    axios.get("/api/categories").then((result) => {
      setCategories(result.data);
    });
  }
  // We saved fetchCategories as its own function so we can run it above initially as well as below in saveCategory so that the page
  // automatically refreshes when the new category is entered and saved

  async function saveCategory(event) {
    event.preventDefault();
    await axios.post("/api/categories", { name });
    setName("");
    fetchCategories();
  }

  return (
    <Layout>
      <h1>Categories</h1>
      <label>New Category Name</label>
      <form onSubmit={saveCategory} className="flex gap-1">
        <input
          className="mb-0"
          type="text"
          placeholder="Category Name"
          onChange={(event) => setName(event.target.value)}
          value={name}
        />
        <button type="submit" className="btn-primary py-1">
          Save
        </button>
      </form>

      <table className="basic mt-4">
        <thead>
          <tr>
            <td>Category Name</td>
          </tr>
        </thead>
        <tbody>
          {categories.length > 0 &&
            categories.map((category) => (
              <tr key={category._id}>
                <td>{category.name}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </Layout>
  );
}
