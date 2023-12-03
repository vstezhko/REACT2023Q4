export function transformImage(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = function () {
      if (typeof reader.result === 'string') {
        const base64String = reader.result;
        resolve(base64String);
      }
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
