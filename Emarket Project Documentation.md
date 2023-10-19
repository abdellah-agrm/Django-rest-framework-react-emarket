# Emarket Project Documentation

Welcome to the Emarket project! This documentation will guide you through the setup and usage of our e-commerce platform.

## Getting Started

Follow these steps to get the project up and running on your local machine:

1. **Clone the Repository:** 
   ```bash
   git clone https://github.com/TheAdmi/Emarket.git
   cd emarket
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Set Up the Backend:**
   - Ensure you have Python and Django installed.
   - Navigate to the `backend` directory and create a virtual environment:
     ```bash
     cd backend
     python -m venv venv
     ```
   - Activate the virtual environment:
     - On Windows:
       ```bash
       venv\Scripts\activate
       ```
     - On macOS and Linux:
       ```bash
       source venv/bin/activate
       ```
   - Install Python dependencies:
     ```bash
     pip install -r requirements.txt
     ```
   - Migrate the database and run the backend server:
     ```bash
     python manage.py migrate
     python manage.py runserver
     ```

4. **Set Up the Frontend:**
   - In the root directory of the project, start the React development server:
     ```bash
     npm start
     ```

5. **Access the Application:**
   - Open your web browser and go to (http://localhost:2000/register) to access the Emarket application.

## Usage

- **User Registration/Login:**
  - Register a new user account or log in with existing credentials.
  
- **Profile:**
  - View and edit your user profile information, including username, email, and password.

- **Product Listing:**
  - Browse and search for products.
  - Add new products.

- **Product Details:**
  - View product details, reviews, and ratings.
  - Add, edit, or delete reviews (if you're the author).
  - Update or delete products (if you're the owner).

- **Navigation:**
  - Use the navigation bar to switch between different sections of the application.

## Acknowledgments

- Special thanks to all contributors and open-source libraries that made this project possible.

Thank you for using Emarket! If you have any questions or issues, please feel free to open an [issue](https://github.com/TheAdmi/Emarket/issues) on GitHub.
```
