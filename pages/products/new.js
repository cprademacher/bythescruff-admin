import Layout from "@/components/Layout";

export default function NewProduct() {
  return (
    <Layout>
    <input type="text" placeholder="Product Name" />
    <textarea type="text" placeholder="Description" />
  </Layout>
  );
}
