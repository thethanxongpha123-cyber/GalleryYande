export async function onRequest(context) {
  const url = new URL(context.request.url);
  // Thay đổi URL này thành link dẫn tới file JSON của bạn
  const JSON_URL = `${url.origin}/images.json`; 
  
  try {
    const response = await fetch(JSON_URL);
    let images = await response.json();

    // Thuật toán trộn ngẫu nhiên (Fisher-Yates)
    for (let i = images.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [images[i], images[j]] = [images[j], images[i]];
    }

    // Trả về tối đa 1000 ảnh
    const data = images.slice(0, 1000);

    return new Response(JSON.stringify(data), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    return new Response("Error loading images", { status: 500 });
  }
}