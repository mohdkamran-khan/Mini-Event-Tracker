# Mini Event Tracker

A simple, clean & responsive event tracker built with the **MERN** stack.  
Allows users to create, view, update, delete and search events. Has basic user authentication.

---

## 🧰 Features

- Add new events (title, description, location, category, date)  
- View all events
- Events sorted by date
- Update or delete events  
- Search/filter events by title, description.  
- User authentication (login / register)  
- Responsive UI
  
---

## 📸 Screenshots

- Home:
<img width="2580" height="1898" alt="localhost_5173_ (3)" src="https://github.com/user-attachments/assets/bdb657e2-8716-4431-a4cf-967a5a1886a9" />

---

- Login:
<img width="2260" height="1896" alt="localhost_5173_login" src="https://github.com/user-attachments/assets/cabaebf3-af6a-427b-82e4-17b7709a8c31" />

---

- Register:
<img width="2260" height="1896" alt="localhost_5173_login (1)" src="https://github.com/user-attachments/assets/18aba2a7-fb5b-43fc-b19d-354558165415" />

---

- Add Event:
<img width="2260" height="1896" alt="localhost_5173_login (2)" src="https://github.com/user-attachments/assets/813f5291-8175-44df-b92c-e1ed8cbfd1e8" />

---

- View Event:
<img width="2260" height="1930" alt="localhost_5173_login (3)" src="https://github.com/user-attachments/assets/de3a2275-f6b6-4d02-83b9-b6144184e771" />

---

- Edit Event:
<img width="2880" height="2372" alt="localhost_5173_ (2)" src="https://github.com/user-attachments/assets/901ed9dc-c7c2-4866-b820-5c737770d041" />

---

- Search Events:
<img width="2580" height="1898" alt="localhost_5173_ (3)" src="https://github.com/user-attachments/assets/a311f262-da7f-42b5-9e7f-cf8e82583d1e" />

---

## 🚀 Tech Stack

- **Frontend**: React (with Formik & Yup), React Router  
- **Backend**: Node.js, Express  
- **Database**: MongoDB (via Mongoose)  
- **State / Context**: React Context API  
- **Styling**: Tailwind CSS (and CSS / Icons)  
- **Authentication**: Basic (login/register) using user IDs as tokens 
- **Dev tools**: Axios for HTTP requests, React Toastify for notifications  

---

## 🔧 Setup Instructions

Follow these steps to get the project running locally:

## Prerequisites

- Node.js & npm installed  
- MongoDB running (local or remote)  
- Git installed  
- Any IED like VS Code

### Clone & Setup

1. Clone the repository  
   ```bash
   git clone https://github.com/mohdkamran-khan/Mini-Event-Tracker.git
   
2. Change directory to project
cd Mini-Event-Tracker

3. Install backend dependencies
cd BACKEND
npm install

4. Create a .env file in BACKEND:
PORT=4500
MONGO_URI=your_mongodb_connection_string

5. Start backend server
npm run dev

6. In a new terminal, install frontend dependencies
cd ../FRONTEND
npm install

7. Start frontend
npm start
This should open your React app in browser (usually at http://localhost:5173).

--- 

## 💻 Use the app:

Register a new user

Login

Add, update, delete events

View your events

---

## ⚠️ Trade-offs & Future Improvements

-	Using user ID as token via custom headers
-	Dates stored as strings
- Basic form / field validation (Yup)	

---

## 📦 License & Contributing
You are free to use, modify, and distribute it for personal or educational use.

---

## 📝 Contact

Portfolio: https://mohdkamran-khan.github.io/KAMRAN-portfolio/

GitHub: [mohdkamran-khan](https://github.com/mohdkamran-khan)

---

💡 If you like my work, please ⭐ this repo. Your support inspires me to build more projects! 🚀
