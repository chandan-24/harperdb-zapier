# HarperDb Zapier Integration

The Project is a Zapier Integration of HarperDB, an app that can be published to Zapier app market and use its capability to connect with 2000+ app in the Zapier app market to automate various workflow.

## INTRODUCTION

**What is HarperDB?**

_HarperDB is a SQL/NoSQL data management platform. It is fully indexed, doesn't duplicate data, and runs on any device- from the edge to the cloud._

**What is Zapier?**

_Zapier is the glue that connects thousands of web apps. Zaps are workflows that connect your apps, so they can work together. Zaps start with a trigger—an event in one of your apps that kicks off your workflow. Zaps automate tasks in the background, so you can focus on more important work._

**Zap:**

_A Zap is an automated workflow that connects our apps and services together. Each Zap consists of a trigger and one or more actions._

**Trigger:**

_A trigger is an event that starts a Zap._

**Action:**

_An action is an event a Zap performs after it is triggered. Action steps can find and/or create items in apps. Search & Create are two actions._

_**Search** can find data in apps and optionally create new items if the search returns no results._

_**Create** as its name implies make new items from the data received from trigger._

## FEATURES

### Authentication

_The app needs following instance’s detail:_

- HOST_ADDRESS
- USERNAME
- PASSWORD

### Triggers

_Following are hidden triggers which are used by actions to fetch Schemas, Tables and Attributes:_

- **Get All Schema**: _Fetch all the schemas from the db server._
- **Get All Tables**: _Fetch all the tables of the provided schema._
- **Get All Attributes**: _Fetch all the attributes of the provided table and schema._

_Following are user facing triggers, not implemented and are for future scope:_

- **Record Created**
- **Record Updated**

### Actions

_Following are Search Actions which are used to find data from the app:_

- **Find A Record:** _This will search record in the table via lookup Attribute._

- **Find Records via Custom Query:** _This will search record in the table via custom query that user controls._

- **Find or Create A Record:** _This will search record or alternatively create a new one if it does not exists._

## FUTURE WORK

### The app does not support any user facing triggers

Support for **Record Created & Record Updated Triggers** will be provided if some _subscription mechanism_ like **Rest Hooks or Pub-Sub** is supported by the database.

The _cluster socket connection_ is not working in this case as after the _subscription_, the connection **listens for new events that occur** but in our case we need **all the new event from our last listened offset** like Pub-Sub.

### Support for more create actions can be given if the use case need it

Like _Create a Table_, _Drop an Attribute_, _Drop Table_ etc.

## HOW TO PUBLISH THE APP PRIVATELY

```bash
# install the CLI globally
npm install -g zapier-platform-cli

# setup auth to Zapier's platform with a deploy key
zapier login

# install all the libraries needed for your app
npm install

# push your app to Zapier
zapier push
```

## REFERENCES

- [Zapier cli](https://platform.zapier.com/cli_docs/docs)
- [HarperDB](https://harperdb.io/)
