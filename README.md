# Rudrani Veggies — PWA Prototype

This is a lightweight web app prototype for a monthly vegetable subscription service (₹1500–₹2000 plans with delivery included up to 8 km).

## How to run
1. Download and unzip.
2. Open `index.html` in a browser (Chrome/Edge/Firefox). For full PWA behavior, serve with a simple local server (e.g., `python -m http.server 8000`) and open `http://localhost:8000`.
3. Navigate via the bottom tabs or menu.
4. Data is stored in your browser `localStorage`.

## Features
- Plan selection with auto-generated delivery schedule (2 fixed days/week).
- Delivery charges included in plan; add-on orders show extra fee beyond 8 km at ₹15/km.
- Catalog & cart (mock prices).
- Orders history.
- Profile with distance km (impacts delivery fee for add-ons).
- Admin: inventory edits, update delivery statuses.

## Next steps (engineering)
- Real backend (e.g., FastAPI or Firebase) & auth (OTP).
- Payment gateway integration (Razorpay/Stripe test mode).
- Delivery agent app (scan QR, mark delivered).
- Zone pricing, coupons, referrals.
- Multi-language (Telugu/English) i18n.

Generated: 2025-08-25T13:54:46.999809
