# CabCompare

CabCompare is a modern web application that allows users to compare cab fares, ETAs, and travel durations across multiple ride-hailing services like Uber, Ola, and Rapido. The application provides real-time data, intuitive visualizations, and a seamless user experience to help users make informed decisions.

## Features

- **Real-Time Fare Comparison**: Compare fares, ETAs, and travel durations across multiple cab services.
- **Interactive Dashboard**: Access analytics, saved routes, and ride history in a user-friendly dashboard.
- **Live Tracking**: View live tracking maps for ongoing rides.
- **Customizable Settings**: Adjust preferences like ride type, max price, and max ETA.
- **Responsive Design**: Optimized for both desktop and mobile devices.
- **Dark Mode Support**: Toggle between light and dark themes.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/cab-compare.git
   cd cab-compare

2. Install dependencies using pnpm or npm:
    ```bash
    pnpm install || npm install

3. Start the development server:
    ```bash
    pnpm dev || npm run dev

4. Open the app in your browser at http://localhost:3000

## Project Structure
/cabcompare
├── app/
│   ├── (dashboard)/
│   ├── login/
│   ├── signup/
│   └── layout.tsx
├── components/
│   ├── ui/  # shadcn components
│   ├── comparison-table.tsx
│   ├── price-chart.tsx
│   └── ...
├── lib/     # Utilities and hooks
├── styles/  # Global CSS
└── public/  # Static assets

## Scripts

- `pnpm dev`: Start the development server
- `pnpm build`: Build the application for production
- `pnpm start`: Start the production server
- `pnpm lint`: Run linting checks
- `pnpm format` : Format with Prettier

## Technologies Used

- **Framework**: [Next.js](https://nextjs.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: 
  - [Radix UI](https://www.radix-ui.com/)
  - [Lucide Icons](https://lucide.dev/)
- **State Management**: React Hooks
- **TypeScript**: For type safety and better developer experience

## Contributing 🤝

Contributions are welcome! Please follow these steps:

1. **Fork the repository**
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