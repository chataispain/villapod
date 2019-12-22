const express = require('express')
const router = express.Router()
const Show = require('../models/show')

// All Shows Route
router.get('/', async (req, res) => {
    let searchOptions = {}
    if (req.query.name != null && req.query.name != '') {
        searchOptions.name = new RegExp(req.query.name, 'i')
    }
    try {
        const shows = await Show.find(searchOptions)
        res.render('shows/index', { 
            shows: shows,
            searchOptions: req.query 
        })
    } catch {
        res.render('/')
    }
})

// New Show Route
router.get('/new', (req, res) => {
    res.render('shows/new',{ show: new Show() })
})

// Create Show Route
router.post('/', async (req, res) => {
    const show = new Show({
        name: req.body.name
    })

    try {
        const newShow = await show.save()
        // res.redirect(`shows/${newShow.id}`)
        res.redirect('shows/')       
    } catch {
        res.render('shows/new', {
            show: show,
            errorMessage: 'Error creating Show'
        })
    }
    
    /*show.save((err, newShow) => {
        if (err) {
            res.render('shows/new', {
                show: show,
                errorMessage: 'Error creating show'
            })
        } else {
           // res.redirect(`shows/${newShow.id}`)
           res.redirect('shows/')
        }
    })*/
})


module.exports = router