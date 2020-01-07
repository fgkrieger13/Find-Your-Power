import React from 'react';

// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

const AboutPage = () => (
  <div>
    <div className="about-container">
      <h1>
        About Us
      </h1>
      <h4>
        Find Your Power is a local nonprofit that advocates for women’s empowerment and works hard to provide resources and services
        to help women flourish within their communities. These resources and services currently include regular workshops, a monthly
        empowerment themed newsletter, membership and consulting services, and events throughout the year. We pride ourselves in our
        strengths as a connector and a resource curator, and the fact that we listen to what women need, and then we find the solution;
        whether resources, connections, or services.
        This tool is part of a larger Lady Boss League membership, where Find Your Power supports purpose-driven professionals through
        mentoring, promoting their events, and curating and connecting them with whatever resources or people they need.
      </h4>
      <h2>Purpose of This Website</h2>
      <h4>
        This site is a tool aimed at formalizing what we do as women naturally, connecting each other, and giving us the opportunity to
        put our money where our values are.
        The purpose of this site is to encourage business women to connect with each other across the Twin Cities metropolitan area and
        to pass on their wisdom, knowledge, and connections, because empowered women empower women.
      </h4>
      <h2>Code of Ethics</h2>
      <h4>
        At Find Your Power we stand by our values:
        <ul>
          <li>always with integrity</li>
          <li>connection focused</li>
          <li>growth-oriented</li>
          <li>authentically you</li>
          <li>positive social impact</li>
        </ul>
        And we aim to support women in their personal and professional growth and to build a community of amazing women that share these
        values with us. For this program to be successful, users need to fully participate and take responsibility for building healthy,
        well-established partnerships with others.
        In order to be a user here, we ask that you:
        <ul>
          <li>
            Value and embrace diversity, which means to respect others regardless of race, color, religion, sex, national origin, age,
            disability, sexual orientation, or political affiliation. We believe a diverse user group = a more successful and widespread
            network. And we all do well when we all do well!
          </li>
          <li>
            Treat others fairly and respectfully.
          </li>
          <li>
            Talk to any person directly if you have a disagreement, and to try to work it out so that the relationships started here stay
            strong and healthy.
          </li>
          <li>
            Show your support and your values by rewarding connections that help further your business with what we like to call
            ‘connection affection’; which just means cash money usually given through Venmo.
          </li>
        </ul>
        <h3>By signing up to use this site, I agree to all of the above.</h3>
      </h4>
      <h2>How we feel about payment:</h2>
      <h4>
        One of the best ways we can live and show our values is by being very intentional about where we spend or give our money. 
        When you are connected with someone in this network and end up doing business with them, we ask that you put your money where 
        your values are, and give an optional connection ‘gratuity’, which we like to call giving some ‘connection affection’. This is 
        basically just a thank you for making the connection, and helping you grow your business, that hopefully reflects the amount of 
        business the connection generated. No one is policing how or when this happens, it is all on the honor system, with the expectation 
        that we are all building each other up both professionally and financially.
      </h4>
    </div>
  </div>
);

export default AboutPage;
