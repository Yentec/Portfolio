type ContactEmailProps = {
  name: string;
  email: string;
  subject?: string;
  message: string;
  portfolioName: string;
};

export function renderContactEmail({
  name,
  email,
  subject,
  message,
  portfolioName,
}: ContactEmailProps): string {
  const date = new Date().toLocaleString("fr-FR", {
    dateStyle: "full",
    timeStyle: "short",
  });

  const replySubject = encodeURIComponent(subject ? `Re: ${subject}` : "Votre message");

  const subjectBlock = subject
    ? `<tr><td style="font-size:12px;font-weight:700;text-transform:uppercase;color:#6b7a87;padding-bottom:4px">Sujet</td></tr>
       <tr><td style="font-size:16px;padding-bottom:16px;color:#011627">${escHtml(subject)}</td></tr>`
    : "";

  return `<!DOCTYPE html>
<html lang="fr">
<body style="margin:0;padding:32px;background-color:#faf7f1;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
    <tbody><tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" role="presentation" style="background-color:#ffffff;border-radius:16px;overflow:hidden">
        <tbody>
          <tr>
            <td style="background-color:#011627;padding:32px;color:#eaf1f7">
              <h1 style="margin:0;font-size:28px;font-weight:700;color:#eaf1f7">Nouveau message</h1>
              <p style="margin-top:8px;margin-bottom:0;color:#c0cdd8">Via ${escHtml(portfolioName)}</p>
            </td>
          </tr>
          <tr>
            <td style="padding:32px">
              <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
                <tbody>
                  <tr><td style="font-size:12px;font-weight:700;text-transform:uppercase;color:#6b7a87;padding-bottom:4px">Nom</td></tr>
                  <tr><td style="font-size:16px;padding-bottom:16px;color:#011627">${escHtml(name)}</td></tr>
                  <tr><td style="font-size:12px;font-weight:700;text-transform:uppercase;color:#6b7a87;padding-bottom:4px">Email</td></tr>
                  <tr><td style="font-size:16px;padding-bottom:16px;color:#011627">
                    <a href="mailto:${escHtml(email)}" style="color:#d68800;text-decoration:none">${escHtml(email)}</a>
                  </td></tr>
                  ${subjectBlock}
                </tbody>
              </table>
              <div style="margin-top:24px;margin-bottom:12px;font-size:12px;font-weight:700;text-transform:uppercase;color:#6b7a87">Message</div>
              <div style="background-color:#f4efe5;border-left:4px solid #d68800;border-radius:8px;padding:20px">
                <p style="margin:0;white-space:pre-wrap;line-height:1.7;color:#011627">${escHtml(message)}</p>
              </div>
              <div style="margin-top:32px;text-align:center">
                <a href="mailto:${escHtml(email)}?subject=${replySubject}" style="display:inline-block;background-color:#d68800;color:#1a0f00;text-decoration:none;padding:12px 20px;border-radius:8px;font-weight:600">Répondre</a>
              </div>
            </td>
          </tr>
          <tr>
            <td style="padding:24px 32px;border-top:1px solid rgba(1,22,39,0.12);color:#6b7a87;font-size:12px">
              Reçu le ${date}
            </td>
          </tr>
        </tbody>
      </table>
    </td></tr></tbody>
  </table>
</body>
</html>`;
}

function escHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
