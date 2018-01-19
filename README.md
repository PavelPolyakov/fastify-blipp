Inspired by [blipp](https://github.com/danielb2/blipp) hapijs plugin which prints your routes.

## install
```
npm i fastify-blipp
```

## usage
```javascript
const fastify = require('fastify')()

fastify.register(require('fastify-blipp'));

fastify.get('/hello/:username', async (req, reply) => ({greeting: `Hello, ${req.params.username}`}));
fastify.post('/hello', async (req, reply) => ({greeting: `Hello, ${req.body.username}`}));

const start = async () => {
    try {
        await fastify.listen(3000);

        fastify.blipp();

        console.log(`server listening on ${fastify.server.address().port}`);
    } catch (err) {
        console.error(err);
        process.exit(1)
    }
}

start();
```

## result

![image](var/images/output_example.png)

