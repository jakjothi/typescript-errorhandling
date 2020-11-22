## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start
```

## Error Handling
* There are 3 sample API methods written in src/ directory controller & service
    - http://localhost:3000/name
    - http://localhost:3000/error
    - http://localhost:3000/third

* Please check Result.ts for error handling

## Why it is Clumsy?
* Answer
    - Intention of this function is to find user by id. But here we are returning any as return data type, Instead it should be User entity type
    - getRepository(User) -> Here we can use User Repository injected in service constructor and use the repository object and find the record
    - ID is directly mapped to the query builder, Which is not the recommended way this may lead to sql injection attacks. Instead it should be escaped & The value should be binded with the query builder.
    
* Rewritten code is available in src/app.service.ts

    
