import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("tasks.db4");

const createTable = () => {
  db.transaction((tx) => {
    // Crear la tabla "tasks"
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS "tasks" (
        "id" INTEGER PRIMARY KEY AUTOINCREMENT,
        "title" TEXT NOT NULL,
        "description" TEXT DEFAULT NULL,
        "finished" BOOLEAN DEFAULT 0,
        "date" DATE DEFAULT NULL,
        "id_category" INTEGER DEFAULT NULL
      );`,
      [],
      () => {
        console.log("Tabla 'tasks' creada exitosamente");
      },
      (error) => {
        console.log("Error al crear la tabla 'tasks': ", error);
      }
    );

    // Crear la tabla "categories"
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS "categories" (
        "id" INTEGER PRIMARY KEY AUTOINCREMENT,
        "name" VARCHAR(64),
        "color" VARCHAR(64)
      );`,
      [],
      () => {
        console.log("Tabla 'categories' creada exitosamente");
      },
      (error) => {
        console.log("Error al crear la tabla 'categories': ", error);
      }
    );
  });
};

const fetchTasks = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT A.*, B.name categoryName, B.color FROM tasks A LEFT JOIN categories B ON A.id_category = B.id`,
        [],
        (_, result) => {
          const tasks = result.rows._array;
          console.log(tasks);
          resolve(tasks); // Resuelve la promesa con los datos obtenidos
        },
        (error) => {
          console.log("Error al obtener las tareas: ", error);
          reject(error); // Rechaza la promesa en caso de error
        }
      );
    });
  });
};

const fetchTaskById = (taskId) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM tasks WHERE id = ?",
        [taskId], // Pasamos el parámetro taskId como un array para prevenir SQL injection
        (_, result) => {
          const task = result.rows.item(0); // Obtenemos la primera fila del resultado como un objeto
          resolve(task); // Resuelve la promesa con la tarea obtenida
        },
        (error) => {
          console.log("Error al obtener la tarea: ", error);
          reject(error); // Rechaza la promesa en caso de error
        }
      );
    });
  });
};

const fetchTaskIfFinished = (finished) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT A.*, B.name categoryName, B.color FROM tasks A LEFT JOIN categories B ON A.id_category = B.id WHERE finished = ?",
        [finished], // Pasamos el parámetro taskId como un array para prevenir SQL injection
        (_, result) => {
          const task = result.rows._array; // Obtenemos la primera fila del resultado como un objeto
          resolve(task); // Resuelve la promesa con la tarea obtenida
        },
        (error) => {
          console.log("Error al obtener la tarea: ", error);
          reject(error); // Rechaza la promesa en caso de error
        }
      );
    });
  });
};

const handleInsert = (title, description, date, categoryId) => {
  db.transaction((tx) => {
    tx.executeSql(
      "INSERT INTO tasks (title, description, date, id_category) VALUES (?, ?, ?, ?)",
      [title, description, date, categoryId],
      () => {
        console.log("Inserción de datos exitosa");
      },
      (error) => {
        console.log("Error al insertar datos: ", error);
      }
    );
  });
};

const handleDelete = (taskId) => {
  db.transaction((tx) => {
    tx.executeSql(
      "DELETE FROM tasks WHERE id = ?",
      [taskId],
      () => {
        console.log("Eliminación de datos exitosa");
      },
      (error) => {
        console.log("Error al eliminar datos: ", error);
      }
    );
  });
};

const handleUpdate = (taskId, title, description, date, categoryId) => {
  db.transaction((tx) => {
    tx.executeSql(
      "UPDATE tasks SET title = ?, description = ?, date = ?, id_category = ? WHERE id = ?",
      [title, description, date, categoryId, taskId],
      () => {
        console.log("Actualización de datos exitosa");
      },
      (error) => {
        console.log("Error al actualizar datos: ", error);
      }
    );
  });
};

const updateTaskFinishedStatus = (taskId, finished) => {
  db.transaction((tx) => {
    tx.executeSql(
      `UPDATE tasks SET finished = ? WHERE id = ?;`,
      [finished, taskId],
      () => {
        console.log("Campo 'finished' actualizado exitosamente");
      },
      (error) => {
        console.log("Error al actualizar el campo 'finished': ", error);
      }
    );
  });
};

const getTasksByDateAsc = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT A.*, B.name categoryName, B.color FROM tasks A LEFT JOIN categories B ON A.id_category = B.id WHERE date IS NOT NULL ORDER BY date ASC",
        [],
        (tx, results) => {
          const tasks = results.rows._array;
          console.log(tasks);
          resolve(tasks);
        },
        (tx, error) => {
          reject(error);
        }
      );
    });
  });
};

const getTasksByDateDesc = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT A.*, B.name categoryName, B.color FROM tasks A LEFT JOIN categories B ON A.id_category = B.id WHERE date IS NOT NULL ORDER BY date DESC",
        [],
        (tx, results) => {
          const tasks = results.rows._array;
          resolve(tasks);
        },
        (tx, error) => {
          reject(error);
        }
      );
    });
  });
};

const fetchCategories = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM categories",
        [],
        (_, result) => {
          const category = result.rows._array;
          resolve(category); // Resuelve la promesa con los datos obtenidos
        },
        (error) => {
          console.log("Error al obtener las tareas: ", error);
          reject(error); // Rechaza la promesa en caso de error
        }
      );
    });
  });
};

const fetchCategoryById = (categoryId) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM categories WHERE id = ?",
        [categoryId], // Pasamos el parámetro taskId como un array para prevenir SQL injection
        (_, result) => {
          const category = result.rows.item(0); // Obtenemos la primera fila del resultado como un objeto
          resolve(category); // Resuelve la promesa con la tarea obtenida
        },
        (error) => {
          console.log("Error al obtener la tarea: ", error);
          reject(error); // Rechaza la promesa en caso de error
        }
      );
    });
  });
};

const insertCategory = (name, color) => {
  db.transaction((tx) => {
    tx.executeSql(
      "INSERT INTO categories (name, color) VALUES (?, ?)",
      [name, color],
      () => {
        console.log("Inserción de datos exitosa");
      },
      (error) => {
        console.log("Error al insertar datos: ", error);
      }
    );
  });
};

const deleteCategory = (categoryId) => {
  db.transaction((tx) => {
    // Elimina la categoría de la tabla de categorías
    tx.executeSql(
      "DELETE FROM categories WHERE id = ?",
      [categoryId],
      () => {
        console.log("Eliminación de categoría exitosa");

        // Actualiza el campo "id_category" de las tareas a null
        tx.executeSql(
          "UPDATE tasks SET id_category = null WHERE id_category = ?",
          [categoryId],
          () => {
            console.log("Actualización de tareas exitosa");
          },
          (error) => {
            console.log("Error al actualizar tareas: ", error);
          }
        );
      },
      (error) => {
        console.log("Error al eliminar categoría: ", error);
      }
    );
  });
};

const updateCategory = (name, color, categoryId) => {
  db.transaction((tx) => {
    tx.executeSql(
      "UPDATE categories SET name = ?, color = ? WHERE id = ?",
      [name, color, categoryId],
      () => {
        console.log("Actualización de datos exitosa");
      },
      (error) => {
        console.log("Error al actualizar datos: ", error);
      }
    );
  });
};

export {
  createTable,
  fetchTasks,
  handleInsert,
  handleDelete,
  handleUpdate,
  fetchTaskById,
  updateTaskFinishedStatus,
  fetchTaskIfFinished,
  getTasksByDateAsc,
  getTasksByDateDesc,
  fetchCategories,
  insertCategory,
  deleteCategory,
  updateCategory,
  fetchCategoryById,
};
