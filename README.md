# 🚖 CabCompare - Ride Smarter, Not Harder 💨

CabCompare is a modern web application that allows users to compare cab fares, ETAs, and travel durations across multiple ride-hailing services like Uber, Ola, and Rapido. The application provides real-time data, intuitive visualizations, and a seamless user experience to help users make informed decisions.

## ✨ Key Features

- **🔍 Real-Time Fare Comparison**: Compare fares, ETAs, and travel durations across multiple cab services
- **📊 Interactive Dashboard**: Access analytics, saved routes, and ride history in a user-friendly dashboard
- **📍 Live Tracking**: View live tracking maps for ongoing rides
- **⚙️ Customizable Settings**: Adjust preferences like ride type, max price, and max ETA
- **📱 Responsive Design**: Optimized for both desktop and mobile devices
- **🌙 Dark Mode Support**: Toggle between light and dark themes

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- pnpm (`npm install -g pnpm`)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/DPRAHUL-2021/cab-compare.git
   cd cab-compare
2. Install dependencies:

   ```bash
   Copy
   pnpm install
   # or
   npm install

3. Start the development server:

   ```bash
   Copy
   pnpm dev
   # or
   npm run dev

4.Open the app in your browser at http://localhost:3000

## 📂 Project Structure

```
/cabcompare
├── app/
│   ├── (dashboard)/       🏠 Protected routes
│   │   ├── compare/       🔄 Comparison tool
│   │   └── history/       📜 Ride history
│   ├── auth/              🔐 Authentication
│   │   ├── login/         🔑 Login page
│   │   └── signup/        ✏️ Signup page
│   └── layout.tsx         🖼️ Root layout
├── components/
│   ├── ui/                🧩 shadcn components
│   ├── comparison-table.tsx  📊 Fare comparison
│   ├── price-chart.tsx    📈 Pricing trends
│   └── ...                🗂️ Other components
├── lib/                   🧰 Utilities and hooks
├── styles/                🎨 Global CSS
└── public/                🖼️ Static assets
```

## 📜 Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | 🏗️ Start development server |
| `pnpm build` | 🏗️ Create production build |
| `pnpm start` | 🚀 Start production server |
| `pnpm lint` | 🔍 Run ESLint checks |
| `pnpm format` | ✨ Format with Prettier |

## 🛠️ Technologies Used

- **Framework**: [Next.js](https://nextjs.org/) ⚡
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) 🎨
- **UI Components**:
  - [Radix UI](https://www.radix-ui.com/) 🧩
  - [shadcn/ui](https://ui.shadcn.com/) ✨
  - [Lucide Icons](https://lucide.dev/) 🔣
- **State Management**: React Hooks 🧠
- **TypeScript**: For type safety 🔒

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

1. **Fork the repository** 🍴
2. **Create your feature branch**  
   ```bash
   git checkout -b feature/amazing-feature
3. **Commit your changes**
   ```bash
   git commit -m 'Add some amazing feature'
4. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
5. **Open a Pull Request**

---

Made with ❤️ by [DPRAHUL](https://github.com/DPRAHUL-2021)
