import './App.css'
import { RiUploadCloud2Line } from "react-icons/ri"
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [submitError, setSubmitError] = useState(null);
  const [isLoading , setIsLoading] = useState(false);
  const navigate = useNavigate();

  const data = {
    certificate: "",
    issuer: "",
  }

  const validationSchema = Yup.object({
    certificate: Yup.string().required('Please enter certificate name'),
    issuer: Yup.string().required('Please enter Issuer name'),
  });

  const { values, errors, handleChange, handleSubmit, handleBlur, touched } = useFormik({
    initialValues: data,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        setIsLoading(true);
        const formData = new FormData();
        formData.append('certificateName', values.certificate);
        formData.append('issuer', values.issuer);
        if (selectedFile) {
          formData.append('url', selectedFile);
        }

        const res = await axios.post("http://localhost:5050/api/certificate", formData, {
          headers: {
            Accept: "application/json",
            'Content-Type': 'multipart/form-data'
          },
        });

          const result = res.data;
          console.log(result);
          setSubmitError(null);
          setSelectedFile(null);
          navigate("/certificate")     
         }catch (error) {
           console.log(error)
           console.error('Error submitting form:', error);
           setSubmitError(error.message || 'Failed to submit certification. Please try again.');
      } finally {
          setIsLoading(false);
      }
    }  });
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileType = file.type;
      const validTypes = ['application/pdf', 'image/jpeg', 'image/jpg'];
      
      if (!validTypes.includes(fileType)) {
        alert('Please upload only PDF or JPG files');
        e.target.value = null;
        return;
      }

      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        alert('File size should not exceed 5MB');
        e.target.value = null;
        return;
      }

      setSelectedFile(file);
      console.log(file);
    }
  }

  return (
    <>
      <div className='min-h-screen flex items-center justify-center'>
        <div className='bg-white rounded-lg shadow-md p-8 w-11/8 md:w-4/5 lg:w-2/4'>
          <div className='mb-8'>
            <h2 className='text-center text-2xl font-semibold'>
              Skills-Based Certifications
            </h2>
            <p className='text-center text-sm text-gray-500'>
              (You can add upto 5 certifications)
            </p>
          </div>
          <div>
            {submitError && (
              <p className='text-red-500 text-sm mb-4 text-center'>{submitError}</p>
            )}
            <form onSubmit={handleSubmit}>
            <div className='mb-6'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div className='mb-6'>
                  <label
                    htmlFor='certificate'
                    className='block text-sm font-medium text-gray-700 mb-2 text-left'
                  >
                    Certificate Name
                  </label>
                  <input
                    type='text'
                    className='w-full px-3 py-2 placeholder:text-xs border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500'
                    placeholder='Enter Certificate name'
                    name='certificate'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.certificate}
                  />
                  {touched.certificate && errors.certificate ? (
                    <p className='text-xs text-red-500 text-left mt-2'>{errors.certificate}</p>
                  ) : null}
                </div>
                <div className='mb-6'>
                  <label
                    htmlFor='issuer'
                    className='block text-sm font-medium text-gray-700 mb-2 text-left '
                  >
                    Issuer
                  </label>
                  <input
                    type='text'
                    className='w-full px-3 py-2 border border-gray-300 placeholder:text-xs rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500'
                    placeholder='Enter Certificate name'
                    name='issuer'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.issuer}
                  />
                  {touched.issuer && errors.issuer ? (
                    <p className='text-xs text-red-500 text-left mt-2'>{errors.issuer}</p>
                  ) : null}
                </div>
              </div>
            </div>

            <div className='mb-6'>
              <div className='grid grid-cols-1 md:grid-cols-2 items-center gap-4 border border-gray-300 rounded-md p-4'>
                <p className='text-xs'>
                  {selectedFile ? selectedFile.name : 'Upload a file showing your certification'}
                </p>
                <input
                  type="file"
                  accept=".pdf,.jpg,.jpeg"
                  onChange={(e) => handleFileUpload(e)}
                  id="fileUpload"
                  className="hidden"
                />
                <label htmlFor="fileUpload" className='bg-purple-600 hover:bg-purple-800 text-white px-4 py-2 rounded-md flex items-center gap-2 justify-center cursor-pointer'>
                  <span className='text-xs'>Upload PDF</span>
                  <RiUploadCloud2Line className='' />
                </label>
              </div>
              <p className='text-gray-500 text-sm mt-2'>
                (File Format should be only pdf and jpg)
              </p>
            </div>

            <button
              disabled={!selectedFile || isLoading}
              className={`text-xs px-6 py-2 rounded-md float-right ${!selectedFile ? 'bg-gray-400 cursor-not-allowed' : 'bg-purple-600 hover:bg-purple-700'} text-white flex items-center gap-2`}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  SAVING...
                </>
              ) : (
                'SAVE CERTIFICATION'
              )}
            </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
export default App