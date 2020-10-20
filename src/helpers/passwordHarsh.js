import bcrypt from 'bcryptjs';

const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    
    const hashPassword = await bcrypt.hash(password, salt);
    
    return hashPassword;
};

export default hashPassword;


// const keyWord = 'Andela123.';
// const passwordHarsh = async (password) => {
//     const salt = await bcrypt.genSalt(10);
//     const passwordHashed = await bcrypt.hash(password, salt);
//     console.log(passwordHashed);
    
    // const match = await bcrypt.compare(keyWord, passwordHashed);
    // console.log(match);
    // if (match) {
    //     console.log('Password match');
    // }
    // else {
    //     console.log('Not match');
    // }
// };


// export default passwordHarsh;