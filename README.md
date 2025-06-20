# Demo App

This project is a front-end application built using React, Vite, Tailwind CSS, and TypeScript.

## Features

- **Card Component**: Displays individual card information.
- **Card List Page**: Fetches and displays a list of cards using the Card component.

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```
   cd agentAI-demo-app
   ```

3. Install dependencies:
   ```
   npm install
   ```

### Running the Application

To start the development server, run:
```
npm run dev
```
preview, run:
```
npx vite preview
```

buitd, run:
```
npm run build
```

Open your browser and navigate to `http://localhost:3000` to view the application.

### Project Structure

- `src/main.tsx`: Entry point of the application.
- `src/App.tsx`: Main application component with routing.
- `src/components/`: Contains reusable components like Card, and Loading.
- `src/pages/`: Contains page components like CardList and Detail.
- `src/services/`: API service for fetching card data.
- `src/hooks/`: Custom hooks for data fetching.
- `src/types/`: TypeScript interfaces and types.
- `src/utils/`: Mock data for initial rendering.
- `src/routes/`: Routing configuration.
- `src/styles/`: Global styles and Tailwind CSS imports.

### License

This project is licensed under the MIT License.
