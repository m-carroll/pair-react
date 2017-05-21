const express = require('express'),
      app = express(),
      request= require('request');

const watson = require('watson-developer-cloud');

const bodyParser = require('body-parser');
var sources;
getSources()

app.use(bodyParser.urlencoded({ extended: false}));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
})

app.get('/aggregate', (req, res) => {
    res.send(getHeadlines(50))
})

app.get('/titles', (req,res) => {
    let index = Math.floor(((sources.length - 1) * Math.random()))
    const url = `https://newsapi.org/v1/articles?source=${sources[index]}&sortBy=latest&apiKey=34ead2be5107488bba0bfe2a0c5108b3` 
    request.get(url, (err, response, body) => {
        if (err) console.log(err)
        else {
            let obj = JSON.parse(body)
            if (!obj.articles) return res.send(err)
            let articleIndex = Math.floor((obj.articles.length - 1) * Math.random())
            let article = obj.articles[articleIndex]
            var tone_analyzer = watson.tone_analyzer({
            username:'400255c9-30ba-46a7-a9d9-e8f8f1527a3d',
            password: 'cDJCW1aFvqCK',
            version: 'v3',
            version_date: '2016-05-19'
            })
            tone_analyzer.tone({
                text: article.title + ' ' + article.description,
                tones: 'emotion'
                }, function(err,tone) {
                    if (err){
                        console.log(err)
                    } else {
                        return res.send({tone: tone.document_tone.tone_categories[0].tones, article, source: sources[index]})
                    }
                }
            )
        }
    })
})


function getHeadLines(number){
    request.get(url, (err, res, body) => {
     if (err) {
         console.log(err)
     } else {
        return JSON.parse(body).articles.map( (x)=>{return x.title})
     }
 })

}

function getSources(){
    const url = `https://newsapi.org/v1/sources?language=en` ; 
    request.get(url, (err, res, body) => {
        if (err) {
            console.log(err)
        } else {
            sources = JSON.parse(body).sources.map((x)=>{return x.id})
        }
    })
}

app.listen(8080, ()=>{
    console.log('listening on 8080')
})
