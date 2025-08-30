# 🌤️ Weather Explorer App

A **student project** demonstrating React development skills with a modern, responsive weather application. Built with React, TypeScript, and Tailwind CSS to showcase component architecture, state management, and API integration.

## 🎯 **Project Goals**

This project demonstrates my ability to:
- **Build real-world applications** with React and TypeScript
- **Handle component architecture** and state management
- **Integrate external APIs** (OpenWeatherMap)
- **Create responsive designs** with modern UI principles
- **Write clean, maintainable code** with proper error handling

## ✨ **Key Features**

- **🌍 Real-time Weather Data**: Get current weather conditions for any city worldwide
- **📱 Responsive Design**: Beautiful UI that works perfectly on all devices
- **🎨 Modern UI Components**: Built with Radix UI and Tailwind CSS for professional look
- **🔒 TypeScript**: Full type safety and better development experience
- **🔍 Smart Search**: Easy city search with helpful suggestions and error handling
- **⚡ Fast Performance**: Optimized with Vite for quick loading and development

## Setup

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd weather-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   - Create a `.env` file in the root directory
   - Add your OpenWeatherMap API key:
     ```
     VITE_WEATHER_API_KEY=your_api_key_here
     ```
   - Get your API key from [OpenWeatherMap](https://openweathermap.org/api)

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

## API Integration

The application integrates with the OpenWeatherMap API to provide:
- Current weather conditions
- Temperature (in Celsius)
- Humidity percentage
- Wind speed (converted to mph)
- Weather description and icons
- "Feels like" temperature

## Project Structure

```
src/
├── components/          # React components
│   ├── ui/             # Reusable UI components (Radix UI)
│   ├── LandingPage.tsx # Landing page with search
│   ├── WeatherDashboard.tsx # Main weather display
│   ├── WeatherCard.tsx # Weather information card
│   └── SearchResult.tsx # Search results display
├── services/           # API services
│   └── weatherService.ts # OpenWeatherMap API integration
├── types/              # TypeScript type definitions
│   └── weather.ts      # Weather data interfaces
├── styles/             # Global styles
└── App.tsx            # Main application component
```

## Technologies Used

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Accessible UI components
- **Lucide React** - Icon library
- **OpenWeatherMap API** - Weather data

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.
  