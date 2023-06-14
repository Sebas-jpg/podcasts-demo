## Getting Started

Before running the app, **make sure that port 3001 is free on your machine**.

### Installation

To run the app, first, you need to install the required dependencies. Navigate to the app directory in your terminal and run:

### `yarn install`

This will install all the necessary dependencies listed in your `package.json` file.

Once the installation is complete, you can start the app in the development mode by running:

### `yarn start` or `PORT=3001 react-scripts start` on Linux

This starts the development server, and you can open [http://localhost:3001](http://localhost:3001) to view it in your browser. The page will automatically reload if you make any changes to your source files.

To build the app for production, please follow these steps:

1. Run the following command to create an optimized production build:

### `yarn build`

2. Once the build process is complete, a `build` folder will be generated in the project directory.

3. To serve the production build with a static server, you can use the `serve` package. If you don't have it installed globally, run the following command to install it:

### `yarn global add serve`

4. Finally, use the following command to serve the production build:

### `yarn serve`

The app will be served at port [http://localhost:3001](http://localhost:3001).

### Any issues?

If you encounter any issues or need assistance, feel free to get in touch via email: janik.sebastian2@icloud.com

Please keep in mind that fetching podcasts and episodes may take some time due to limitations imposed by allorigins.win, which helps to bypass CORS restrictions. Please check the console for error messages. If no errors are displayed, kindly be patient as the fetching continues.
