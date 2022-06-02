const bcrypt = require("bcrypt"); 
const dotenv = require("dotenv");

let userModel = require("../model/model_pg.cjs");
let message = "";


let register = (req, res) => { 
    userModel.registerUser(req.body.username, req.body.password, req.body.email, req.body.fullname, (err, result, message) => { 
        if(err) { 
            console.log('registration error' + err); 
            res.render('signup', {layout: 'formslayout', message: err});
        }
        else if (message) { 
            res.render('signup', {layout: 'formslayout', message:message});
        }
        else { 
            res.redirect('/login');
        }
    })
}

let login = (req, res) => { 
    userModel.getUserByUsername(req.body.username, (err, user) => { 
        if (user == undefined) { 
            let message = "Δεν βρέθηκε ο χρήστης"
            res.render('login',{layout: 'formslayout', message: message});
        }
        else { 
            const match = bcrypt.compare(req.body.password, user.accountpassword, (err, match) => { 
                if (match) { 
                    req.session.loggedUserId = user.accountid;
                    res.redirect('/');
                }
                else { 
                    let message = "Ο κωδικός πρόσβασης είναι λάθος"
                    res.render('login',{layout: 'formslayout', message: message});
                }
            })
        }
    })
}

let checkAuthenticated = function(req, res, next) { 

}

module.exports = {register, login, checkAuthenticated};