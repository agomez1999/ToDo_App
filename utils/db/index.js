import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("tasks.db2");

const createTable = () => {
  db.transaction((tx) => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS "tasks" (
        "id" INTEGER PRIMARY KEY AUTOINCREMENT,
        "title" TEXT NOT NULL,
        "description" TEXT DEFAULT NULL,
        "finished" BOOLEAN DEFAULT 0,
        "date" DATE DEFAULT NULL
      );
      `,
      [],
      () => {
        console.log("Tabla creada exitosamente");
      },
      (error) => {
        console.log("Error al crear la tabla: ", error);
      }
    );
  });
};

const fetchTasks = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM tasks",
        [],
        (_, result) => {
          const tasks = result.rows._array;
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
        "SELECT * FROM tasks WHERE finished = ?",
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

const handleInsert = (title, description, date) => {
  db.transaction((tx) => {
    tx.executeSql(
      "INSERT INTO tasks (title, description, date) VALUES (?, ?, ?)",
      [title, description, date],
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
  //   const taskId = 1; // ID de la tarea que se desea eliminar

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

const handleUpdate = (taskId, title, description, date) => {
  db.transaction((tx) => {
    tx.executeSql(
      "UPDATE tasks SET title = ?, description = ?, date = ? WHERE id = ?",
      [title, description, date, taskId],
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
        "SELECT * FROM tasks ORDER BY date ASC",
        [],
        (tx, results) => {
          const tasks = results.rows._array;
          console.log(tasks)
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
        "SELECT * FROM tasks ORDER BY date DESC",
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
};
