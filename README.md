# ChatKiya

[ChatKiya](https://github.com/nik-rawat/ChatKiya) is a real-time chat application built using React, Zustand, and Firebase. The platform allows users to communicate with others using their unique usernames, providing a simple and fast user experience for seamless messaging.

## Features

- **Real-Time Messaging**: Messages are instantly synced across users through Firebase.
- **Username-Based Communication**: Communicate with others simply by searching for their username.
- **State Management with Zustand**: Efficient global state management for a smooth user experience.
- **Firebase Integration**:
  - User authentication
  - Firestore for storing messages and user data
  - Real-time updates
- **Responsive Design**: Mobile and desktop-friendly UI.
- **Secure Authentication**: Firebase handles secure login and user verification.

## Tech Stack

- **Frontend**: 
  - React (UI library)
  - Zustand (state management)
  
- **Backend**: 
  - Firebase (for authentication and real-time database)

## Setup & Installation

### Prerequisites

- Node.js (version 14 or higher)
- Firebase account

### Installation Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/nik-rawat/ChatKiya.git
   cd ChatKiya
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up Firebase:

   - Go to [Firebase Console](https://console.firebase.google.com/), create a new project.
   - Enable **Firestore Database** and **Authentication** (email/password or any provider of your choice).
   - Get your Firebase configuration and replace the placeholders in `.env`:

     ```
     REACT_APP_FIREBASE_API_KEY=your_api_key
     REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
     REACT_APP_FIREBASE_PROJECT_ID=your_project_id
     REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
     REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
     REACT_APP_FIREBASE_APP_ID=your_app_id
     ```

4. Start the development server:

   ```bash
   npm start
   ```

5. Open the app in your browser:

   - Navigate to `http://localhost:3000` to use ChatKiya.

### Firebase Setup Notes

- **Authentication**: Make sure to enable email/password authentication (or any other provider) in the Firebase Console.
- **Firestore Rules**: Set up rules in Firestore to ensure only authenticated users can read/write data.

## Project Structure

```bash
├── public/                # Static assets
├── src/                   # Source files
│   ├── components/        # React components
│   ├── store/             # Zustand store
│   ├── firebase.js        # Firebase configuration
│   ├── App.js             # Main app component
│   └── index.js           # Entry point
├── .env                   # Environment variables for Firebase
└── README.md              # Project documentation
```

## Contributing

Contributions are welcome! Feel free to fork the repository, create a new branch, and submit a pull request. Please open an issue first to discuss any major changes.

## License

This project is licensed under the MIT License. See the `LICENSE` file for more details.
