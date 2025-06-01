import emailjs from '@emailjs/browser';

export const sendLabAssignment = (professor, lab) => {
  console.log("Sending Email:", professor, lab); // Add this for debugging

  return emailjs.send(
    'service_r4y54pt',
    'template_lpnn8tk',
    {
      prof_name: professor.name,
      prof_email: professor.email,
      lab_subject: lab.subject,
      lab_date: lab.date,
      lab_time: lab.session,
    },
    'F5LITDUUl41eFlAgU'
  ).then((res) => {
    console.log("✅ Email sent:", res);
    return res;
  }).catch((err) => {
    console.error("❌ EmailJS error:", err);
    throw err;
  });
};
