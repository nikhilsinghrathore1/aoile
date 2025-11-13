
`aoile` (pronounced "oy-lee") is a Next.js application designed to create and deploy personalized HTML pages. Currently focused on local development and using placeholder data, it's built for future integration with Arweave for permanent content storage.  This makes it a powerful tool for generating static websites with customizable content, ideal for personal portfolios or simple landing pages.

## Description

aoile streamlines the creation of static HTML pages based on user-provided profile information.  The current version prioritizes the frontend and API routes for data handling and local deployment.  Future development will integrate Arweave for persistent, decentralized content hosting. The application uses a template located at `public/test.html` to generate the HTML pages.  This template uses a placeholder `{{PROFILE_DATA}}` which is replaced with the JSON representation of the user's profile.

## Key Features

* **Dynamic HTML Generation:** Generates HTML pages dynamically based on user-provided data using a template (`public/test.html`).
* **API-driven Data Handling:** Uses Next.js API routes to manage profile updates and HTML generation.
* **Local File System Deployment:** Currently, generated HTML is written to the `/public` directory for local development.  This will be replaced with Arweave deployment in future versions.
* **GitHub OAuth Integration (Planned):** Will allow users to authenticate with GitHub to simplify profile data input (requires setting environment variables).
* **Dark Mode Support:** Stylish and responsive design thanks to Tailwind CSS, with built-in dark mode.
* **Responsive Design:** Built with responsiveness in mind for various screen sizes.


## Technology Stack

* **Frontend Framework:** Next.js 15.3.2, React 19
* **Styling:** Tailwind CSS 4, Lucide React Icons
* **Backend (API):** Next.js API Routes
* **State Management:** Implicitly handled within components (future improvements planned).
* **Data Handling:** `axios`
* **Utility Libraries:** `clsx`, `tailwind-merge`, `dedent`
* **Arweave Integration (Planned):** `arweave`, `@ardrive/turbo-sdk`
* **Other Dependencies:** `@codesandbox/sandpack-react`, `@radix-ui/react-slot`, `class-variance-authority`


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
2. **Access the application:** Open [http://localhost:3000](http://localhost:3000) in your browser. The application currently displays placeholder content from `public/data.js`.  You'll need to interact with the API to generate a custom page.
3. **Update Profile (API):** Use a tool like Postman or `curl` to send a POST request to `/api/updatehtml` with your profile data. See the API documentation below for details.  Example using `curl`:

   ```bash
   curl -X POST -H "Content-Type: application/json" -d '{"userName": "Your Name", "profileImg": "Your Profile Image URL", "discription": "Your Description", "repos": "10"}' http://localhost:3000/api/updatehtml
   ```

4. **Retrieve Generated HTML (API):** After updating the profile, make a GET request to `/api/gethtml` to retrieve the generated HTML. Example using `curl`:

   ```bash
   curl http://localhost:3000/api/gethtml
   ```


## API Documentation

The API uses the following endpoints:

**`/api/updatehtml` (POST):** Updates the `myfile.html` file with new profile data.  This uses `public/test.html` as a template and replaces the `{{PROFILE_DATA}}` placeholder.

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

**`/api/gethtml` (GET):** Retrieves the generated HTML content from `public/myfile.html`.

* **Response:** Returns the HTML content as `text/html`.

**`/api/deploy` (POST):** (Not yet implemented) This endpoint will handle deployment to Arweave in future versions.

**`/api/github/callback` (GET):** (Not yet implemented) Handles the OAuth callback from GitHub. Requires setting the `GITHUB_CLIENT_ID` and `GITHUB_CLIENT_SECRET` environment variables.


## Contributing

Contributions are welcome! Please follow these guidelines:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and commit them with clear and concise messages.
4. Push your branch to your forked repository.
5. Create a pull request describing your changes.


## License

[Specify a license here, e.g., MIT License](https://opensource.org/licenses/MIT) (Add a LICENSE file to the repository for this section to be complete)


## Future Work

* **Arweave Integration:** Implement permanent storage of generated HTML on Arweave.
* **Improved User Interface:** Create a more user-friendly interface for profile input and management.
* **Robust Error Handling:** Enhance error handling and user feedback mechanisms.
* **Comprehensive Testing:** Add unit and integration tests for improved reliability.
* **Production Deployment:** Set up a production deployment environment.


This README will be updated as the project progresses.
