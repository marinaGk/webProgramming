const bcrypt = require("bcrypt"); 
const dotenv = require("dotenv");

let userModel = require("../model/model_pg.cjs");


let register = (req, res) => {
    let check = true; 
    for (let key of Object.keys(req.body)) {
        if(req.body[key] == "") { 
            console.log("false");
            break;
        }
    }
    if (check) { 
        userModel.registerUser(req.body.username, req.body.password, req.body.email, req.body.fullname, (err, result, message) => { 
            if(err) { 
                console.log('registration error' + err); 
                res.render('signup', {layout: 'formslayout', message:err});
            }
            else if (message) { 
                res.render('signup', {layout: 'formslayout', message:message});
            }
            else { 
                res.redirect('/login');
            }
        })        
    }
    else{ 
        let message_load = 'Συμπληρώστε όλα τα πεδία';
        res.render('signup', {layout: 'formslayout', message:message_load})
    }

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
                    req.session.adminRights = user.adminRights;
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

let checkAuthenticated = (req, res, next) => { 
    if (req.session.loggedUserId){ 
        console.log("user is authenticated", req.originalUrl); 
        if(req.session.adminRights){ 
            console.log("user is admin");
        }
        else{ 
            console.log("user not admin");
        }
        next();
    }
    else{ 
        if ((req.originalUrl == '/login') || (req.originalUrl == '/register')) { 
            next(); 
        }
        else { 
            console.log("not authenticated, redirecting to login"); 
            res.redirect('/login');
        }
    }
}

module.exports = {register, login, checkAuthenticated};