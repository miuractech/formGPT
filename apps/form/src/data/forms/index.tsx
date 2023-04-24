import { Button } from '@mantine/core'
import { useNavigate } from 'react-router-dom'

export const Forms = () => {
    const navigate = useNavigate()

    return (
        <div className='max-w-5xl m-auto grid justify-center min-h-screen items-center'>
            {
                formPaths.map(item => (
                    <Button onClick={() => navigate(item.path)}>
                        {item.name}
                    </Button>
                ))
            }
        </div>
    )
}

const formNames = [
    "Login form",
    "Registration form",
    "Contact form",
    "Feedback form",
    "Newsletter subscription form",
    "RSVP form",
    "Application form",
    "Survey form",
    "Order form",
    "Payment form",
    "Donation form",
    "Request form",
    "Complaint form",
    "Job application form",
    "Scholarship application form",
    "Travel booking form",
    "Hotel booking form",
    "Rental application form",
    "Credit card application form",
    "Loan application form",
    "Employee performance evaluation form",
    "Employee leave application form",
    "Employee feedback form",
    "Employee appraisal form",
    "Customer satisfaction survey form",
    "Product review form",
    "Event registration form",
    "Event feedback form",
    "Request for quote form",
    "Contact us form",
    "Resume submission form",
    "Order cancellation form",
    "Subscription cancellation form",
    "Account creation form",
    "Password reset form",
    "Social media login form",
    "Multi-step form",
    "Quiz form",
    "Poll form",
    "Signature form",
    "Consent form",
    "Authorization form",
    "Waiver form",
    "Petition form",
    "Membership application form",
    "Health insurance enrollment form",
    "Investment account application form",
    "Legal document preparation form",
    "Product return form",
    "Warranty registration form",
    "Feedback and rating form for a product",
    "Medical history form",
    "Dietary preferences form",
    "Emergency contact information form",
    "Conference registration form",
    "Surrogate consent form",
    "Identity verification form",
    "Request for records form",
    "Volunteer application form",
    "Patient registration form",
    "Travel visa application form",
    "Scholarship submission form",
    "Online appointment booking form",
    "Referral form",
    "Disability accommodations request form",
    "Prescription renewal form",
    "Order status inquiry form",
    "Language preference form",
    "Donation matching form",
    "Job offer acceptance form",
    "Guestbook form",
    "Newsletter unsubscribe form",
    "Personal information update form",
    "Complaint escalation form",
    "Credit limit increase request form",
    "Public records request form",
    "Transfer of ownership form",
    "Legal name change form",
    "Customer dispute resolution form",
    "Budget proposal form",
    "Donation matching request form",
    "Parental consent form",
    "Emergency contact update form",
    "Benefit enrollment form",
    "Jury duty excuse form",
    "Student enrollment form",
    "Transportation request form",
    "Consumer report dispute form",
    "Social security benefits application form",
    "Tax return preparation form",
    "Public safety reporting form",
    "Graduation application form",
    "Commencement ceremony registration form",
    "Public housing application form",
    "Building permit application form",
    "Hunting or fishing license application form",
    "Business license application form",
    "Emergency preparedness survey form",
    "Water quality complaint form",
    "Website feedback form"
];

const formPaths = formNames.map((name) => ({ name: name, path: `/forms/${name.toLowerCase().replace(/ /g, "-")}` }));

