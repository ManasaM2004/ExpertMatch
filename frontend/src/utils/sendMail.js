import emailjs from '@emailjs/browser';

export const sendLabAssignment = (professor, lab) => {
  // ✅ Your actual EmailJS template ID
    const templateParams = {
      prof_name: professor.name,
      email: professor.email,
      lab_subject: lab.subject,
      lab_date: lab.date,
      lab_time: lab.session,
    };
    return emailjs.send('service_r4y54pt', 'template_lpnn8tk', templateParams, 'F5LlTDUUl41eFlAgU');
};