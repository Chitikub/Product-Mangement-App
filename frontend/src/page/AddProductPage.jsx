import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductForm from "../component/ProductForm.jsx";
import { showError, showSuccess } from "../services/alertService.js";
import { createProduct } from "../services/productService.js";

function AddProductPage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!name.trim() || !price) {
      setError("กรุณากรอกชื่อสินค้าและราคา");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      await createProduct({
        name: name.trim(),
        price: Number(price),
        description: description.trim(),
        Image: image.trim(),
      });

      await showSuccess("เพิ่มสินค้าเรียบร้อย", "ข้อมูลสินค้าได้ถูกบันทึกแล้ว");
      navigate("/products");
    } catch (err) {
      const message = err.message || "เกิดข้อผิดพลาดในการเพิ่มสินค้า";
      setError(message);
      await showError("เพิ่มสินค้าไม่สำเร็จ", message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-200 p-6">
      <main className="mx-auto max-w-4xl">
        {error && (
          <div className="alert alert-error mb-4">
            <span>{error}</span>
          </div>
        )}

        <ProductForm
          name={name}
          price={price}
          description={description}
          image={image}
          isSubmitting={isSubmitting}
          onNameChange={setName}
          onPriceChange={setPrice}
          onDescriptionChange={setDescription}
          onImageChange={setImage}
          onSubmit={handleSubmit}
          onCancel={() => navigate("/products")}
        />
      </main>
    </div>
  );
}

export default AddProductPage;
