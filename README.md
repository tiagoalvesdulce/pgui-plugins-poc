# Politeiagui restructure POC

**This is just a POC and most likely will change during design phase.**

## Requirements

* Node v14.16.1
* Yarn v1.22.0
* Politeia instance running

## Development

* Clone this repo
* `yarn install` in the root
* `cd packages/app-proposals && yarn start`
* Go to `https://localhost:1234`

## Problems with the current structure:

1. It aggregates everything state related to a unique state tree. Not ideal for the composable plugin structure we are aiming to accomplish.

￼![image](https://user-images.githubusercontent.com/13955303/116419419-6a86db80-a813-11eb-9278-23d648e8dfa4.png)

2. Our state tree is too crowded because we have to store loading and response statuses in the redux store. See this simple loading of proposals in discussion on Politeia:

￼![image](https://user-images.githubusercontent.com/13955303/116419463-76729d80-a813-11eb-9dfe-b7c3c2d6f465.png)

3. Data fetching in redux is very verbose, right now to do a simple fetch we need to create:
    * Two actions (REQUEST and RECEIVE)
    * One reducer handling both actions
    * One middleware (redux-thunk)

We are doing all this for one thing: **transport backend data and cache it in the client state**.

In this POC I am using [react-query](https://github.com/tannerlinsley/react-query) to do the above. It's a lib to deal with backend agnostic data fetching with auto caching. With it we can eliminate *a lot* of boilerplate

4. Our current folder structure looks like this:

```
📦src
 ┣ 📂actions
 ┣ 📂apps
 ┃ ┣ 📂cms
 ┃ ┃ ┗ 📜config.json
 ┃ ┗ 📂politeia
 ┃ ┃ ┗ 📜config.json
 ┣ 📂components
 ┣ 📂containers
 ┣ 📂hooks
 ┣ 📂lib
 ┣ 📂pages
 ┣ 📂reducers
 ┣ 📂selectors
 ┣ 📂validators
 ┣ 📜App.js
 📜package.json
 📜index.js
 ...
```

This structure is a good one but is not ideal for a plugin system because you have to touch a lot of places in order to implement a feature. Also, it's not ideal to build and test new plugins in isolation.

### Suggested structure ###

The folder structure in this POC uses [yarn workspaces](https://classic.yarnpkg.com/en/docs/workspaces/) to make it easier to build and test plugins in isolation. See:

```
📦packages
 ┣ 📂app-proposals
 ┃ ┣ 📂src
 ┃ ┃ ┣ 📂components
 ┃ ┃ ┣ 📜App.js
 ┃ ┃ ┣ 📜index.html
 ┃ ┃ ┣ 📜index.js
 ┃ ┃ ┗ 📜styles.css
 ┃ ┗ 📜package.json
 ┣ 📂plugin-records
 ┃ ┣ 📂src
 ┃ ┃ ┣ 📂components
 ┃ ┃ ┣ 📂hooks
 ┃ ┃ ┣ 📜example.js
 ┃ ┃ ┣ 📜index.html
 ┃ ┃ ┗ 📜index.js
 ┃ ┗ 📜package.json
 ┣ 📂plugin-ticketvote
 ┃ ┣ 📂src
 ┃ ┃ ┣ 📂components
 ┃ ┃ ┣ 📂hooks
 ┃ ┃ ┣ 📜example.js
 ┃ ┃ ┣ 📜index.html
 ┃ ┃ ┗ 📜index.js
 ┃ ┗ 📜package.json
 ┗ 📂shared
 ┃ ┣ 📜package.json
 ┃ ┣ 📜pki.js
 ┃ ┗ 📜useApi.js
 📜index.js
 📜package.json
 ```

 With this structure we can build and test plugins in isolation. Every plugin is a package and we have the `shared` folder (also a package) where the reusable code lives.

#### App-proposals

This is the main app that will compose all plugins and extra UI elements.

Notice it has `plugin-records` as a dependency and it uses the `Records` component exported from it.

#### Plugin-records

This is the records plugin. This one will deal with everything related to records.

Notice it has `plugin-ticketvote` as a dependency and it uses the `useInventory` component exported from it. This plugin is exporting the `Records` component and also the `useRecords` hook.

#### Plugin-ticketvote

Similar to the `plugin-records` but it doesn't depend on any other plugin, only uses the `useApi` hook from the shared folder.

## TODO

- [ ] Setup tests
