import { CheckCircle2 } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function SuccessPage() {
  const { state } = useLocation();
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="mx-auto flex max-w-3xl items-center justify-center px-4 py-16">
        <div className="panel w-full p-8 text-center">
          <CheckCircle2 className="mx-auto h-14 w-14 text-green-600" />
          <h1 className="mt-4 text-3xl font-bold text-navy">Application Submitted Successfully</h1>
          <p className="mt-3 text-slate-600">Your hostel joining application has been sent for admin review.</p>
          {state?.registerNumber && <p className="mt-4 rounded-md bg-blue-50 px-4 py-3 font-bold text-royal">Register Number: {state.registerNumber}</p>}
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link to="/apply" className="btn-primary">Submit Another Application</Link>
            <Link to="/" className="btn-secondary">Go Home</Link>
          </div>
        </div>
      </main>
    </div>
  );
}
