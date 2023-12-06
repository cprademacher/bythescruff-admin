/* eslint-disable react/no-unescaped-entities */
import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

export default function DeleteProductPage() {
  const [productInfo, setProductInfo] = useState(null);
  const router = useRouter();

  function goBack() {
    router.push("/products");
  }

  const { id } = router.query;

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get("/api/products?id=" + id).then((response) => {
      setProductInfo(response.data);
    });
  }, [id]);

  async function deleteProduct() {
    await axios.delete('/api/products?id='+id);
    goBack();
  }


  return (
    <Layout> 
      <h1 className="text-center">Are you sure you want to delete "{productInfo &&  productInfo.title}"?</h1>
      <div className="flex gap-2 justify-center">
        <button onClick={deleteProduct} className="btn-red">Yes</button>
        <button onClick={goBack} className="btn-default">
          No
        </button>
      </div>
    </Layout>
  );
}
