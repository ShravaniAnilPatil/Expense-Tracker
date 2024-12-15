import React, { useState } from 'react';
import styled from 'styled-components';

const FormContainer = styled.div`
  margin-top: 20px;
  padding: 20px;
  background-color: #f4f4f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const StyledButton = styled.button`
  padding: 10px 20px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #45a049;
  }
`;

function BudgetForm() {
  const [amount, setAmount] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [showForm, setShowForm] = useState(false); 
  const [error, setError] = useState('');

  const calculateEndDate = (start) => {
    if (!start) return '';
    const date = new Date(start);
    date.setMonth(date.getMonth() + 1); 
    return date.toISOString().split('T')[0]; 
  };

  const handleStartDateChange = (e) => {
    const start = e.target.value;
    setStartDate(start);
    setEndDate(calculateEndDate(start));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!amount || !startDate) {
      setError('Please fill in all fields');
      return;
    }

    try {
      const response = await fetch('/api/setBudget', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount,
          startDate,
          endDate,
        }),
      });

      if (response.ok) {
        alert('Budget set successfully!');
      } else {
        setError('Failed to set budget');
      }
    } catch (err) {
      setError('Error setting budget');
    }
  };

  return (
    <div>
      <StyledButton onClick={() => setShowForm(!showForm)}>
        {showForm ? 'Close Budget Form' : 'Set Budget'}
      </StyledButton>

      {showForm && (
        <FormContainer>
          <h3>Set Your Monthly Budget</h3>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Amount</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
            </div>

            <div>
              <label>Start Date</label>
              <input
                type="date"
                value={startDate}
                onChange={handleStartDateChange}
                required
              />
            </div>

            <div>
              <label>End Date</label>
              <input
                type="date"
                value={endDate}
                disabled
                readOnly
              />
            </div>

            {error && <p style={{ color: 'red' }}>{error}</p>}
            <StyledButton type="submit">Set Monthly Budget</StyledButton>
          </form>
        </FormContainer>
      )}
    </div>
  );
}

export default BudgetForm;
