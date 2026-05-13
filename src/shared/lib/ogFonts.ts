export async function loadOrbitronFont(siteUrl: string): Promise<ArrayBuffer> {
  const url = new URL('/fonts/Orbitron-Black.ttf', siteUrl || 'http://localhost:4321');
  const res = await fetch(url.toString());
  return res.arrayBuffer();
}
