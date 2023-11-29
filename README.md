# Flipkart eCommerce Clone
- Used **Redux** store for Cart Items, **React Context API** for user account details, **React Router** to create SPA <br>
- **Search** for products listed on the website <br>
- Add, Update Quantity, Remove from Cart updating the redux store and user cart in **MongoDB** <br>
- **Password Hashing** and **Persistent login** using **JWT cookie** with HttpOnly attribute to prevent **XSS** <br>
- Integrated **Stripe Payments** and used Stripe **Webhook** to: <br>
  • empty cart and redirect to payment success page on successful payment <br>
  • redirect to payment failure on payment failure
  
**Tech Stack**:<br>
*Frontend*: React(Hooks, Context API, Router), Redux(State Management), Javascript <br>
*Backend*: Node.js, Express.js (Server), MongoDB (Database), Mongoose, Stripe (Payment Gateway)

## Live:
**Check out live webapp at: https://flipkart-clone-kydx.onrender.com/**

# Preview:
#### SignUp SignIn feature using JWT cookie with HttpOnly attribute to prevent XSS<br>
![Preview_gif](https://github.com/sarthak17jain/Flipkart_Clone/blob/main/Authentication_Authorization.gif)
<br>
#### Stripe Payments with Webhook to clear cart in case of successful payment<br>
![Preview_gif](https://github.com/sarthak17jain/Flipkart_Clone/blob/main/Payment_Feature.gif)
<br>
#### Add, Update Quantity, Remove from Cart updating the redux store and user cart in MongoDB
![Preview_gif](https://github.com/sarthak17jain/Flipkart_Clone/blob/main/Cart_Redux.gif)
<br>
#### Search Bar 
![Preview_gif](https://github.com/sarthak17jain/Flipkart_Clone/blob/main/Search_Feature.gif)



