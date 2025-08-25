function subscribe(plan) {
  document.getElementById("confirmation").innerText = 
    `You selected the ${plan}. Please fill the form below to complete your subscription.`;
  document.getElementById("signup").scrollIntoView({behavior: "smooth"});
}

document.getElementById("subscriptionForm").addEventListener("submit", function(e) {
  e.preventDefault();
  
  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let address = document.getElementById("address").value;

  document.getElementById("confirmation").innerText = 
    `🎉 Thank you ${name}! Your subscription has been received. We'll deliver fresh veggies to ${address}.`;

  this.reset();
});
