# RentalCar — Modern Car Rental Service 🚙

RentalCar is a web application for a car rental company built with **Next.js App Router** and **TypeScript**.  
The project provides users with a convenient and intuitive interface for browsing available cars, filtering vehicles, viewing detailed specifications, and submitting booking requests.

The application focuses on:

- ⚡ performance
- 🔍 SEO optimization
- ✨ smooth user experience

---

# ✨ Features

## 🏠 Home Page

- Modern hero section
- Clear call-to-action

## 🚘 Car Catalog

- Dynamic list of rental cars
- Data fetched from REST API
- Optimized loading states

## 🔎 Advanced Filtering

Users can filter cars by:

- Brand
- Rental price
- Mileage range

## 📄 Dynamic Car Details Pages

Each vehicle has its own page with:

- High-quality images
- Car specifications
- Rental conditions
- Booking form

## ❤️ Favorites

- Add/remove cars from favorites
- Persistent state management with Zustand

## ⚡ Pagination & Data Fetching

- Efficient API requests with React Query
- Smooth catalog updates
- Load More functionality

## 🔗 SEO Optimization

- Dynamic metadata generation
- Open Graph support

---

# 🛠️ Tech Stack

## Core

- **Next.js** (App Router)
- **React**
- **TypeScript**

## State Management & Data Fetching

- **@tanstack/react-query**
- **Zustand**
- **Axios**

## Forms & Validation

- **Formik**
- **Yup**

## UI & Styling

- **CSS Modules**
- **Modern Normalize**
- **React Select**
- **React Datepicker**
- **React Hot Toast**

---

# ⚙️ Installation & Usage

## 1️⃣ Clone the repository

```bash
git clone https://github.com/vasilisa-fs/rentalcar.git
```

---

## 2️⃣ Navigate to the project folder

```bash
cd rentalcar
```

---

## 3️⃣ Install dependencies

```bash
npm install
```

or

```bash
yarn install
```

---

# 🔑 Environment Variables

Create a `.env` file in the root directory:

```env
NEXT_PUBLIC_API_URL=https://car-rental-api.goit.study
```

---

# ▶️ Run the Project

## Development mode

```bash
npm run dev
```

or

```bash
yarn dev
```

Open:

```txt
http://localhost:3000
```

---

## Production build

```bash
npm run build
```

---

## Start production server

```bash
npm run start
```

---

# 🌐 API

The project uses the following API:

```txt
https://car-rental-api.goit.study
```

Main endpoints:

- `GET /cars`
- `GET /cars/:id`
- `GET /cars/filters`
- `POST /cars/:id/booking-requests`

---

# 👩‍💻 Author

**Vasilisa Bychkova**
https://github.com/vasilisa-fs
