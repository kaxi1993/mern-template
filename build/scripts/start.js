const signale = require('signale')

const app = require('../../server/app')

app.listen(process.env.PORT, () => {
    signale.success(`Server is running on PORT: ${process.env.PORT}`)
})
