const {app} = require('./app')
require('dotenv').config()

const PORT = process.env.PORT || process.env.BACKEND_PORT;




app.listen(PORT , () =>
  console.log(`Server started on port ${PORT}`));

