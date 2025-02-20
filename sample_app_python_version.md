# Django Emergency Response App

A Django-based emergency response web application that connects citizens with emergency responders and community helpers through a real-time chat interface.

## Features

- User role-based access (Citizens, Responders, Helpers)
- Real-time chat interface
- Quick-access question buttons
- Voice input support
- Message history
- User profiles
- Mobile-responsive design

## Technical Requirements

- Python 3.8+
- Django 4.2+
- Database (SQLite for development, PostgreSQL recommended for production)
- Modern web browser

## Installation

1. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install django
```

3. Clone the repository:
```bash
git clone <repository-url>
cd emergency_project
```

4. Apply migrations:
```bash
python manage.py makemigrations
python manage.py migrate
```

5. Create a superuser:
```bash
python manage.py createsuperuser
```

6. Run the development server:
