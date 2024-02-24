export default function accountantPage() {
  // code for the home page
  document.querySelector("#root").innerHTML = `
 <section class="accountant-page service-page " id="Accountancy" data-page >
  <div class="service_heading_and_other_services_nav flexB almost-full-width">
   <h2 class="subHeading ">Accounting and Bookkeeping</h2>
   <div class="otherServicesWrapper">
    <p>Other Services</p>
    <div class="otherServices flexB">
      <a href="/Accounting-and-Bookkeeping" class="router-link">Accounting and Bookkeeping</a><a href="/Legal-Contract-Drafting" class="router-link">Legal Contract Drafting</a><a href="/Virtual-Assistants" class="router-link">Virtual Assistants</a><a href="/IT-Infrastructure-and-Services" class="router-link">IT Infrastructure and Services</a>
     </div>
  </div>
  </div>

  <div class="contents flexB">
   <img src="\Accountant Person.svg" alt="Accountant">
   <div class="description almost-full-width">
     <!--
     <p>We offer a range of accountancy services to help you manage your finances and tax obligations. Whether you need bookkeeping, payroll, auditing, or tax preparation,
     we have the expertise and experience to handle it for you. Our accountants are certified and reliable, and they use the latest software and tools to ensure accuracy and efficiency.
     You can trust us to handle your accountancy needs with professionalism and care.</p>
     -->
     <p>Our accounting and bookkeeping services are designed to handle all aspects of your financial management needs, from daily transactions to financial reporting and analysis.
     We employ the latest software tools and methodologies to ensure your financial data is accurate, up-to-date, and compliant with relevant standards.</p>
     <h4>Services Include:</h4>
     <br>
     <ul>
       <li>Daily transaction processing</li>
       <li>Payroll processing</li>
       <li>Financial statement preparation (monthly, quarterly, and annual)</li>
       <li>Cash flow forecasting</li>
       <li>Budgeting and financial planning</li>
       <li>Compliance and tax filing support</li>
     </ul>
     <br><br>
     <h4>Benefits:</h4>
     <br>
     <ul>
       <li>Cost savings on internal accounting departments</li>
       <li>Access to specialized expertise</li>
       <li>Enhanced financial accuracy and compliance</li>
       <li>Timely insights into your financial health</li>
     </ul>
     <br><br>

   </div>


  </div>
 </section>`;
}
