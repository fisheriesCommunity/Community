import React from 'react'




function Loan() {
  return (
    <div className="main-interface">
      <h1>Welcome</h1>
     
      <div className="intro-section">
        <p>
          Manage your community's loan requests with ease. This platform is designed to streamline the loan management process, giving you full control over requests, documents, and communication.
        </p>
      </div>

      <div className="benefits-section">
        <h2>What You Can Do</h2>
        <ul>
          <li>Add new loan requests quickly and easily.</li>
          <li>Update existing requests to keep information accurate.</li>
          <li>Delete requests that are no longer needed.</li>
          <li>View detailed information for each request.</li>
          <li>Send an email to the community admin with important updates.</li>
          <li>Upload and manage collateral documents securely.</li>
          <li>View uploaded documents anytime, anywhere.</li>
          <li>Send a WhatsApp message reminding about upcoming payments.</li>
        </ul>
        <p className="highlight">
          This platform empowers you to efficiently handle all aspects of loan requests, ensuring smooth and effective community management.
        </p>
      </div>
    </div>
  );
  
}

export default Loan
