CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL
);

CREATE TABLE tickets (
    id SERIAL PRIMARY KEY,
    header VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    completed BOOLEAN DEFAULT false,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
);