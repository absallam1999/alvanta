import { config } from '../config/env';

const submitForm = async (formData, formType) => {
  return new Promise((resolve, reject) => {
    try {
      const form = document.createElement('form');
      form.method = 'POST';
      form.action = config.AppScript;
      form.target = 'hidden_iframe';
      form.style.display = 'none';

      // Add formType to data
      const fields = { formType, ...formData };

      Object.keys(fields).forEach((key) => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = key;
        input.value = fields[key] || '';
        form.appendChild(input);
      });

      let iframe = document.getElementById('hidden_iframe');
      if (!iframe) {
        iframe = document.createElement('iframe');
        iframe.name = 'hidden_iframe';
        iframe.id = 'hidden_iframe';
        iframe.style.display = 'none';
        document.body.appendChild(iframe);
      }

      document.body.appendChild(form);
      form.submit();
      document.body.removeChild(form);

      // Assume success after delay
      setTimeout(() => resolve({ success: true }), 1000);
    } catch (error) {
      reject(error);
    }
  });
};

export default submitForm;
