# Plant Care Guide App

Basic monolith app running on React.js, Express.js, node.js. This app will allow users to create and share care guides for plants growing in their garden.

## Authors
Solomon Montagno


## Installation

```yarn
yarn install
```


## Usage
In the correct directory run the following command in the terminal to start server. 

```yarn
yarn install
```

```yarn
yarn run dev
```
Then, navigate to <http://localhost:3000> to see webpage.


## Instructions for other developers
Clone the project files from github using
```
https://github.com/smontagno/Plant-Care-App-Final-Project.git
```

Once user designates file location in terminal,
```yarn
cd server
```

Create a new database called “Plant-Care-App-Final-Project_development”
```yarn
createdb Plant-Care-App-Final_Project_development
```

```yarn
yarn install
```

Make sure to migrate the table to the database
```yarn
yarn run migrate:latest
```

Seed the database
```yarn
yarn db:seed
```

Start up server
```yarn
yarn run dev
```
## Features
- Sign in
- Sign out

## License

N/A