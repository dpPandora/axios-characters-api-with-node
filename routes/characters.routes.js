const router = require("express").Router();
const axios = require("axios");

/* GET home page */
router.get("/characters", (req, res, next) => {
    axios.get("https://ih-crud-api.herokuapp.com/characters")
    .then(responseFromAPI => {
        // console.log(responseFromAPI)
        res.render("characters/list-characters", { characters: responseFromAPI.data });
    })
    .catch(err => console.error(err))
});


router.get("/characters/:id", (req, res, next) => {
    axios.get(`https://ih-crud-api.herokuapp.com/characters/${req.params.id}`)
    .then(responseFromAPI => {
        // console.log("details: ", responseFromAPI.data)
        res.render("characters/details-character", { character: responseFromAPI.data });
    })
    .catch(err => console.error(err))
});

router.get('/character/create', (req, res, next) => {
    res.render('characters/create-character');
})
router.post('/character/create', (req, res, next) => {
    let {name, occupation, debt, weapon} = req.body;
    //console.log(jsond);

    if (debt) debt = true;

    axios({
        method: 'post',
        url: 'https://ih-crud-api.herokuapp.com/characters',
        data: { name, occupation, debt, weapon}
    })
    .then((result) => {
        console.log(result.data);
        res.redirect('/characters');
    })
    .catch(function(error){
        console.log(error);
    });
});

router.get('/character/:id/edit', (req, res, next) => {
    axios.get(`https://ih-crud-api.herokuapp.com/characters/${req.params.id}`)
    .then(responseFromAPI => {
        console.log("details: ", responseFromAPI.data)
        res.render("characters/edit-character", { character: responseFromAPI.data });
    })
    .catch(err => console.error(err))
})
router.post('/character/:id/update', (req, res, next) => {
    console.log(req.body);
    let {name, occupation, weapon} = req.body;
    let debt = req.body.debt
    //console.log(jsond);
    if (debt) debt = true;
    else debt = false;

    console.log(debt)

    axios.put(`https://ih-crud-api.herokuapp.com/characters/${req.params.id}`, { name, occupation, debt, weapon})
    .then((result) => {
        console.log(result.data);
        res.redirect(`/characters/${req.params.id}`);
    })
    .catch(function(error){
        console.log(error);
    });
})
router.post('/character/:id/delete', (req, res, next) => {
    axios.delete(`https://ih-crud-api.herokuapp.com/characters/${req.params.id}`)
        .then(() => res.redirect('/characters'))
        .catch(err => console.log(err));
})
module.exports = router;


// https://ih-crud-api.herokuapp.com/characters