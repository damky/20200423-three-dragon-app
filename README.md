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
  - update(player.turnOrder = roll(1d12))
    - player.realGood ? randomWithAdvantage(numOf,min,max) : random(numOf,min,max)
  - gambit.turnOrder = gambit.sort();
    - playerIsHighRoller ? player.anteUp(highestRoll/2) : player.anteUp(highestRoll)
      - canAnte() ? player.hoard -= ante : player.debt += ante
      - gambit.stakes += ante
- gambit.round(3);
  - for (turn in gambit.players) {player.play()}
    - player.playing ? player.continue() : return
    - player.continue() ? player.drawCard() : player.walkAway()
      - walkAway()
        - update(gambit.players([...players.playing]))
        - while (player.hoard > 0) {player.payDebts()}
          - for turn in gambit.turnOrder => player.hoard -= !player.debt.paid && player.debt[0].amount; player.debt[0].debtor += player.debt[0].amount;
      - drawCard()
        - roll(1d12, player, lookUpCard())
          - getDragonStrength()
            - roll(dragons.dragon.strength)
          - update(player.cards)
      - trigger(dragon.power())
        - isEvil && !god ? player.hoard += roundUp(dragon.maxStrength/2) && stakes.remaining -= roundUp(dragon.maxStrength/2)
        - !isEvil && !god ? showPlayers(.some[...gambit.players.cards.evil], forceToPay(amt,who))
          - playerChosen.hoard -= roundUp(dragon.maxStrength/2) unless player.hoard <= 0 then hoard.remaining && update player.debt
        - !isEvil && god ? gambit.bahamut.yes && gambit.bahamut.howMany += 1 && create new BahamutBtn(whose)
          - triggerBahamut(whoTriggered)
            - showPlayers(.some[...gambit.players.cards.evil])
              - gambit.bahamut.howMany -= 1 && gambit.tiamat.howMany -= 1 && tiamatPlayer = type.red,roll(1d12) && bahamutPlayer = type.gold,roll(1d12)
      - anteUp() => player.hoard -= dragon.strength; gambit.stakes += dragon.strength
- gambit.triggerSpecialDragonFlights().forEach(player)
  - if (isGodFlight([...player.cards].every(card=>card.god))) player.hoard += roundDown(gambit.stakes/2)
  - if (isTripletFlight([...player.cards].strength)) player.hoard += sum(takeFrom(gambit.players.hoard,incuring debt)) && [...gambit.players.hoard].forEach(-= dragon.strength)
    - [...player.cards].map(card=>card.strength).reduce((acc,init)=>acc+init)/3===player.cards[0].strength
  - if (isAlliedFlight([...player.cards].every(card=>card.isEvil)))) player.hoard += largestStrength && stakes -= largestStrength unless stakes <= 0 then stakes == 0 && player.hoard += stakes.remaining
- gambit.leaderFlight()
  - player.flightStrength = [...player.cards].map(card=>card.strength).reduce((acc,init)=>acc+init)
  - gambit.players.sortBy(flightStrength)[0] += stakes.remaining
  - unless gambit.tiamat.yes then sortBy(flightStrenth)[-1]
- gambit.settleDebts()
- gambit.winnerIs = gambit.largestHoard
- gambit.winner += stakes.remaining
- gambit.endOrRepeat()
  - end ? zeroOut() :

Dragon Card Table:
D12.Type......Alignment...Strength
1...Tiamat....god..Evil...1
2...Brass....!god..Good...1d4
3...White....!god..Evil...1d4
4...Copper...!god..Good...1d6
5...Black....!god..Evil...1d6
6...Bronze...!god..Good...1d8
7...Green....!god..Evil...1d8
8...Silver...!god..Good...1d10
9...Blue.....!god..Evil...1d10
10..Gold.....!god..Good...1d12
11..Red......!god..Evil...1d12
12..Bahamut...god..Good...13

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
