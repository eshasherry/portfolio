# Portfolio Website

A minimalist portfolio website built with React and Vite.

## Getting Started

### Running Locally

1. Install dependencies:
   ```
   npm install
   ```

2. Start the development server:
   ```
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```
npm run build
```

The built files will be in the `dist` directory.

## Docker

This project includes Docker configuration for easy deployment.

### Building the Docker Image

```
docker build -t portfolio-website .
```

### Running with Docker

```
docker run -p 5173:5173 portfolio-website
```

### Using Docker Compose

```
docker-compose up -d
```

This will build the image if it doesn't exist and start the container. The website will be available at http://localhost:5173.

## Customization

- Update your profile information in `src/App.jsx`
- Replace the placeholder image with your own in the `public` folder
- Modify the CSS styles in `src/App.css`
- Add or remove projects in the `projects` array in `src/App.jsx`

## Technologies Used

- React
- Vite
- CSS3
- Docker
- Nginx (for production deployment)