import { Category } from "@/models/Category";
import { mongooseConnect } from "@/lib/mongoose";

export default async function handle(req, res) {
  const { method } = req;
  await mongooseConnect();

  if (method === "GET") {
    res.json(await Category.find().populate("parent"));
  }

  if (method === "POST") {
    const { name, parentCategory } = req.body;
    const parentObjectId = isValidObjectId(parentCategory)
      ? parentCategory
      : null;

    const categoryDoc = await Category.create({ name, parent: parentObjectId });
    res.json(categoryDoc);
  }

  if (method === "PUT") {
    const { name, parentCategory, _id } = req.body;
    const parentObjectId = isValidObjectId(parentCategory)
      ? parentCategory
      : null;

    const categoryDoc = await Category.updateOne(
      { _id },
      {
        name,
        parent: parentObjectId,
      }
    );
    res.json(categoryDoc);
  }

  if (method === "DELETE") {
    const { _id } = req.query;
    await Category.deleteOne({ _id });
    res.json("Ok");
  }
}

function isValidObjectId(value) {
  // Use a library like mongoose to validate ObjectId
  // In this example, assuming a simple ObjectId validation
  return /^[0-9a-fA-F]{24}$/.test(value);
}
