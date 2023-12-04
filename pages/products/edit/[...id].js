import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import ProductForm from "@/components/ProductFrom";

export default function EditProductPage() {
  const [productInfo, setProductInfo] = useState(null);
  const router = useRouter();

  const { id } = router.query;

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get("/api/products?id=" + id).then((response) => {
      setProductInfo(response.data);
    });
  }, [id]);

  console.log(productInfo);

  return (
    <Layout>
      <h1>Edit Product {productInfo && " - "+ productInfo.title}</h1>
      {productInfo && <ProductForm {...productInfo} />}
    </Layout>
  );
}
