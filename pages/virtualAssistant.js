export default function virtualAssistantPage() {
  // code for the home page
  document.querySelector(
    "#root"
  ).innerHTML = `  <section class="va-page service-page " id="VA" data-page >
  <div class="service_heading_and_other_services_nav flexB almost-full-width">
    <h2 class="subHeading ">Virtual Assistants</h2>
    <div class="otherServicesWrapper">
     <p>Other Services</p>
     <div class="otherServices flexB">
      <a href="/Accounting-and-Bookkeeping" class="router-link">Accounting and Bookkeeping</a><a href="/Legal-Contract-Drafting" class="router-link">Legal Contract Drafting</a><a href="/Virtual-Assistants" class="router-link">Virtual Assistants</a><a href="/IT-Infrastructure-and-Services" class="router-link">IT Infrastructure and Services</a>
     </div>
   </div>
   </div>
  <div class="contents flexB">
   <img src="\VA Person.svg" alt="Accountant">
   <div class="description almost-full-width">
     <!--
     <p>We provide virtual assistant services to clients who need help with various tasks and projects. Whether you need administrative support,
     customer service, social media management, or research, we have the talent and resources to help you.
     Our virtual assistants are skilled and versatile, and they work remotely to save you time and money. You can count on us to provide you with
     virtual assistant services that are flexible and convenient.</p>
     -->
     <p>Our virtual assistant services offer flexible, on-demand support for a variety of administrative tasks.
     Whether you need help with scheduling, email management, or any other administrative burden,
     our virtual assistants are equipped to boost your productivity and streamline your operations.</p>
    <h4>Services Include:</h4>
    <br>
    <ul>
      <li>Email management and correspondence</li>
      <li>Schedule and calendar management</li>
      <li>Data entry and management</li>
      <li>Customer support and communication</li>
      <li>Research and presentation preparation</li>
    </ul>
    <br><br>
    <h4>Benefits:</h4>
    <br>
    <ul>
      <li>Increased operational efficiency</li>
      <li>Significant time savings on administrative tasks</li>
      <li>Scalable support tailored to your needs</li>
      <li>Enhanced work-life balance for your team</li>
    </ul>
    <br><br>

   </div>


  </div>
 </section>`;
}
