import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("tasks.db1");

const createTable = () => {
  db.transaction((tx) => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS "tasks" (
        "id" INTEGER PRIMARY KEY AUTOINCREMENT,
        "title" TEXT NOT NULL,
        "description" TEXT DEFAULT NULL,
        "finished" BOOLEAN DEFAULT 0
      );`,
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

const handleInsert = (title, description) => {
  db.transaction((tx) => {
    tx.executeSql(
      "INSERT INTO tasks (title, description) VALUES (?, ?)",
      [title, description],
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

const handleUpdate = (taskId, title, description) => {
  db.transaction((tx) => {
    tx.executeSql(
      "UPDATE tasks SET title = ?, description = ? WHERE id = ?",
      [title, description, taskId],
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

export {
  createTable,
  fetchTasks,
  handleInsert,
  handleDelete,
  handleUpdate,
  fetchTaskById,
  updateTaskFinishedStatus
};
