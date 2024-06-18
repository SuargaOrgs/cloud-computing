# Suarga Source API - Bangkit 2024

---

## Description

This is a REST API for Suarga App. It is built with Node.js, Express, and Google Cloud.

## Prerequisites

Before you begin, make sure you have the following installed on your system:

- Node.js
- npm (Node Package Manager)
- Express JS
- Google Cloud Run
- Google Cloud SQL

## Getting Started

Follow the steps below to set up your API:

1. **Clone the Repository in Google Cloud Platform**

   Start by cloning the repository:

   ```
   git clone https://github.com/SuargaOrgs/cloud-computing.git
   ```
2. **Navigate to the Project Directory**

   Change to the project directory using the following command:

   ```
   cd cloud-computing
   ```

3. **Install Dependencies**

   Install the project dependencies by running the following command:

   ```
   npm install / npm i
   ```

4. **Edit Environment Variables**

   Rename the file by deleting `.sample` in `.env.sample` file and edit a file named `.env` in the root directory of your project. This file will contain your environment-specific configurations. **Please ensure that all configurations match the ones you set up in Google Cloud SQL.**
   
5. **Start the Server**

   To start the API server, run the following command:

   ```
   npm run start
   ```

6. **Deploy in Google Clourd Run**

   To deploy the API server, run the following command:

   ```
   gcloud init
   gcloud run deploy --source . --port 3000
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>


## Libraries Used

- [Express](https://expressjs.com/) - Node.js web application framework
- [Prisma](https://www.prisma.io/) - Promise-based Node.js ORM for MySql
- [@google-cloud/storage](https://www.npmjs.com/package/@google-cloud/storage) - Google Cloud Storage client library
- [bcrypt](https://www.npmjs.com/package/bcrypt) - Library for hashing passwords
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) - Library for generating JWT
- [multer](https://www.npmjs.com/package/multer) - Middleware for handling multipart/form-data
- [dotenv](https://www.npmjs.com/package/dotenv) - Library for loading environment variables
- [cors](https://www.npmjs.com/package/cors) - Middleware for enabling CORS
- [joi](https://www.npmjs.com/package/joi) - Library for validating data


## GCP Deployment

This API is using Google Cloud Platform for deployment.

GCP Services used:

- Cloud Run
- Cloud SQL
- Cloud Storage

## API Documentation

You can find the documentation for this API [here](https://documenter.getpostman.com/view/27011664/2sA3JT3JFP).

<!-- CONTRIBUTORS -->
## Contributors

1. Reza Bagus Saputra - https://www.linkedin.com/in/rezabaguss/
2. Yohannes Hasahatan Tua Alexandro - https://www.linkedin.com/in/yohanneslex/

<p align="right">(<a href="#readme-top">back to top</a>)</p>
