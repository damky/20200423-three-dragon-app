- ok, how many players? (2-6)
  - initGambit(numOf, new Player());
- and what are the names of the real people who wanna roll their own dice?
  - gambit.playersReal(update(player.name));
- and who "owns a set of Three-Dragon-Ante" or are proficient with the gaming set?
  - gambit.show(real)
  - gambit.playersRealGood(player.name)
- what's the initial hoard size?
  - update([...gambit.players].hoard);
- and is that gp, sp, or cp? Nobody wants ep, and if you say pp then just get out.
  - update(gambit.denomination)
- gambit.start();
  - roll(1d12, [...gambit.players], update(player.turnOrder))
  - gambit.sort();
    - playerIsHighRoller ? player.anteUp(highestRoll/2) : player.anteUp(highestRoll)
      - canAnte() ? player.hoard -= ante : player.debt += ante
      - gambit.stakes + ante
- gambit.round(3);
  - for (turn in gambit.players) {player.play()}
    - player.continue ? player.anteUp() : player.walkAway()
- gambit.specialDragonFlights()
  - [god, triplet, allied, leader]
- gambit.settleDebts()
- gambit.winnerIs()
  - gambit.
- gambit.endOrRepeat()

Dragon Card Table:
D12.Type......Alignment......Strength
1...Tiamat....[god]...Evil...1
2...Brass.....[!god]..Good...1d4
3...White.....[!god]..Evil...1d4
4...Copper....[!god]..Good...1d6
5...Black.....[!god]..Evil...1d6
6...Bronze....[!god]..Good...1d8
7...Green.....[!god]..Evil...1d8
8...Silver....[!god]..Good...1d10
9...Blue......[!god]..Evil...1d10
10..Gold......[!god]..Good...1d12
11..Red.......[!god]..Evil...1d12
12..Bahamut...[god]....Good..13

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `yarn build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
An app adaptation of THREE-DRAGON ANTE: DICE GAMBIT by Christopher A. Cox which is an adaptation of the THREE-DRAGON ANTE card game by Wizards of the Coast LLC
