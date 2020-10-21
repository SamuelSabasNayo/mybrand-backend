exports.validate_user = (req, res, next) => {
    console.log('Being validated.');
    let password = req.body.password;
    
    if (password.length < 5) {
        res.status(400).json({ message: 'Password is not correct.' });
    } else {
        next();
        console.log('Validation done.');
    };
}