const express = require("express")
const { connection } = require("./db")
const cors = require("cors")
const { userRouter } = require("./routes/users.route")
const { postRouter } = require("./routes/posts.route")

const app = express()
app.use(express.json())
app.use(cors())

app.use("/users",userRouter)
app.use("/posts",postRouter)


app.listen(8080, async()=>{
    try {
        await connection
        console.log("Conneced to DB")
        console.log("Server is runnig at port 8080")
    } catch (err) {
        console.log(err)
    }
})