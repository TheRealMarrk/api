require("express-async-errors")

const migrationsRun = require("./database/sqlite/migrations")

const AppError = require("./utils/AppError")

const express = require("express")

const routes = require("./routes")

const app = express()

app.use(express.json())

app.use(routes)

migrationsRun()

app.use((error, request, response, next) => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: "error",
      message: error.message
    })
  }
  
  return response.status(500).json({

    status: "error",
    error: "Internal server error"
  })
})

const port = 3333
app.listen(port, () => {
  console.log(`server is running on port ${port}`)
})