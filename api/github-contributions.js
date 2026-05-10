const USERNAME = 'AmanKumarVerma11';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const response = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${USERNAME}?y=last`,
      { headers: { 'User-Agent': 'amankrverma.in-portfolio' } }
    );

    if (!response.ok) throw new Error(`upstream ${response.status}`);

    const data = await response.json();

    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=86400');
    return res.status(200).json(data);
  } catch (err) {
    console.error('github-contributions error:', err);
    return res.status(500).json({ error: 'Failed to fetch contribution data' });
  }
}
