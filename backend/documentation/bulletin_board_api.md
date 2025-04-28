# Bulletin Board API Documentation

This document provides comprehensive information about the bulletin board API endpoints for integration purposes.

## Base URL

All endpoints are prefixed with: `/api/bulletin-board`

## Authentication

Currently, the API doesn't require authentication, though user identification is tracked via `user_id` parameters.

## Data Types

### Note Object

```json
{
  "id": 123,
  "content": "Note content text",
  "color": "#FEFF9C",
  "type": "sticky",
  "is_prompt": false,
  "position_x": 350,
  "position_y": 200,
  "rotation": 5,
  "z_index": 3
}
```

| Field | Type | Description |
|-------|------|-------------|
| id | number | Unique identifier for the note |
| content | string | Text content of the note |
| color | string | Color hex code (e.g. "#FEFF9C") |
| type | string | Note type ("sticky" or "poster") |
| is_prompt | boolean | Whether this is a prompt note |
| position_x | number | X coordinate position in pixels (0-1000 range converted from 0-1 in database) |
| position_y | number | Y coordinate position in pixels (0-500 range converted from 0-1 in database) |
| rotation | number | Rotation angle in degrees |
| z_index | number | Z-index for stacking order (higher numbers appear on top) |

## Endpoints

### GET /api/bulletin-board/notes

Retrieves all public notes and prompts from the bulletin board.

**Request Parameters:** None

**Response:**
- Status Code: 200 OK
- Content-Type: application/json
- Body: Array of note objects (includes both notes and prompts)

**Example Response:**
```json
[
  {
    "id": 1,
    "content": "Welcome to the Bulletin Board!",
    "color": "#FEFF9C",
    "type": "sticky",
    "is_prompt": false,
    "position_x": 100,
    "position_y": 100,
    "rotation": 0,
    "z_index": 0
  },
  {
    "id": 2,
    "content": "What's on your mind today?",
    "color": "#FFFFF3",
    "type": "sticky",
    "is_prompt": true,
    "position_x": 50,
    "position_y": 100,
    "rotation": 0,
    "z_index": 5
  }
]
```

**Implementation Details:**
- This endpoint filters for non-expired notes (`Note.expires_at > datetime.utcnow()`)
- The response includes both regular notes and prompt notes
- Position values are scaled from the database's 0-1 range to pixels

### POST /api/bulletin-board/notes

Creates a new note on the bulletin board.

**Request Parameters:**
- Content-Type: application/json
- Body:

```json
{
  "content": "New note content",
  "color": "#FEFF9C",
  "user_id": "user123",
  "is_prompt": false
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| content | string | Yes | Text content of the note |
| color | string | No | Color hex code (default: "yellow") |
| user_id | string | No | User identifier (default: "anonymous") |
| is_prompt | boolean | No | Whether this is a prompt note (default: false) |

**Response:**
- Status Code: 201 Created
- Content-Type: application/json
- Body:

```json
{
  "id": 123,
  "content": "New note content",
  "status": "Note created successfully"
}
```

**Implementation Details:**
- Notes are automatically given an expiration date 24 hours after creation
- Each note is associated with a public note state by default

### PATCH /api/bulletin-board/notes/:id

Updates an existing note.

**URL Parameters:**
- id: The note ID to update

**Request Parameters:**
- Content-Type: application/json
- Body:

```json
{
  "content": "Updated content",
  "color": "#FEFF9C",
  "position_x": 200,
  "position_y": 300
}
```

All fields are optional. Only included fields will be updated.

**Response:**
- Status Code: 200 OK
- Content-Type: application/json
- Body: The updated note object

**Error Responses:**
- 404 Not Found: If the note doesn't exist

### DELETE /api/bulletin-board/notes/:id

Deletes a note from the bulletin board.

**URL Parameters:**
- id: The note ID to delete

**Response:**
- Status Code: 200 OK
- Content-Type: application/json
- Body:

```json
{
  "status": "Note deleted"
}
```

**Error Responses:**
- 404 Not Found: If the note doesn't exist

### POST /api/bulletin-board/notes/:id/save

Saves a note from the public board to a user's personal board.

**URL Parameters:**
- id: The note ID to save

**Request Parameters:**
- Content-Type: application/json
- Body:

```json
{
  "user_id": "user123",
  "position_x": 0.5,
  "position_y": 0.5
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| user_id | string | No | User identifier (default: "anonymous") |
| position_x | number | No | X coordinate position (0-1 range) (default: 0.5) |
| position_y | number | No | Y coordinate position (0-1 range) (default: 0.5) |

**Response:**
- Status Code: 200 OK
- Content-Type: application/json
- Body:

```json
{
  "status": "Note saved to personal board",
  "note_id": 123,
  "user_id": "user123"
}
```

### GET /api/bulletin-board/prompts

Retrieves only the prompt notes from the bulletin board.

**Request Parameters:** None

**Response:**
- Status Code: 200 OK
- Content-Type: application/json
- Body: Array of prompt note objects

### POST /api/bulletin-board/prompts

Creates a new prompt on the bulletin board.

**Request Parameters:**
- Content-Type: application/json
- Body:

```json
{
  "content": "New prompt content",
  "color": "#FFFFF3",
  "position_x": 100,
  "position_y": 200
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| content | string | Yes | Text content of the prompt |
| color | string | No | Color hex code (default: "#FFFFF3") |
| position_x | number | No | X coordinate position (default: 0) |
| position_y | number | No | Y coordinate position (default: 0) |

**Response:**
- Status Code: 201 Created
- Content-Type: application/json
- Body: The created prompt object

### POST /api/bulletin-board/reset

Admin function to reset the bulletin board. This will clear all notes and reset prompts to defaults.

**Request Parameters:** None

**Response:**
- Status Code: 200 OK
- Content-Type: application/json
- Body:

```json
{
  "status": "reset successful"
}
```

## Database Schema

Notes are stored in three related tables:

1. **Users** - Stores user information
2. **Notes** - Stores note content and metadata
3. **Note_States** - Stores the state of notes (public/personal/archived/trash)

Key implementation details:

- Notes expire after 24 hours by default 
- Position values are stored as floating-point numbers between 0-1 in the database and converted to pixels for the frontend
- Each note can have multiple states (e.g., it can be both on the public board and saved to personal boards)

## Integration Tips

1. When fetching notes, always handle the possibility of empty arrays
2. When displaying notes, apply proper scaling for position values
3. Remember to handle both regular notes and prompts differently in your UI
4. Use the relative URL approach with the proxy setting in package.json to avoid CORS issues
5. Notes have an expiration date, so some may not appear if they're expired

## Troubleshooting

Common issues:

1. **"Failed to load notes"**: Check if the backend server is running on port 5000 and that CORS is configured to allow requests from your frontend origin
2. **Empty board**: All notes may have expired; try adding new notes
3. **CORS errors**: Ensure your frontend is running on http://127.0.0.1:3000 which matches the backend CORS configuration
