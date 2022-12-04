# Course Online

# Deployment

```bash

### SSH server information
1. Open terminal
2. Paste the command: 
3. Input password: 

### How to deploy
1. cd ./course-online
2. ./deploy.sh
3. waiting

```

# Development

```bash
git clone https://github.com/phutruongck/course-online

# editor
visual code

# Project directory
cd course-online

# Install dependencies
yarn

# Start server with reset cache
yarn dev

#format code eslint + prettier
npm install -g eslint
npm install -g prettier

Paste the code under code/settings.json of visual code -> restart visual code
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact"
  ],
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },

# visual code install extensions
ESlint
Code Spell Checker
GitLens
Prettier
ES7 React/Redux

```

## Coding

```bash
# Structure
- screens, components, ducks, routes, public

- Screens
- Create screens and call components

components
- Create components by screen (call into screens)
- Create common component

ducks
- Manage store

router
- create navigation screens

services
- define link api
- define model

# Tree folder in components
- common
  - utils (.tsx)
  - types (.ts)
  - constants (.ts)
- list
  - index (.tsx) business login
  - style
  - children components
    -
- detail (create, update, delete)
  - index (.tsx) business login
  - style
  - children components
  - validations.tsx
-  ...

# Naming
- camelCase

- naming folder and file
  ex: user-profile

- format variable boolean (noun): 'is' + '$name'
  ex: isIOS, isAndroid

 - format variable function: 'on' + '$name'
  ex: onSubmit, onNext, onBack, on + '$name' + 'success' ...

 - format variable array (noun): 'arr' + '$name'

# Life Cycle của State & Renderer
- NOT render up to 3 times
- variable name store redux not the same single state

# Extend Regulations
Not greater than 2 level

# import order in file .ts, .tsx
1. react, react-native, redux, navigation, i18next, ...
2. many levels ../ to go ahead

# import order in component and rules coding
1. useDispatch
2. useRoute, useNavigation, useState, useRef
3. useMemoSelector (selector redux)
 import {actions, selects} from `../../../`

 ex: # const groupsWorkingResponse: GroupsWorkingType[] = useSelector(selector.getListGroupWorking).response.data;
 - format variable name: '$name' + 'response'

3. dispatch (request call api)
 ex: # const listGroupWorkingRequest = useCallback(
     # (request: ListGroupWorkingRequest) =>
     #  dispatch(actions.listGroupWorking.request(request)),
     # [dispatch],
     # );
 - format variable name: '$name' + 'request'

4. data constants, useMemo, useCallback api, event

- component always wrapped by React.memo()

- not style inline, define in file style.ts

- use constant for value not change

- define type cho api request and response

- not use arrow function when function don't have be params
  BAD: onPress={() => onPress()}
  GOOD: onPress={onPress}

- remove console log, style, constant not use

- use callback after call api success or failed

- each function, variable separated by 1 line

- each function logic do not exceed 20 lines

- comment code if logic complex (the way did it)

- DO NOT CALL FUNCTION IN RENDER FUNCTION


# Project applied
- react hook
- redux saga
- axios
- navigation
- moment
- date-fns
- lodash

# Common project
src/components


```
