import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Certificate = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://gozeal.onrender.com/api/certificates");
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div>
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <div className='certificate-container m-auto '>
      <div className='flex justify-between items-center'>
        <h1 className='certificate-title text-2xl mb-10 font-semibold underline'>
          Certificates
        </h1>
        <button
          className='border bg-gray-200 text-sm border p-2 rounded-md'
          onClick={() => navigate("/")}
        >
          Home
        </button>
      </div>
      {data.map((item, index) => (
        <div
          key={item._id}
          className='border border-gray-200 rounded-lg p-2 mb-2 shadow-sm hover:shadow-lg transition-shadow flex  justify-between flex-wrap'
        >
          <div className='flex items-center  gap-2 items-center'>
            <p className='w-6 h-6 flex items-center justify-center bg-blue-500 text-white rounded-full text-xs'>
              {index + 1}
            </p>
            <h3 className='text-md  text-gray-800 font-semibold '>
              {item.certificateName.charAt(0).toUpperCase() + item.certificateName.slice(1)}
            </h3>
            <p className='text-gray-600 ml-5'>{item.issuer.charAt(0).toUpperCase() + item.issuer.slice(1)}</p>
          </div>

          <a
            href={item.url}
            target='_blank'
            rel='noopener noreferrer'
            className='inline-block px-2 text-sm py-2 text-left text-blue-500 rounded hover:bg-blue-600 hover:text-white transition-colors'
            onClick={() => console.log(`Opening URL: ${item.url}`)} // Log the URL
          >
            {item.url.toLowerCase().endsWith(".pdf")
              ? "Download PDF"
              : "View Certificate"}
          </a>
        </div>
      ))}
    </div>
  );
};

export default Certificate;