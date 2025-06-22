export function openDb() {
  return new Promise((res, rej) => {
    const request = indexedDB.open("products", 1);

    request.onupgradeneeded = () => {
      const db = request.result;
      console.log("db from onupgradeneeded", db);
      if (!db.objectStoreNames.contains("products")) {
        db.createObjectStore("products", {
          keyPath: "id",
          autoIncrement: true,
        });
      }
    };
    request.onsuccess = () => {
      res(request.result);
    };

    request.onerror = () => {
      rej(request.error);
    };
  });
}

export async function saveFormData(data) {
  const db = await openDb();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(["products"], "readwrite");
    const store = transaction.objectStore("products");

    const request = store.add({ ...data, createdAt: new Date() });

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onerror = () => {
      reject(request.error);
    };
  });
}

export async function getProducts() {
  const db = await openDb();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(["products"], "readonly");
    const store = transaction.objectStore("products");

    const request = store.getAll();

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onerror = () => {
      reject(request.error);
    };
  });
}

export async function clearDb() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.deleteDatabase("products");

    request.onsuccess = () => {
      console.log("Database deleted successfully.");
      resolve(true);
    };

    request.onerror = () => {
      console.error("Failed to delete database.");
      reject(request.error);
    };

    request.onblocked = () => {
      console.warn("Database deletion blocked — close other tabs using it.");
    };
  });
}
