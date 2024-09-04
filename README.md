https://roadmap.sh/projects/todo-list-api

---

# To-do API

This is a RESTful API for managing to-do tasks. The API allows users to create, update, delete, and retrieve tasks with different statuses such as "todo," "in-progress," and "done."

## Features

- **Add a Task:** Create a new task with a description and status.
- **Update a Task:** Modify task details.
- **Delete a Task:** Remove a task by ID.
- **List Tasks:** Retrieve all tasks or filter by status.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/DoganayBalaban/todoapi.git
   ```
2. Install dependencies:
   ```bash
   cd todoapi
   npm install
   ```

3. Run the server:
   ```bash
   npm start
   ```

## API Endpoints

### Add a Task
- **URL:** `/todos`
- **Method:** `POST`
- **Body:**
  ```json
  {
     "title":"Todos1",
    "description": "Buy groceries",
  }
  ```
- **Response:**
  ```json
  {
    "id": "1",
     "title":"Todos1",
    "description": "Buy groceries",
    "createdAt": "2024-09-03T10:00:00.000Z",
    "updatedAt": "2024-09-03T10:00:00.000Z"
  }
  ```

### Update a Task
- **URL:** `/todos/:id`
- **Method:** `PUT`
- **Body:**
  ```json
  {
    "title":"Todos1",
    "description": "Buy groceries and cook dinner",
  }
  ```

### Delete a Task
- **URL:** `/todos/:id`
- **Method:** `DELETE`

### List All Tasks
- **URL:** `/todos`
- **Method:** `GET`


## Dependencies

- **Express.js:** Web framework for Node.js.
- **Mongoose:** MongoDB object modeling tool.
- **Body-parser:** Middleware to parse incoming request bodies.

## Contributing

Feel free to fork this repository, submit issues, or create pull requests. Contributions are welcome!
