import axios from 'axios';
import React, { useState } from 'react';

function WithdrawlForm() {
    const [requestType, setRequestType] = useState('');
    const [firstName, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');

    const withdrawHandler = async(e)=>{
        e.preventDefault();
        const data = {
            request:requestType,
            firstname:firstName,
            lastname:lastname,
            email:email
        }
        console.log(data);

        try {
            const responce = await axios.post('https://api.dev-v2.privasapien.com/api/v1/e55e748c-4f11-11ef-b302-f2d91815c660/consent-manager/consents/create', data)

            if(responce.ok){
                alert('success')
                console.log(responce);
                
            }
            else{
                throw new Error(responce.message || 'Failed to  withdraw');
            }
        } catch (error) {
            alert(error);
            console.log(error);
        }
        
    }

    
  return (
    <section className="container mt-5 withdraw"> 
      <div className="col-md-5 mx-auto">
        <div className="app-main p-3 p-md-5 border rounded shadow">
          <h1 className="fs-2 text-center">For Withdrawal</h1>
          <p className="fs-6 text-center">
            Privacy Notice: We value your privacy. Please provide your consent for data collection. Thank you for giving consent.
          </p>
          <br />
          <hr />
          
          <br />
          <form className='container' onSubmit={withdrawHandler}>
            <div className="row">
              <div className="col-md-12">
                <div className="form-group">
                  <label htmlFor="request" className="form-label">Type of Request <span>*</span></label>
                  <select name="request" id="request" className="form-control" onChange={(e)=>setRequestType(e.target.value)}>
                    <option value="" disabled selected>Select a request type</option>
                    <option value="sales">Sales</option>
                    <option value="marketing">Marketing</option>
                    <option value="retail">Retail</option>
                    <option value="telemarketing">Tele Marketing</option>
                    <option value="finance">Finance</option>
                  </select>
                </div>
              </div>
              
              <div className="col-md-6">
                <div className="form-group mt-3">
                  <label htmlFor="firstName" className='form-label'>First Name</label>
                  <input type="text" id="firstName" placeholder='Enter first name' className="form-control"  onChange={(e)=>setFirstname(e.target.value)}/>
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-group mt-3">
                  <label htmlFor="lastName" className='form-label'>Last Name</label>
                  <input type="text" id="lastName" placeholder='Enter last name' className="form-control" onChange={(e)=>setLastname(e.target.value)} />
                </div>
              </div>

              <div className="col-md-12">
                <div className="form-group mt-3">
                  <label htmlFor="email" className='form-label'>Email Address <span>*</span></label>
                  <input type="email" id="email" placeholder='Email address' className='form-control' required  onChange={(e)=>setEmail(e.target.value)}/>
                </div>
              </div>

              <div className="btns d-flex gap-3 mt-4 justify-content-end ">
                <button type="reset" className="btn btn-outline-dark rounded-0">Clear All</button>
                <button type="submit" className="btn btn-outline-dark rounded-0">Submit</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default WithdrawlForm;