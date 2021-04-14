import express, { Request, Response, NextFunction } from 'express';

import passport from 'passport';

// create the User Model Instance
import User from '../Models/user';

// Util Functions
import { UserDisplayName, GenerateToken } from '../Util/index';


// Display Page Functions
export function DisplayHomePage(req:Request, res:Response, next:NextFunction): void
{
    res.render('index', { title: 'Home', page: 'home', displayName: UserDisplayName(req)});
}

export function DisplayAboutPage(req:Request, res:Response, next:NextFunction): void
{
    res.render('index', { title: 'About Us', page: 'about', displayName: UserDisplayName(req)});
}

export function DisplayServicesPage(req:Request, res:Response, next:NextFunction): void
{
    res.render('index', { title: 'Our Services', page: 'services', displayName: UserDisplayName(req)});
}

export function DisplayProjectsPage(req:Request, res:Response, next:NextFunction): void
{
    res.render('index', { title: 'Our Projects', page: 'projects', displayName: UserDisplayName(req)});
}

export function DisplayContactPage(req:Request, res:Response, next:NextFunction): void
{
    res.render('index', { title: 'Contact Us', page: 'contact', displayName: UserDisplayName(req)});
}

export function DisplayLoginPage(req:Request, res:Response, next:NextFunction): void
{
    if(!req.user)
    {
        return res.render('index', 
        { 
            title: 'Login', 
            page: 'login', 
            messages: req.flash('loginMessage'),
            displayName: UserDisplayName(req)   
        });
    }

    return res.redirect('/contact-list');
}

export function DisplayRegisterPage(req:Request, res:Response, next:NextFunction): void
{
    if(!req.user)
    {
        return res.render('index', 
        { 
            title: 'Register', 
            page: 'register', 
            messages: req.flash('registerMessage'),
            displayName: UserDisplayName(req)
        });
    }

    return res.redirect('/contact-list');
}

// Process Page Functions

export function ProcessLoginPage(req:Request, res:Response, next:NextFunction): void
{
    passport.authenticate('local', (err, user, info) => {
        // are there server errors?
        if(err)
        {
            console.error(err);
            return next(err);
        }

        // are the login errors?
        if(!user)
        {
            req.flash('loginMessage', 'Authentication Error');
            return res.redirect('/login');
        }

        req.login(user, (err) => {
            // are there DB errors?
            if(err)
            {
                console.error(err);
                return next(err);
            }

            const authToken = GenerateToken(user);

            console.log(authToken);

            //if we had a front end 
            //return res.json({success: true, msg: 'User Loged in Successfully!', user: user, token: authToken});

            // since we don't
            return res.redirect('/contact-list');
        });
    })(req, res, next);
}

export function ProcessRegisterPage(req:Request, res:Response, next:NextFunction): void
{
    // instantiate a new user object
    let newUser = new User
    ({
        username: req.body.username,
        emailAddress: req.body.EmailAddress,
        displayName: req.body.FirstName + " " + req.body.LastName 
    });

    User.register(newUser, req.body.password, (err) => 
    {
        if(err){
            console.error('Error: Inserting New User');
            if(err.name == "UserExistsError")
            {
                req.flash('registerMessage', 'Registration Error');
                console.error('Error: User Already Exists');
            }
            return res.redirect('/register');
        }
        
        // if we had a front ent
        //return res.json({success: true, msg: 'User Registered Successfully!'};)

        // since we don't
        // automatically login the user
        return passport.authenticate('local')(req, res, ()=>
        {
            //res.json({success: true, msg: 'User Loged in Successfully!', user: newUser, token: GenerateToken(user)});
            return res.redirect('/contact-list');
        });
    });
}

export function ProcessLogoutPage(req:Request, res:Response, next:NextFunction): void
{
    req.logout();
    console.log("User Logged Out");

    // if we had a front end
    //res.json({success: true, msg: 'User Logged Out Successfully!'});

    // since we don't
    res.redirect('/login');
}

export function ProcessContactPage(req:Request, res:Response, next:NextFunction): void
{
    res.render('index', { title: 'Home', page: 'home', displayName: UserDisplayName(req)});
}