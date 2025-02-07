import EmailTemplate from '@/components/EmailTemplate';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {

  const body = await request.json()
  console.log(body)

  try {
    const { data, error } = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: [process.env.CONTACT_EMAIL],
      subject: 'Artfolio',
      react: EmailTemplate(body),
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json({success: true, data});
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
