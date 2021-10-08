
import 'reflect-metadata';
import express from "express";
import Container from "typedi";
import { Startup } from './startup';

const app = express();
process.env.GRAPHQL_PATH = '/graphql'

const main = async () => { 
    const startup: Startup = Container.get(Startup);

    await startup.configureServices();
    await startup.configure(app);

    app.listen({ port: 5000 }, () =>
        console.log(`🚀 Server ready at http://localhost:5000${process.env.GRAPHQL_PATH}`)
    );
}

main();

