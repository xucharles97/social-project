
# Social App

### Disclaimer

This is a social media website for users to upload and share photos, similar to Instagram, created as a way to practice and learn how to use the tech stack. Because it was created for educational purposes, no generative AI was used in the creation of the application.

## Tech Stack

The key components of the tech stack are:

- **Go** for backend development
- **ElasticSearch** to provide NoSQL data storage and lookup functionality
- **JSON Web Token (JWT)** for authentication handling
- **Gorilla Handler Library** for Cross-Origin Resource Sharing (CORS)
- **React.js** for frontend development
- **Postman** for backend debugging
- **Google Cloud** for hosting and deployment

### AWS Hosting

This project leveraged various Google Cloud services throughout development up to the final deployment. This includes:
- **Google Compute Engine (GCE)** for a virtual backend development environment
- **Google Cloud Storage (GCS)** for media storage
- **Google App Engine (GAE)** for deployment

Due to financial reasons, it is currently offline.

## Backend

Backend development was conducted using a **GCE Virtual Machine**, written in **GoLang**. The code for the backend can be found in the `/backend` directory.

## Frontend

The frontend was written using **React.js**, leveraging the **MaterialUI (MUI)** and **antd** libraries. The frontend code can be found in the `frontend` directory at the root of the repository.
