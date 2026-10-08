import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProductForm from "../component/ProductForm.jsx";
import { showError, showSuccess } from "../services/alertService.js";
import { getProductById, updateProduct } from "../services/productService.js";

function EditProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const product = await getProductById(id);
        setName(product.name || "");
        setPrice(String(product.price ?? ""));
        setDescription(product.description || "");
        setImage(product.image || "");
      } catch (err) {
        setError(err.message || "ไม่สามารถโหลดข้อมูลสินค้าได้");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!name.trim() || !price) {
      setError("กรุณากรอกชื่อสินค้าและราคา");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      await updateProduct(id, {
        name: name.trim(),
        price: Number(price),
        description: description.trim(),
        Image: image.trim(),
      });

      await showSuccess("แก้ไขสินค้าเรียบร้อย", "ข้อมูลสินค้าได้ถูกอัปเดตแล้ว");
      navigate("/products");
    } catch (err) {
      const message = err.message || "เกิดข้อผิดพลาดในการแก้ไขสินค้า";
      setError(message);
      await showError("แก้ไขสินค้าไม่สำเร็จ", message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-base-200">
        <p>กำลังโหลดข้อมูลสินค้า...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 p-6 rounded-xs">
      <main className="mx-auto max-w-4xl">
        {error && (
          <div className="alert alert-error mb-4">
            <span>{error}</span>
          </div>
        )}

        <ProductForm
          editingId={Number(id)}
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

export default EditProductPage;
