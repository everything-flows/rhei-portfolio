export default function snakeToCamel<T>(obj: T): T {
  if (!obj || typeof obj !== "object") return obj;

  if (Array.isArray(obj)) {
    return obj.map(snakeToCamel) as unknown as T;
  }

  return Object.keys(obj).reduce((acc, key) => {
    const camelKey = key.replace(/_([a-zA-Z0-9])/g, (_, char) =>
      char.toUpperCase()
    );
    (acc as Record<string, T>)[camelKey] = snakeToCamel(
      (obj as Record<string, T>)[key]
    );
    return acc;
  }, {} as T);
}
