# aoile

[![Next.js](https://img.shields.io/badge/Next.js-15.3.2-blue)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4-blue)](https://tailwindcss.com/)


A Next.js application for creating and deploying personalized HTML pages.  This project is designed to leverage Arweave for permanent storage, although this functionality is not yet fully implemented.

## Description

`aoile` is a Next.js application designed to generate and deploy custom HTML pages based on user-provided profile information. It offers a streamlined workflow for creating static websites, with the future goal of utilizing Arweave for permanent content storage. The current implementation focuses on the frontend and API routes for data handling and local deployment.

## Key Features

* **User Profile Creation (Planned):**  Will allow users to input their profile details (name, bio, image, social links, etc.).  Currently, a placeholder data file is used.
* **Dynamic HTML Generation:** Generates HTML dynamically based on user profile data using a template.
* **API-driven Deployment:** Uses API routes to handle profile updates and HTML deployment.  Currently, the deployed HTML is written to the `/public` directory for local development.  Arweave integration is planned for future development.
* **Dark Mode Support:**  The application is styled with Tailwind CSS and includes built-in dark mode functionality.
* **Responsive Design:** Built with a focus on responsiveness across different screen sizes.

## Technology Stack

* **Frontend:** Next.js 15.3.2, React 19, Tailwind CSS 4, Lucide React
* **Backend (API):** Next.js API Routes
* **Styling:** Tailwind CSS, custom CSS variables for theming
* **State Management:** Implicitly handled within the component structure.  A more robust solution will be considered for future expansion.
* **Other Dependencies:** `axios`, `clsx`, `tailwind-merge`, `@ardrive/turbo-sdk`, `@codesandbox/sandpack-react`, `@radix-ui/react-slot`, `arweave`


## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/nikhilsinghrathore1/aoile.git
   ```
2. **Navigate to the project directory:**
   ```bash
   cd aoile
   ```
3. **Install dependencies:**
   ```bash
   npm install
   ```
4. **Start the development server:**
   ```bash
   npm run dev
   ```

## Usage

1. **Run the development server:** Follow the installation instructions above.
2. **Access the application:** Open [http://localhost:3000](http://localhost:3000) in your browser.  Currently, the application displays placeholder content from `public/data.js`.
3. **API Interaction:** The API routes described below handle profile updates and HTML deployment.  These routes are currently designed for local file system operations.

## API Documentation

The API uses the following endpoints:

**`/api/updatehtml` (POST):** Updates the HTML file with new profile data.

* **Request Body (JSON):**
  ```json
  {
    "userName": "Your Name",
    "profileImg": "Your Profile Image URL",
    "discription": "Your Description",
    "repos": "Number of Repositories"
  }
  ```

* **Response (JSON):**
  ```json
  {
    "message": "Profile updated successfully"
  }
  ```

**`/api/gethtml` (GET):** Retrieves the generated HTML content.

* **Response:** Returns the HTML content as `text/html`.

**`/api/deploy` (POST):**  (Not currently implemented in the provided code) This endpoint is intended to handle deployment to a server or Arweave.

**Note:** The API endpoints currently write to the local file system.  Arweave integration will be implemented in future versions.

**`/api/github/callback` (GET):** This endpoint handles the OAuth callback from GitHub.  Requires setting the `GITHUB_CLIENT_ID` and `GITHUB_CLIENT_SECRET` environment variables.


## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

(Add license information here if applicable. No license information was found in the provided files.)

## Future Work

* **Arweave Integration:** Implement permanent storage of generated HTML on Arweave.
* **User Interface Enhancements:** Create a user-friendly interface for profile input and management.
* **Error Handling:** Improve error handling and user feedback.
* **Testing:** Add unit and integration tests.
* **Deployment:** Set up a production deployment environment.


This README will be updated as the project evolves.
