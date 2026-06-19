import {revalidateTag} from 'next/cache';
import {NextResponse, type NextRequest} from 'next/server';
import {parseBody} from 'next-sanity/webhook';

// Sanity webhook → on-demand revalidation. Configure in Sanity:
//   Manage ▸ API ▸ Webhooks → URL: https://<site>/api/revalidate
//   Trigger on create/update/delete, projection: {"_type": _type}
//   Secret: same value as SANITY_REVALIDATE_SECRET.
// On publish, this busts the matching cache tag so the change is live instantly.
export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  // Hard-fail when unconfigured — never allow an unauthenticated cache purge.
  if (!secret) {
    console.error('[revalidate] SANITY_REVALIDATE_SECRET not set — refusing to revalidate.');
    return new Response('Revalidation not configured', {status: 401});
  }

  try {
    const {isValidSignature, body} = await parseBody<{_type?: string}>(req, secret);

    if (!isValidSignature) {
      return new Response('Invalid signature', {status: 401});
    }
    if (!body?._type) {
      return new Response('Missing _type in webhook body', {status: 400});
    }

    // Next 16: second arg is the cache-life profile; {expire: 0} = purge now.
    revalidateTag(body._type, {expire: 0});
    return NextResponse.json({revalidated: true, type: body._type, now: Date.now()});
  } catch (err) {
    console.error('[revalidate] webhook error', err);
    return new Response('Error revalidating', {status: 500});
  }
}
