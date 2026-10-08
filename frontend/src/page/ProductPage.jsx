import React, { useCallback, useEffect, useState } from "react";
import ProductHeader from "../component/ProductHeader.jsx";
import Productlist from "../component/Productlist.jsx";
import {
  confirmDelete,
  showError,
  showSuccess,
} from "../services/alertService.js";
import { deleteProduct, getProduct } from "../services/productService.js";
import { Link, useNavigate } from "react-router-dom";

const ProductPage = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const result = await getProduct();
      setProducts(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleDelete = async (id) => {
    const result = await confirmDelete();
    if (!result.isConfirmed) return;

    try {
      await deleteProduct(id);
      await fetchProducts();
      await showSuccess("ลบสินค้าเรียบร้อย", "สินค้าได้ถูกลบออกจากระบบแล้ว");
    } catch (err) {
      setError(err.message || "ลบสินค้าไม่สำเร็จ");
      await showError(
        "ลบสินค้าไม่สำเร็จ",
        err.message || "โปรดลองใหม่อีกครั้ง",
      );
    }
  };

  useEffect(() => {
    fetchProducts();

    const intervalId = setInterval(() => {
      fetchProducts();
    }, 5000);

    return () => clearInterval(intervalId);
  }, [fetchProducts]);

  return (
    <div className="min-h-screen bg-base-200 p-6">
      <main className="mx-auto max-w-6xl">
        <ProductHeader />

        <div className="mt-6 flex justify-end">
          <Link
            className="btn btn-primary bg-blue-500 text-white "
            to="/products/add"
          >
            เพิ่มสินค้า
          </Link>
        </div>

        <div className="mt-6 rounded-box bg-base-100 p-6 shadow-lg">
          {loading && <p>กำลังโหลด...</p>}
          {error && <p className="text-red-500">{error}</p>}
          {!loading && products.length === 0 && !error && <p>ไม่มีสินค้า</p>}
          <Productlist
            products={products}
            onEdit={(product) => navigate(`/products/edit/${product.id}`)}
            onDelete={handleDelete}
          />
        </div>
      </main>
    </div>
  );
};

export default ProductPage;
