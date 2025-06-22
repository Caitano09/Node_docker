const bcrypt = require('bcryptjs')
const User = require('../models/userModel')

exports.signUp = async (req, res) => {
    try {
        const { username, password } = req.body
        const hashpassword = await bcrypt.hash(password, 12)
        const newUser = await User.create({
            username,
            password: hashpassword
        })

        req.session.user = newUser
        res.status(201).json({
            status: 'success',
            data: { newUser }
        })

    } catch (e) {
        console.log(e)
        res.status(400).json({
            status: 'fail',
        })
    }
}

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body
        const user = await User.findOne({ username })

        if (!user) {
            return res.status(404).json({
                status: 'fail',
                message: 'user not found'
            })
        }
        const isCorrect = await bcrypt.compare(password, user.password)

        if (isCorrect) {
            req.session.user = user
            res.status(200).json({
                status: 'success',
                data: { user }
            })
        } else {
            res.status(400).json({
                status: 'fail',
                message: 'incorrect username or password'
            })
        }

    } catch (e) {
        console.log(e)
        res.status(400).json({
            status: 'fail',
        })
    }
}