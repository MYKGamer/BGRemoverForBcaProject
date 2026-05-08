# DATABASE DESIGN

The project uses a **relational database structure (PostgreSQL)** managed via Supabase. Three core tables handle all user data, image history, and payment transactions.

---

**Entity Relationship (ER) Diagram:**

*(Student Note: Draw this ER diagram using MS Word Shapes, Lucidchart, or draw.io and insert it here as an image. The diagram must show the following relationships:)*

```
+------------------+        +--------------------+
|   users_data     |        |      history       |
|------------------|        |--------------------|
| id (PK, UUID)    |──────< | id (PK, UUID)      |
| email (TEXT)     |        | user_id (FK, UUID) |
| credits (INT)    |        | title (TEXT)       |
| created_at       |        | original_img_url   |
+------------------+        | transparent_url    |
         |                  | created_at         |
         |                  +--------------------+
         |
         |          +----------------------+
         |          |      payments        |
         |          |----------------------|
         └────────< | id (PK, UUID)        |
                    | user_id (FK, UUID)   |
                    | razorpay_order_id    |
                    | amount (INT)         |
                    | credits_added (INT)  |
                    | status (TEXT)        |
                    +----------------------+
```

**Relationships:**
*   One `users_data` record has many `history` records (One-to-Many).
*   One `users_data` record has many `payments` records (One-to-Many).
*   `history.user_id` and `payments.user_id` are Foreign Keys referencing `users_data.id`.

---


### Data Dictionary (Table Structures)

A Data Dictionary provides a detailed breakdown of the schema used in our PostgreSQL database.

#### 1. Table: `users_data` (Handles user identity and credit balances)
| Column Name | Data Type | Key/Constraint | Description |
| :--- | :--- | :--- | :--- |
| `id` | UUID | Primary Key | Unique identifier linked to Supabase Auth |
| `email` | Text | Not Null | User's registered email address |
| `credits` | Integer | Default 6 | Balance for AI processing |
| `created_at` | Timestamptz | Default NOW()| Timestamp of account creation |

#### 2. Table: `history` (Stores image generation records)
| Column Name | Data Type | Key/Constraint | Description |
| :--- | :--- | :--- | :--- |
| `id` | UUID | Primary Key | Unique ID for the history record |
| `user_id` | UUID | Foreign Key | References `users_data(id)` |
| `title` | Text | Default 'Untitled' | Name of the uploaded file |
| `original_image_url`| Text | Not Null | Cloud link to the original image |
| `transparent_image_url`| Text | Not Null | Cloud link to the processed image |
| `created_at` | Timestamptz | Default NOW()| Timestamp of processing |

#### 3. Table: `payments` (Logs Razorpay transactions)
| Column Name | Data Type | Key/Constraint | Description |
| :--- | :--- | :--- | :--- |
| `id` | UUID | Primary Key | Unique transaction ID |
| `user_id` | UUID | Foreign Key | References `users_data(id)` |
| `razorpay_order_id`| Text | Unique, Not Null| Order ID from Razorpay API |
| `amount` | Integer | Not Null | Transaction amount |
| `credits_added` | Integer | Not Null | Number of credits purchased |
| `status` | Text | Default 'pending'| Payment status (success/failed) |
