import emailjs from '@emailjs/browser';

export const sendLabAssignment = (professor, lab) => {
  return emailjs.send(
    'service_r4y54pt', // ✅ Your actual EmailJS service ID
    'template_lpnn8tk', // ✅ Your actual EmailJS template ID
    {
      prof_name: professor.name,
      prof_email: professor.email,
      lab_subject: lab.subject,
      lab_date: lab.date,
      lab_time: lab.session,
    },
    'F5LITDUUl41eFlAgU' // ✅ Your actual EmailJS public key
  );
};