# aoile

[![Next.js](https://img.shields.io/badge/Next.js-15.3.2-blue)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4-blue)](https://tailwindcss.com/)


A Next.js application for creating and deploying personalized HTML pages.  This project leverages Arweave for permanent storage (though this functionality may not be fully implemented in the current version).


## Description

`aoile` is a Next.js application designed to generate and deploy custom HTML pages based on user-provided profile information.  It offers a streamlined workflow for creating static websites, potentially utilizing Arweave for permanent storage of the generated content.  The current implementation focuses on the frontend and API routes for data handling and deployment.

## Key Features

* **User Profile Creation:**  Allows users to input their profile details (name, bio, image, social links, etc.).
* **HTML Generation:** Dynamically generates HTML based on the user's profile data using a template.
* **API-driven Deployment:** Uses API routes to handle profile updates and HTML deployment.  The deployed HTML is currently written to the `/public` directory for local development.
* **Dark Mode Support:**  The application is styled with Tailwind CSS and includes built-in dark mode functionality.
* **Responsive Design:** Built with a focus on responsiveness across different screen sizes.


## Technology Stack

* **Frontend:** Next.js 15.3.2, React 19, Tailwind CSS 4, Lucide React
* **Backend (API):** Next.js API Routes
* **Styling:** Tailwind CSS, custom CSS variables for themeing
* **State Management:**  (Implicitly handled within the component structure for now; consider a more robust solution for larger projects)
* **Other Dependencies:** `axios`, `clsx`, `tailwind-merge`, `@ardrive/turbo-sdk`, `@codesandbox/sandpack-react`, `@radix-ui/react-slot`, `arweave`


## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/nikhilsinghrathore1/aoile.git
   ```
2. Navigate to the project directory:
   ```bash
   cd aoile
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## Usage

1. **Run the development server:** Follow the installation instructions above.
2. **Access the application:** Open [http://localhost:3000](http://localhost:3000) in your browser.
3. **(Future Feature):**  The application will eventually allow users to input their profile information through a form.  Currently, the provided `public/data.js` file serves as a placeholder.
4. **API Interaction:** The API routes (`/api/updatehtml`, `/api/gethtml`, `/api/deploy`) handle the update and deployment of the HTML.  These routes are currently designed for local file system operations; integration with Arweave would require further development.


## API Documentation

**`/api/updatehtml` (POST):**

This endpoint updates the HTML file with new profile data.

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

**`/api/gethtml` (GET):**

This endpoint retrieves the generated HTML content.

* **Response:** Returns the HTML content as text/html.

**`/api/deploy` (POST):**

This endpoint takes HTML as input and writes it to the `deploy` directory.

* **Request Body (JSON):**
  ```json
  {
    "html": "<your html>"
  }
  ```

* **Response (JSON):**
  ```json
  {
    "message": "File written successfully!"
  }
  ```

**Note:**  These API endpoints currently write to the local file system.  Integration with Arweave will require additional configuration and code.


## Contributing

Contributions are welcome! Please open an issue or submit a pull request.


## License

(Add license information here if applicable.  No license information was found in the provided files.)


## Future Work

* **Arweave Integration:** Implement permanent storage of generated HTML on Arweave.
* **User Interface Enhancements:**  Create a user-friendly interface for profile input and management.
* **Error Handling:** Improve error handling and user feedback.
* **Testing:** Add unit and integration tests.
* **Deployment:** Set up a production deployment environment.


This README provides a starting point.  As the project evolves, this document will be updated to reflect the changes and added functionalities.
