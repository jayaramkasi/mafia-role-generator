This is a simple frontend helper app for assigning roles to participants in the party game - Mafia (Werewolf)

## How to use

Enter the number of villager and mafia roles (enter number of special roles like Cops, docs, godfathers, village idiots etc).

The number of people will get populated based on this. Enter the names of all the participants and click the **Allocate** button

You will see the allocation in the next tab. Use this to play on a Zoom.us or Hangouts meet call!

Optionally, on the game page, there is an option to add webhooks for every player. This will send a POST call, with body 
```Javascript
{
  "text": `Your role: ${role}. ${notes}`
}
```

Check the How to Use page within the app for more details.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.
