import {handleLead} from '@/lib/lead';
import {inquirySchema} from '@/lib/validations';

// Resend + the Apps Script fetch need the Node runtime.
export const runtime = 'nodejs';

export const POST = (req: Request) => handleLead('inquiry', inquirySchema, req);
