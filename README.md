# Project

A newsletter sign up form that will keep users engaged and up to date about product and services.

# Features

- User can select their preferred time so they can get weekly updates about product only on selected day.
- Everyone is in rush so no need to provide additional information, just email id will work and rest can be picked as default value.
- Email and Name validation is there.
- Acceible (compliant with the WCAG 2.1 level AA)

# Steps to run app locally

**Install dependencies**

```bash
  npm i
```

In the project directory, you can run:

```bash
node app.js
```

Runs the app in the development mode.

Open [http://localhost:8080](http://localhost:8080) to view it in the browser.

# Test Requirements

- The page should have some logo. So I've created a custom logo `Ahito` which means lets walk in my lamnguage. (Kumaoni from Uttrakhand).
- Feedback mechanism that tells the user whether sign up was successful or not. So I've added a modal as a feedback to assure the succeful signup.

# Design Archetype

**Additional features in terms of functionality**

- Name is Optional But if you're adding name it will accept alphabets if you'll try to add number or special character it will disable the button or will not allow to proceed.
- By Default preferred language is `en-GB` but you can change it.
- By Default preferred time is `Monday Morning` but you can change it as well.
- If you'll add the same email id it will give you `email already exist` error message.

# Resources

For Logo : [Canva](https://www.canva.com/)
For Web Accessbility Test : [accessibe](https://accessibe.com/)
