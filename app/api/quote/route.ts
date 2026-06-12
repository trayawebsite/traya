import {handleLead} from '@/lib/lead';
import {quoteSchema} from '@/lib/validations';

// Resend + the Apps Script fetch need the Node runtime.
export const runtime = 'nodejs';

export const POST = (req: Request) => handleLead('quote', quoteSchema, req);
