const app = require('./app');
require('./database');


app.listen(3000, () =>{
    console.log( 'connected' );
})


const init =async () => {
    await app.listen(4000);
    console.log("Server on port 4000");
}

init();