export default function itPage() {
  // code for the home page
  document.querySelector(
    "#root"
  ).innerHTML = ` <section class="it-page service-page" id="It" data-page>
  <div class="service_heading_and_other_services_nav flexB almost-full-width">
    <h2 class="subHeading ">IT Infrastructure and Services</h2>
    <div class="otherServicesWrapper">
     <p>Other Services</p>
     <div class="otherServices flexB">
      <a href="/Accounting-and-Bookkeeping" class="router-link">Accounting and Bookkeeping</a><a href="/Legal-Contract-Drafting" class="router-link">Legal Contract Drafting</a><a href="/Virtual-Assistants" class="router-link">Virtual Assistants</a><a href="/IT-Infrastructure-and-Services" class="router-link">IT Infrastructure and Services</a>
     </div>
   </div>
   </div>
  <div class="contents flexB">
   <img src="\IT Person.svg" alt="Accountant">
   <div class="description almost-full-width">
     <p>We provide IT services to clients who need help with various IT issues and challenges. Whether you need web development,
     software engineering, data analysis, or cybersecurity, we have the expertise and technology to help you.</p>
     <p>Our IT professionals are certified and innovative, and they use the best practices and standards to ensure quality and security.
     You can trust us to provide you with IT services that are reliable and cutting-edge.</p>

   </div>


  </div>
 </section>
`;
}
