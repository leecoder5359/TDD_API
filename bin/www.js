const app = require('../index');
const syncDb = require('./sync-db');

syncDb()
    .then(() => {
       console.log('Sync Database!!');
       app.listen(4567, () => {
          console.log('Server is running');
       });
    })

