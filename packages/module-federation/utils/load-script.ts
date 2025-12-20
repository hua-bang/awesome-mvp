export const createScript = (url: string) => {
  return new Promise<void>((resolve, reject) => {
    const script = document.createElement('script');
    script.src = url;
    script.onload = () => resolve();
    script.onerror = (err) => reject(err);
    document.body.appendChild(script);
    return script;
  });
}

export const loadScript = async (url: string): Promise<void> => {
  return await createScript(url);
};