import feedbackModal from '../../templates/feedback-modal.hbs';
import localFeedbackModal from '../localization/localFeedbackModal.json';
import { lang } from '../history/mainHistory';

function renderFeedback() {
  const markup = feedbackModal(localFeedbackModal[lang.name]);
  return markup;
}

export { renderFeedback };
