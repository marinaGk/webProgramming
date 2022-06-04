const bcrypt = require("bcrypt"); 
const dotenv = require("dotenv");

let userModel = require("../model/model_pg.cjs");


let register = (req, res) => {
    let check = true; 
    for (let key of Object.keys(req.body)) {
        if(req.body[key] == "") { 
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
        let message_load = "Συμπληρώστε όλα τα πεδία";
        alert()
        res.render('signup', {layout: 'formslayout', message: "Fill all fields"})
    }

}

let login = (req, res, next) => { 
    userModel.getUserByUsername(req.body.username, (err, user) => { 
        if (user == undefined) { 
            let message = "Δεν βρέθηκε ο χρήστης"
            res.render('login',{layout: 'formslayout', message: message});
        }
        else { 
            const match = bcrypt.compare(req.body.password, user.accountpassword, (err, match) => { 
                if (match) { 
                    req.session.loggedUserId = user.accountid;
                    req.session.loggedUserName = user.accountname;
                    req.session.adminRights = user.adminrights;
                    res.redirect('/');
                    next();
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
        next();
    }
    else{ 
        console.log("user not authenticated")
        if ((req.originalUrl == '/login') || (req.originalUrl == '/register')) { 
            next(); 
        }
        else {  
            res.redirect('/login');
        }
    }
}

module.exports = {register, login, checkAuthenticated};