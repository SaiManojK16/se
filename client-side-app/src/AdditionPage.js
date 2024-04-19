import React, { useState } from 'react';
import axios from 'axios';

const AdditionPage = () => {
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [frontendSum, setFrontendSum] = useState(null);
  const [backendSum, setBackendSum] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Calculate frontend sum
    const frontendResult = parseInt(num1) + parseInt(num2);
    setFrontendSum(frontendResult);

    try {
      // Calculate backend sum using Axios
      const response = await axios.post('http://ec2-3-22-185-134.us-east-2.compute.amazonaws.com:5000/api/calculate', {
        A: num1,
        B: num2,
      });

      const data = response.data;
      setBackendSum(data.sum);
    } catch (error) {
      console.error('Error calculating backend sum:', error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="addition-page">
        <h2 className="mb-4">Addition Page</h2>
        <form onSubmit={handleSubmit} className="form-inline">
          <div className="form-group mr-2">
            <label htmlFor="num1" className="mr-2">
              Number 1:
            </label>
            <input
              type="number"
              className="form-control"
              id="num1"
              value={num1}
              onChange={(e) => setNum1(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="num2" className="mr-2">
              Number 2:
            </label>
            <input
              type="number"
              className="form-control"
              id="num2"
              value={num2}
              onChange={(e) => setNum2(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary ml-2">
            Submit
          </button>
        </form>
        {frontendSum !== null && (
          <p className="mt-4">Frontend Sum: {frontendSum}</p>
        )}
        {backendSum !== null && <p>Backend Sum: {backendSum}</p>}
      </div>
    </div>
  );
};

export default AdditionPage;
