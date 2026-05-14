import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft, Send } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { submitApplication } from '../api/applicationApi';
import ApplicationFormFields, { emptyApplication } from '../components/ApplicationFormFields';
import Navbar from '../components/Navbar';
import PageContainer from '../components/PageContainer';
import { HostelApplicationPayload } from '../types/application';

export const applicationSchema = z.object({
  studentName: z.string().min(1, 'Student name is required'),
  parentName: z.string().min(1, 'Parent name is required'),
  parentContactNo: z.string().regex(/^\d{10}$/, 'Parent contact number must be exactly 10 digits'),
  dateOfJoining: z.string().min(1, 'Date of joining is required'),
  dateOfBirth: z.string().min(1, 'Date of birth is required').refine((date) => new Date(date) <= new Date(), 'Date of birth cannot be in the future'),
  gender: z.enum(['MALE', 'FEMALE', 'OTHER']),
  course: z.string().min(1, 'Course is required'),
  registerNumber: z.string().min(1, 'Register number is required'),
  studentMobileNo: z.string().regex(/^\d{10}$/, 'Student mobile number must be exactly 10 digits'),
  residenceAddress: z.string().min(1, 'Residence address is required'),
  permanentAddress: z.string().min(1, 'Permanent address is required'),
  localGuardianName: z.string().min(1, 'Local guardian name is required'),
  localGuardianContactNo: z.string().regex(/^\d{10}$/, 'Local guardian contact number must be exactly 10 digits'),
  localGuardianAddress: z.string().min(1, 'Local guardian address is required'),
  hostelName: z.string().min(1, 'Hostel name is required'),
  floorNo: z.string().min(1, 'Floor number is required'),
  roomNo: z.string().min(1, 'Room number is required'),
  bedNo: z.string().optional(),
  wardenName: z.string().min(1, 'Warden name is required'),
  wardenContactNo: z.string().optional().refine((value) => !value || /^\d{10}$/.test(value), 'Warden contact number must be exactly 10 digits'),
});

export default function StudentApplicationForm() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<HostelApplicationPayload>({
    resolver: zodResolver(applicationSchema),
    defaultValues: emptyApplication,
  });

  const onSubmit = async (payload: HostelApplicationPayload) => {
    setLoading(true);
    try {
      const saved = await submitApplication(payload);
      toast.success('Hostel details saved successfully');
      navigate('/success', { state: { registerNumber: saved.registerNumber } });
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Submission failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <PageContainer className="py-4 sm:py-8">
        <main className="mx-auto max-w-5xl">
        <Link to="/" className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-royal"><ArrowLeft className="h-4 w-4" />Back</Link>
        <form onSubmit={handleSubmit(onSubmit)} className="panel relative overflow-hidden bg-slate-50 p-4 sm:p-6 md:p-8">
          {loading && (
            <div className="absolute inset-0 z-20 flex items-center justify-center bg-white/85 px-4 backdrop-blur-sm">
              <div className="w-full max-w-sm rounded-lg border border-blue-100 bg-white p-6 text-center shadow-[0_24px_80px_rgba(15,37,68,0.18)]">
                <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-blue-100 border-t-royal" />
            <h2 className="mt-5 text-lg font-bold text-navy">Saving your details</h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">Please wait. Do not close this page or edit the form while your record is being saved.</p>
                <div className="mt-5 h-2 overflow-hidden rounded-full bg-blue-50">
                  <div className="saving-progress h-full w-1/2 rounded-full bg-royal" />
                </div>
              </div>
            </div>
          )}
          <fieldset disabled={loading} className={loading ? 'pointer-events-none select-none opacity-60' : ''}>
          <div className="mb-6 rounded-2xl bg-gradient-to-br from-navy via-[#143a68] to-[#0b1b33] p-5 text-white sm:mb-8 sm:p-6">
            <p className="text-sm font-bold uppercase tracking-wide text-blue-100">Hostel Office Record</p>
            <h1 className="mt-2 text-2xl font-bold sm:text-3xl">Hostel Detail Submission Form</h1>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-blue-100">Fill every required field carefully. One register number can submit only one hostel details record.</p>
          </div>
          <ApplicationFormFields register={register} errors={errors} />
          <div className="mt-8 flex justify-end">
            <button className="btn-primary w-full sm:w-auto" disabled={loading}><Send className="h-4 w-4" />{loading ? 'Saving...' : 'Save Details'}</button>
          </div>
          </fieldset>
        </form>
        </main>
      </PageContainer>
    </div>
  );
}
