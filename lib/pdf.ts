/**
 * Lấy file pdf từ server và lưu về máy của người dùng
 * @param slug slug của bài viết
 */
export async function savePdf(slug: string) {
  const reponse = await fetch(`/api/${slug}/pdf`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  // Create a temporary anchor element to trigger the download
  const url = window.URL.createObjectURL(new Blob([await reponse.blob()]));
  const link = document.createElement("a");
  link.href = url;

  // Setting filename received in response
  link.setAttribute("download", `${slug}.pdf`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}