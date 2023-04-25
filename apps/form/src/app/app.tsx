import { Route, Routes } from "react-router-dom";
import Data1 from "../data/data1";
import Data2 from "../data/data2";
import Data3 from "../data/data3";
import Data4 from "../data/data4";
import Data5 from "../data/data5";
import Data6 from "../data/data6";
import Registration from "../data/forms/registration";
import { Forms } from "../data/forms";
import LoginForm from "../data/forms/LoginForm";
import ContactForm from "../data/forms/ContactForm";
import FeedbackForm from "../data/forms/FeedBackForm";
import NewsletterForm from "../data/forms/NewsletterForm";
import RSVPForm from "../data/forms/RsvpForm";
import ApplicationForm from "../data/forms/ApplicetionForm";
import SurveyForm from "../data/forms/Survey";
import DragAndDrop from "../data/forms/DragandDropCompo";

function App() {
  return (
    <div className='min-h-screen'>
      <Routes>
        <Route index element={<Data1 />} />
        <Route path="/data2" element={<Data2 />} />
        <Route path="/data3" element={<Data3 />} />
        <Route path="/data4" element={<Data4 />} />
        <Route path="/data5" element={<Data5 />} />
        <Route path="/data6" element={<Data6 />} />
        <Route path="/forms">
          <Route index element={<Forms />} />
          <Route path="registration-form" element={<Registration />} />
          <Route path="login-form" element={<LoginForm />} />
          <Route path="contact-form" element={<ContactForm />} />
          <Route path="feedback-form" element={<FeedbackForm />} />
          <Route path="newsletter-subscription-form" element={<NewsletterForm />} />
          <Route path="rsvp-form" element={<RSVPForm />} />
          <Route path="application-form" element={<ApplicationForm />} />
          <Route path="survey-form" element={<SurveyForm />} />
          <Route path="drag-and-drop" element={<DragAndDrop />} /> 
        </Route>
      </Routes>
    </div>
  );
}

export default App;
