# Project: Client for Cartoon API
This SPA (single page application) was created as the frontend for my database of animated films. It primarily uses React, with Redux, Bootstrap, and Parcel for the build process. The main goal of this project was to better cement the concepts of SPAs and React in my toolbox of languages, and to show that I understand how they work and that I can apply them optimally. Since this frontend is connected to the API, there are several points of logic that need to be kept in mind if you fork this project that I will outline below. Additionally, each component is reusable in this context, or can be copied and adjusted to meet other needs with the right variables and imports. Lastly, this project allowed me to explore login and user data security in depth and apply multiple security layers to that data, as much as I could within my budget and scale. Regarding budget, I can only run this application upon request for a demo because it uses Heroku dynos, which cost extra - as such it is not logical for me to keep the website up at all times.

## My Role:
I created this project starting from the backend and working to the frontend once the server side was complete. As such, it's a full-stack project written solely by myself. There are several spots I was a bit stuck, so I credit StackExchange and Reddit for helping me figure those issues out. Most issues I encountered were either a typo on my end, or else an update to a dependency I was unaware of until searching for it online. That said, my familiarity with React contributed the most to my success on this project. I was easily able to make the components I needed in order to build my application, and with test-driven development outlining my work practice, I found and tested errors as I went along. This also involved accessing the API correctly and ensuring there were no connectivity errors. The issue I ran into most was simply forgetting to include props on some components if I rearranged anything. This helped me improve notes as well as process, taking more time to make sure a component had the necessary dependencies and props.

### Dependencies

- React
- Redux
- Parcel
- Bootstrap

## Re-Use and Forking 
If you want to fork this application, it is a good base for any card-based display system pulling from an API, though you will have to make several adjustments if you use a different API. You won't be able to use my API without the necessary keys, but the logic there should help you set up the same for another API. Here's a [link](https://github.com/eryncraig/cartoonAPI). Likewise for my API, be sure to check the dependencies and request access to that repository via my Github. Alternatively, you can create your own data and API and this frontend will work with it as long as you make the correct endpoints and connections. Those will be listed in the `main-view.jsx` file for each endpoint. The endpoints themselves can be re-used, as long as they match endpoints in your choice of API. 

Otherwise, to install and use this project:
- Fork the repo
- Clone the repo
- Install the dependencies
  - Navigate to the root folder in your terminal
  - Run `npm install`
  - Double check the response and your package.json file to make sure they installed
- Make your edits to the display, colors, and API details if needed.
- Commit and push to a new remote repo (NOT to this repo - it will be declined)

Once you have the details you want added or changed, you can run the project following these steps:
- Save your work in your IDE
- Access the terminal and navigate to the root folder of your project (in this structure it will be under 'src')
- Run `parcel index.html`
- If successful, you should see a confirmation and a url to the localhost to view the application

Parcel is the main minifier and bundler in this application, so should be used for optimization. Node can also be used to manage the packages as it is involved in the creation of this app and acts as the runtime environment.

## Conclusion
If you have any questions or corrections you think I should make, contact me [here!](https://eryncraig.github.io/official-portfolio/#contact). This application is meant as a standalone project to develop, improve, and display my skills, but I'm always wanting to improve more - any feedback is appreciated. Lastly, this project is used ideally as a frontend for a database for purposes like movies, books, music, or even a gallery. It has a lot of flexibility if you understand React and the file structure. I also had fun making it! Cheers to development!
