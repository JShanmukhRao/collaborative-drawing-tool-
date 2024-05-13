# Kill MongoDB Container and Ensure Port Availability

## 1. Ensure Port Availability
   - Ensure that the following ports are available:
     - MongoDB: Port 27017
     - Backend: Port 3000
     - Frontend: Port 4200
   - If any of these ports are in use, you may need to stop the processes using them or choose different ports for your application.


# Running the Application with Docker Compose

To run the application, follow these steps:

## 1. Navigate to Project Root Directory
   - Open your terminal or command prompt.
   - Change directory (cd) to the root directory of your project where the `docker-compose.yml` file is located.



## 2. Build and Run the Application
   - Run the following command:
     ```
     docker-compose up --build
     ```

## 3. Wait for Docker to Build and Run Containers
   - Docker Compose will read the `docker-compose.yml` file and build the necessary images.
   - It will then start the containers specified in the file.
   - Application is running on http://localhost:4200

# Project Requirements

## Functional Requirements
1. **User Registration and Login:**
   - Users should be able to register for an account.
   - Users should be able to log in using their credentials.

2. **Board Management:**
   - Users should be able to create a new board.
   - Users should be able to join existing boards.

3. **Real-time Updates:**
   - Users should be able to see real-time updates on boards.
   - Any changes made to the board should be immediately visible to all users.

4. **Database Integration:**
   - The latest state of each board should be stored in the database.

## Non-functional Requirements
1. **Security:**
   - Passwords should be securely stored in hash format to protect user data.

2. **Scalability:**
   - The application architecture should be designed to be scalable, accommodating potential growth in user base and features.

3. **Unit Testing:**
   - The application codebase should include comprehensive unit tests to ensure reliability and maintainability.
   - Unit testcases are not written because of time constrants.




## About Code
This document outlines the implementation of a backend service using the NestJS framework. The backend service incorporates various features to enhance reliability, security, and maintainability.

## Features
1. **Response Interceptor**: Before sending a response to the user, the service applies a response interceptor to adhere to REST guidelines. This interceptor adds status code, timestamp, and path information to ensure uniformity in data transmission.
   
2. **Global Exception Filter**: A global exception filter catches any unhandled errors to prevent server crashes, enhancing the robustness of the application.

3. **Guard for Controller-Level Access Control**: JWT-based guards at the controller level restrict unauthorized access to sensitive data, such as user information.

4. **Validation Pipe**: A validation pipe filters out unwanted data from incoming request payloads, ensuring only valid data is processed.

5. **DTO with Decorators**: Data Transfer Objects (DTOs) with decorators simplify request validation, enforcing rules and constraints on incoming requests.

6. **Prettier for Code Formatting**: Prettier maintains code uniformity throughout the application, ensuring consistent coding standards and formatting practices.

7. **Module Architecture**: The application follows a modular architecture to enhance maintainability, organizing code into logical modules.

8. **PM2 for Production Server**: In the production environment, the application is served using PM2, which automatically restarts the server if it crashes, ensuring high availability.

## Conclusion
These features collectively contribute to the reliability, security, and efficiency of the backend service, improving maintainability, streamlining development workflows, and enhancing the overall user experience.
