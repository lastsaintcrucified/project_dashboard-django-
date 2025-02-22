Here’s the complete **README.md** for your **Project Management Dashboard**,
including both the **Frontend (Next.js)** and **Backend (Django REST
Framework)**.

---

# **Project Management Dashboard**

A simple project management tool built using **Next.js (frontend)** and **Django
REST framework (backend)**.  
This application allows users to create, assign, and manage projects with
role-based access control.

---

## **🚀 Tech Stack**

### **Frontend**

- **Next.js** (React framework)
- **Tailwind CSS** (Styling)
- **ShadCN UI** (Pre-built components)
- **Recharts** (Data visualization)

### **Backend**

- **Django REST Framework** (API development)
- **PostgreSQL** (Database)
- **JWT Authentication** (Secure login)
- **CORS Headers** (To allow frontend-backend communication)

---

# **📥 Installation & Setup**

## **Frontend Setup (Next.js)**

### **1️⃣ Clone the Repository**

```sh
git clone https://github.com/lastsaintcrucified/project_dashboard-django-.git
cd project-management-dashboard/frontend
```

### **2️⃣ Install Dependencies**

```sh
npm install
```

### **3️⃣ Next step**

### **4️⃣ Run the Development Server**

```sh
npm run dev
```

The frontend will be available at **`http://localhost:3000`**.

---

## **Backend Setup (Django REST Framework)**

### **1️⃣ Navigate to the Backend Directory**

```sh
cd ../
```

### **2️⃣ Create a Virtual Environment (Optional but Recommended)**

```sh
python -m venv venv
source venv/bin/activate  # On macOS/Linux
venv\Scripts\activate  # On Windows
```

### **3️⃣ Install Dependencies**

```sh
pip install django djangorestframework djangorestframework-simplejwt psycopg2-binary drf-spectacular

# Start the project and app
django-admin startproject backend
cd backend
```

Create a `.env` file and add:

```
DB_NAME=project_db
DB_USER=project_user
DB_PASSWORD=securepassword
DB_HOST=localhost
DB_PORT=5432
SECRET_KEY=your_secret_key_here
DEBUG=True

```

### **4️⃣ Start app Projects**

```sh
django-admin startapp projects
```

### **5️⃣ Apply Migrations**

```sh
python manage.py migrate
```

### **6️⃣ Create a Superuser**

```sh
python manage.py createsuperuser
```

Follow the prompts to create an admin account.

or

You can use ready made superuser(admin) and normal users account to log in

```
admin user email:   admin@gmail.com
admin password:     greenTech123

admin user email:   lastsaintcrucified@gmail.com
admin password:     alhamdulillah1

normal user email:      abcd@gmail.com
normal user password:   1qwerty1

normal user email:      example@gmail.com
normal user password:   example123456


User also can be created from http://localhost:8000/admin with role and password.
django admin email:      example@gmail.com
django admin password:   example123456
```

### **7️⃣ Run the Server**

```sh
python manage.py runserver
```

The backend will be available at **`http://localhost:8000`**.

---

# **🔑 Authentication**

- **Login**: Users log in with **email & password**.
- **JWT Authentication**: Tokens are issued upon login.
- **Role-Based Access Control**:
  - **Admin**: Can manage users and projects.
  - **Regular User**: Can view and manage assigned projects.

---

# **📌 Features**

✅ **User Authentication** (JWT-based login & role management)  
✅ **Project Management** (CRUD operations for projects)  
✅ **Project Assignment** (Admins can assign users)  
✅ **Dashboard Statistics** (Charts for project progress)  
✅ **Role-Based Access** (Different permissions for Admin/User)

---

# **🛠 API Endpoints**

```sh
swagger link http://localhost:8000/api/docs/#/api/api_projects_list
```

### **Authentication**

- `POST /api/login/` → User login (returns access & refresh token)
- `POST /api/logout/` → User logout
- `POST /api/refresh/` → Get new access token using refresh token

### **Users**

- `GET /api/users/` → Get list of users (Admin only)
- `POST /api/users/` → Create new user (Admin only)

### **Projects**

- `GET /api/projects/` → Get all projects
- `POST /api/projects/` → Create a new project
- `GET /api/projects/:id/` → Get project details
- `PUT /api/projects/:id/` → Update project
- `DELETE /api/projects/:id/` → Delete project

---

# **📌 Notes**

- **CORS is enabled** to allow frontend requests.
- **Tokens must be sent in headers** for protected routes:
  ```
  Authorization: Bearer <your-access-token>
  ```
- **Make sure PostgreSQL is running** before starting the backend.

# **📜 License**

This project is open-source .

---
