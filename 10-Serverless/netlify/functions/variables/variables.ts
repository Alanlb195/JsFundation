import type { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";

const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {

    const myImportantVariable = process.env.IMPORTANT_VAR;

    console.log(myImportantVariable);

    if (!myImportantVariable) {
        throw ('Missing my important variable');
    }

    console.log('Hola mundo desde los logs');

    return {

        statusCode: 200,
        body: JSON.stringify({
            message: myImportantVariable,
        }),
        headers: {
            'Content-Type': 'application/json'
        }

    }

}

export { handler };