# WebSocket Proxy (Railway + Express)

## 🚀 Giới thiệu
Dự án này cung cấp một **proxy WebSocket** để kết nối giữa ứng dụng **Next.js trên Vercel** và một **WebSocket server bên ngoài** (ví dụ: `ws://00.00.00.00:2003`). Vì Vercel không hỗ trợ WebSocket trực tiếp, giải pháp này giúp vượt qua hạn chế đó bằng cách sử dụng **Express** và **http-proxy-middleware** trên Railway.

---

## 📌 Tính năng
✅ Proxy WebSocket giữa Next.js và server bên ngoài.  
✅ Hỗ trợ CORS để tránh lỗi trình duyệt.  
✅ Có thể deploy nhanh chóng trên Railway.  
✅ Hoạt động với các client WebSocket như `socket.io-client`.

---

## 📂 Cấu trúc thư mục
```
ws-proxy/
├── .env
├── package.json
├── index.js
└── README.md
```

---

## 🛠 Cài đặt & Chạy cục bộ

### 1️⃣ **Clone repo**
```bash
git clone https://github.com/zijipia/ws-proxy.git
cd ws-proxy
```

### 2️⃣ **Cài đặt dependencies**
```bash
npm install
```

### 3️⃣ **Tạo file `.env`**
```bash
touch .env
```
Thêm nội dung sau vào `.env`:
```
PORT=3000
WS_TARGET=ws://00.00.00.00:2003
```

### 4️⃣ **Chạy server**
```bash
node .
```

### 5️⃣ **Kiểm tra hoạt động**
Mở trình duyệt hoặc dùng `curl`:
```bash
curl http://localhost:3000/
```
Kết quả mong đợi:
```
WebSocket Proxy is running!
```

---

## 🚀 Deploy lên Railway

### 1️⃣ **Cài đặt Railway CLI** (Nếu chưa có)
```bash
npm install -g @railway/cli
```
Hoặc đăng nhập qua web tại [https://railway.app/](https://railway.app/).

### 2️⃣ **Khởi tạo dự án Railway**
```bash
railway login
railway init
```
Chọn:
- **New Project** → Đặt tên (ví dụ: `ws-proxy`)
- Chọn **Node.js**

### 3️⃣ **Deploy lên Railway**
```bash
railway up
```
Sau khi deploy, bạn sẽ nhận được URL dạng:
```
https://ws-proxy-production.up.railway.app
```

---


## ✅ Kiểm tra sau khi deploy
```bash
curl https://ws-proxy-production.up.railway.app
```
Nếu phản hồi:
```
WebSocket Proxy is running!
```
Là bạn đã triển khai thành công! 🎉

---

## 📜 Giấy phép
MIT License.

---


