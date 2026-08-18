/**
 * GET  /api/data?code=xxx  -> { ok:true, data: {...}|null }
 * POST /api/data?code=xxx  -> body { data:{...} } -> { ok:true }
 *
 * Penyimpanan memakai Upstash Redis lewat REST API.
 * Variabel lingkungan yang dibutuhkan (otomatis terisi kalau memakai
 * integrasi "Upstash for Redis" di dashboard Vercel):
 *   KV_REST_API_URL
 *   KV_REST_API_TOKEN
 *
 * Kalau kedua variabel itu belum diisi, endpoint membalas 501 dan
 * aplikasi otomatis kembali menyimpan di perangkat masing-masing.
 */

const BASE  = process.env.KV_REST_API_URL   || process.env.UPSTASH_REDIS_REST_URL;
const TOKEN = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

const MAX_BYTES = 2 * 1024 * 1024; // 2 MB, jauh di atas kebutuhan normal

module.exports = async (req, res) => {
  res.setHeader('Cache-Control', 'no-store');

  if (!BASE || !TOKEN) {
    return res.status(501).json({ ok: false, error: 'penyimpanan_belum_dikonfigurasi' });
  }

  const code = String((req.query && req.query.code) || '').trim();
  if (!/^[a-zA-Z0-9_-]{4,40}$/.test(code)) {
    return res.status(400).json({ ok: false, error: 'kode_tidak_valid' });
  }

  const key = 'perut:' + code;
  const auth = { Authorization: 'Bearer ' + TOKEN };

  try {
    if (req.method === 'GET') {
      const r = await fetch(`${BASE}/get/${encodeURIComponent(key)}`, { headers: auth });
      if (!r.ok) throw new Error('upstream ' + r.status);
      const j = await r.json();
      let data = null;
      if (j && typeof j.result === 'string') {
        try { data = JSON.parse(j.result); } catch (e) { data = null; }
      }
      return res.status(200).json({ ok: true, data });
    }

    if (req.method === 'POST') {
      const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
      if (!body.data || typeof body.data !== 'object') {
        return res.status(400).json({ ok: false, error: 'data_kosong' });
      }
      const payload = JSON.stringify(body.data);
      if (Buffer.byteLength(payload, 'utf8') > MAX_BYTES) {
        return res.status(413).json({ ok: false, error: 'data_terlalu_besar' });
      }
      const r = await fetch(`${BASE}/set/${encodeURIComponent(key)}`, {
        method: 'POST',
        headers: { ...auth, 'Content-Type': 'text/plain' },
        body: payload
      });
      if (!r.ok) throw new Error('upstream ' + r.status);
      return res.status(200).json({ ok: true });
    }

    res.setHeader('Allow', 'GET, POST');
    return res.status(405).json({ ok: false, error: 'metode_tidak_didukung' });

  } catch (err) {
    console.error('api/data:', err);
    return res.status(500).json({ ok: false, error: 'gagal_menghubungi_penyimpanan' });
  }
};
