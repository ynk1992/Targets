export const config = {
  matcher: '/:path*',
};

export default function middleware(req) {
  const auth = req.headers.get('authorization');

  const user = process.env.SITE_USER;
  const pass = process.env.SITE_PASS;

  const expected = 'Basic ' + btoa(`${user}:${pass}`);

  if (auth === expected) {
    return;
  }

  return new Response('Autentificare necesară', {
    status: 401,
    headers: { 'WWW-Authenticate': 'Basic realm="Secure Area"' },
  });
}
