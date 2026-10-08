import Swal from "sweetalert2";

export const confirmDelete = async (
  title = "ลบสินค้า",
  text = "คุณต้องการลบสินค้านี้หรือไม่?",
) => {
  return Swal.fire({
    title,
    text,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#6c757d",
    confirmButtonText: "ยืนยันลบ",
    cancelButtonText: "ยกเลิก",
  });
};

export const showSuccess = async (
  title = "สำเร็จ",
  text = "ดำเนินการสำเร็จ",
) => {
  return Swal.fire({
    title,
    text,
    icon: "success",
    confirmButtonText: "ตกลง",
  });
};

export const showError = async (
  title = "เกิดข้อผิดพลาด",
  text = "โปรดลองใหม่อีกครั้ง",
) => {
  return Swal.fire({
    title,
    text,
    icon: "error",
    confirmButtonText: "ตกลง",
  });
};

export const showInfo = async (title, text) => {
  return Swal.fire({
    title,
    text,
    icon: "info",
    confirmButtonText: "ตกลง",
  });
};
