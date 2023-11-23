const POST = 8700
// const express = require('express');
// const cors = require('cors');

import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
//routes
import authRoutes from "./routes/auth.js";
import podcastsRoutes from "./routes/podcast.js";
import userRoutes from "./routes/user.js";
import blogRoutes from "./routes/blog.js";

const app = express();
dotenv.config();

/** Middlewares */
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));
const corsConfig = {
    credentials: true,
    origin: true,
};
app.use(cors(corsConfig));

const API_KEY = `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`

const url = `mongodb+srv://lequangdoanh:Quangdoanh510@quangdoanh.raqrf6j.mongodb.net`;

const port = process.env.PORT || 8700;

const connect = () => {
    mongoose.set("strictQuery", true);
    mongoose
        .connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(() => {
            console.log("MongoDB connected");
        })
        .catch((err) => {
            console.log(err);
        });
};

app.post('/completions', async (req, res) =>{
    const options = {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${API_KEY}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{ "role": "user", "content": "how are you?"}],
            max_tokens: 100, 
        })
    }
    try{
        const response = await fetch("https://api.openai.com/v1/chat/completions", options)
        const data = await response.json()
        res.send(data)
    } catch (error){
        console.error(error)
    }
})


app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/podcasts", podcastsRoutes);
app.use("/api/user", userRoutes);
app.use("/api/blog", blogRoutes)


// app.use("/api/team", teamRoutes)

app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || "Something went wrong";
    return res.status(status).json({
        success: false,
        status,
        message,
    });
});

app.listen(port, () => {
    console.log("Connected");
    connect();
});
